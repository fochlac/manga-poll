import cheerio from 'cheerio'
import FormData from 'form-data'
import fetch from 'node-fetch'
import {
    getResponseBody,
    registerParser,
    headers,
    decodeHTMLEntities,
    parse,
    createSource,
    checkNewUrlAvailability,
    joinUrl,
    categorizeRemoteUrls
} from '../parser'
import { getHost, parseNAgoDateString } from '../utils/parse'

const TYPE = 'madara'

const dateMonthFirst = /^[^\d]*(1[012]|0\d|\d)[^\d](3[0,1]|[012]\d|\d)[^\d](\d{2}|\d{4})[^\d]*$/
const dateDayFirst = /^[^\d]*(3[0,1]|[012]\d|\d)[^\d](1[012]|0\d|\d)[^\d](\d{2}|\d{4})[^\d]*$/
const monthWritten = /^[^\d]*[A-Za-z]{2,10}.{1,2}(3[0,1]|[012]\d|\d)[^\d]{1,3}\d{2}|\d{4}[^\d]*$/

function getDateType (urlList) {
    const types = urlList.reduce((types, url) => {
        if (dateMonthFirst.test(url?.date || '') || dateDayFirst.test(url?.date || '')) {
            if (dateMonthFirst.test(url?.date || '')) {
                types.dateMonthFirst = Object.prototype.hasOwnProperty.call(types, 'dateMonthFirst')
                    ? types.dateMonthFirst + 1
                    : 1
            }
            if (dateDayFirst.test(url?.date || '')) {
                types.dateDayFirst = Object.prototype.hasOwnProperty.call(types, 'dateDayFirst')
                    ? types.dateDayFirst + 1
                    : 1
            }
        }
        else if (monthWritten.test(url?.date || '')) {
            types.monthWritten = Object.prototype.hasOwnProperty.call(types, 'monthWritten')
                ? types.monthWritten + 1
                : 1
        }
        else {
            types.unparsable = Object.prototype.hasOwnProperty.call(types, 'unparsable') ? types.unparsable + 1 : 1
        }
        return types
    }, {})

    return Object.keys(types).reduce((type1, type2) => (types[type1] > types[type2] ? type1 : type2), 'unparsable')
}

function parseDates (urlList) {
    const type = getDateType(urlList)

    return (url) => {
        const baseDate = new Date()
        baseDate.setHours(0, 0, 0, 0)
        let created = baseDate.getTime()
        const { date } = url

        if (
            typeof date === 'string' &&
            date.trim().length &&
            /\d+.*ago/.test(date)
        ) {
            created = parseNAgoDateString(date)
        }
        else if (
            type === 'monthWritten' &&
            typeof date === 'string' &&
            date.trim().length &&
            new Date(date.trim()).toJSON()
        ) {
            created = new Date(date.trim()).getTime()
        }
        else if (typeof date === 'string' && date.length && type === 'dateDayFirst') {
            const [_full, day, month, year]: string[] = date.trim().match(dateDayFirst) || []
            if (month && day && year) {
                const date = new Date()
                date.setFullYear(Number(year.length === 2 ? `20${year}` : year), Number(month) - 1, Number(day))
                date.setHours(0, 0, 0, 0)
                created = date.getTime()
            }
        }
        else if (typeof date === 'string' && date.length && type === 'dateMonthFirst') {
            const [_full, month, day, year]: string[] = date.trim().match(dateMonthFirst) || []
            if (month && day && year) {
                const date = new Date()
                date.setFullYear(Number(year.length === 2 ? `20${year}` : year), Number(month) - 1, Number(day))
                date.setHours(0, 0, 0, 0)
                created = date.getTime()
            }
        }

        return {
            ...url,
            created,
            date: undefined
        }
    }
}

async function parseMadara (source: Source, urls: Record<string, Url>, body, sourceInfo): Promise<ChapterResult> {
    const $ = cheerio.load(body)
    const host = getHost(source.url)

    const urlList = $('li.wp-manga-chapter a')
        .toArray()
        .map((elem) => {
            const url = $(elem).attr('href')
            const result =
                String(url).match(
                    /^https?:\/\/([^/]*)\/.*\/([^/\d]*hapter[^/\d]*|ch[^/\d]*|)([\d-_.]*\d)[^\d/]*[^/]*\/$/
                ) || []
            return {
                host,
                chapter: result[3]
                    ?.replace(/[-_]+/g, '.')
                    .replace(/\.\./g, '.')
                    .replace(/(^\.|\.$)/, ''),
                url,
                date: $(elem).closest('.wp-manga-chapter').find('.chapter-release-date').text()
            }
        })

    if (!urlList?.length) {
        return {
            urls: [],
            warnings: [[host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0]]
        }
    }

    const { newUrls, oldUrls, warnings } = categorizeRemoteUrls(urlList.map(parseDates(urlList)), source, urls)

    const { newUrls: availableNewUrls, warnings: availabilityWarnings } = await checkNewUrlAvailability(
        source,
        newUrls,
        (body) => {
            const $ = cheerio.load(body)

            if (($('#image-0').length && $('#image-1').length) || $('#wp-manga-current-chap').length) {
                return true
            }
            return false
        }
    )

    return {
        urls: availableNewUrls,
        oldUrls,
        warnings: [].concat(warnings, availabilityWarnings),
        sourceInfo
    }
}

const idRegex = /["']?manga_id["']?:\s?["']?(\d{2,10})["']?/g

const fetchPage: (rawUrl: string) => Promise<string> = async (rawUrl) =>
    await getResponseBody(await fetch(rawUrl, { headers })).catch(() => '')

function parseMadaraPage (sourcehtml: string, rawUrl: string) {
    const $ = cheerio.load(sourcehtml)

    const ids = [
        ...(sourcehtml.match(idRegex) || []).map((str) => idRegex.exec(str)?.[1]),
        $('.rating-post-id').val(),
        $('.wp-manga-action-button[data-post]').first().data('post'),
        $('.chapter-selection[data-manga]').first().data('manga'),
        $('#manga-chapters-holder').data('id'),
        $('#manga-reading-nav-head').data('id'),
        $('#manga-reading-nav-foot').data('id')
    ]
        .filter((id) => !!id && String(id).length)
        .reduce((map, id: string | number) => {
            map[id] = typeof map[id] === 'number' ? map[id] + 1 : 1
            return map
        }, {})

    const mangaId = Object.keys(ids).sort((id1, id2) => ids[id1] - ids[id2])[0]

    const titles = [
        Array.from($('script[type="application/ld+json"]'))
            .map((script) => parse($(script).text())?.headline)
            .find((h) => h),
        $('#chapter-heading').text().split(' - ')[0],
        $('.post-title h1')
            .contents()
            .filter((index, el) => el.nodeType === 3)
            .text(),
        $('.rate-title').attr('title')
    ]
        .filter((title) => !!title && String(title).length)
        .reduce((map, title) => {
            const clean = decodeHTMLEntities(title).trim()
            map[clean] = typeof map[clean] === 'number' ? map[clean] + 1 : 1
            return map
        }, {})
    const title = Object.keys(titles).sort((title1, title2) => titles[title1] - titles[title2])[0]

    const url = rawUrl.match(/https?:\/\/[^/]*\/[^/]*\/[^/]*\//)?.[0]

    return createSource(TYPE, mangaId, title, url)
}

async function fetchMadara (source: Source, urls: Record<string, Url>): Promise<ChapterResult> {
    let body
    let errortext
    try {
        const resp = await fetch(source.url, { headers })
        try {
            body = await getResponseBody(resp)
        }
        catch (err) {
            errortext = err
        }

        let sourceInfo

        if (body && !errortext) {
            const $ = cheerio.load(body)
            let imageUrl = $('.summary_image img').attr('data-src')

	    if (/https/.test($('.summary_image img').attr('data-srcset')?.split(' ')?.[0] || '')) {
                imageUrl = $('.summary_image img').attr('data-srcset').split(' ')[0]
            }
            else if (/https/.test($('.summary_image img').attr('srcset')?.split(' ')?.[0] || '')) {
                imageUrl = $('.summary_image img').attr('srcset').split(' ')[0]
            }

            if (!/https/.test(imageUrl)) {
                imageUrl = $('.summary_image img').attr('src')
            }
            const description = $('meta[name="description"]').attr('content')

            if (imageUrl?.length && description?.length && (!source.imageUrl || !source.description)) {
                sourceInfo = {
                    imageUrl,
                    description
                }
            }
            if ($('li.wp-manga-chapter a')?.length) {
                try {
                    const rawSource = parseMadaraPage(body, source.url)
                    if (rawSource && ['mangaId', 'url', 'title'].some((prop) => rawSource[prop] !== source[prop])) {
                        sourceInfo = sourceInfo || {}
                        sourceInfo.update = rawSource
                    }
                }
                catch (e) {
                    console.log(`Error updating source: ${source.title} (${source.id}): ${e?.message}`)
                }
                return parseMadara(source, urls, body, sourceInfo)
            }
        }

        const formData = new FormData()
        formData.append('action', 'manga_get_chapters')
        formData.append('manga', source.mangaId)
        const baseurl = source.url.match(/https?:\/\/[^/]*\//)?.[0]
        try {
            const response = await fetch(joinUrl(baseurl, 'wp-admin/admin-ajax.php'), {
                method: 'post',
                body: formData,
                headers
            })
            const body = await getResponseBody(response)

            return parseMadara(source, urls, body, sourceInfo)
        }
        catch (err) {
            errortext = `${errortext || 'Could not find chapter list in body.'} + ${err?.message || err}`
        }

        if (body && cheerio.load(body)('#manga-chapters-holder')?.length) {
            const resp = await fetch(joinUrl(source.url, '/ajax/chapters/'), { headers, method: 'post' })
            try {
                body = await getResponseBody(resp)
                return parseMadara(source, urls, body, sourceInfo)
            }
            catch (err) {
                throw new Error(`${errortext} + ${err?.message || err}`)
            }
        }
        return { urls: [] }
    }
    catch (err) {
        const host = getHost(source.url)
        return {
            urls: [],
            warnings: [
                [
                    host,
                    `Error fetching chapterlist for ${source.title} on ${host}: ${err?.message || 'Unknown Error.'}`,
                    0
                ]
            ]
        }
    }
}

const madara = {
    fetchFunction: fetchMadara,
    type: TYPE,
    parseLink: async (rawUrl: string) => {
        const sourcehtml = await fetchPage(rawUrl)
        return parseMadaraPage(sourcehtml, rawUrl)
    },
    parseCondition: () => false
}

export const MADARA = TYPE
registerParser(madara)
