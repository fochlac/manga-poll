import cheerio from 'cheerio'
import FormData from 'form-data'
import fetch from 'node-fetch'
import { getResponseBody, registerParser, headers, decodeHTMLEntities, parse, createSource, createUrlFilter } from '../parser'
import { logWarning } from '../stats'
import { getUrlKey } from '../url-storage'

const TYPE = 'madara'

const dateMonthFirst = /^[^\d]*(1[012]|0\d|\d)[^\d](3[0,1]|[012]\d|\d)[^\d](\d{2}|\d{4})[^\d]*$/
const dateDayFirst = /^[^\d]*(3[0,1]|[012]\d|\d)[^\d](1[012]|0\d|\d)[^\d](\d{2}|\d{4})[^\d]*$/
const monthWritten = /^[^\d]*[A-Za-z]{2,10}.{1,2}(3[0,1]|[012]\d|\d)[^\d]{1,3}\d{2}|\d{4}[^\d]*$/

function getDateType(urlList) {
    const types = urlList.reduce((types, url) => {
        if (dateMonthFirst.test(url?.date || '') || dateDayFirst.test(url?.date || '')) {
            if (dateMonthFirst.test(url?.date || '')) {
                types.dateMonthFirst = Object.prototype.hasOwnProperty.call(types, 'dateMonthFirst') ? types.dateMonthFirst + 1 : 1
            }
            if (dateDayFirst.test(url?.date || '')) {
                types.dateDayFirst = Object.prototype.hasOwnProperty.call(types, 'dateDayFirst') ? types.dateDayFirst + 1 : 1
            }
        }
        else if (monthWritten.test(url?.date || '')) {
            types.monthWritten = Object.prototype.hasOwnProperty.call(types, 'monthWritten') ? types.monthWritten + 1 : 1
        }
        else {
            types.unparsable = Object.prototype.hasOwnProperty.call(types, 'unparsable') ? types.unparsable + 1 : 1
        }
        return types
    }, {})

    return Object.keys(types).reduce((type1, type2) => types[type1] > types[type2] ? type1 : type2, 'unparsable')
}

function parseDates(urlList) {
    const type = getDateType(urlList)

    return (url) => {
        const baseDate = new Date()
        baseDate.setHours(0, 0, 0, 0)
        let created = baseDate.getTime()
        const { date } = url

        if (type === 'monthWritten' && typeof date === 'string' && date.trim().length && new Date(date.trim()).toJSON()) {
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
let warned = {}
setTimeout(() => {
    warned = {}
}, 1000 * 3600)
async function parseMadara(source: Source, body) {
    const $ = cheerio.load(body)
    const host = source.url.split('/')[2].split('.').slice(-2).join('.')

    const urlList = $('li.wp-manga-chapter > a').toArray().map((elem) => {
        const url = $(elem).attr('href')
        const result = String(url).match(/^https?:\/\/([^/]*)\/.*\/([^/]*hapter[^/\d]*|ch[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/) || []
        return {
            host,
            chapter: result[3],
            url,
            date: $(elem).closest('.wp-manga-chapter').find('.chapter-release-date').text()
        }
    })

    if (!urlList?.length) {
        logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0)
        return []
    }

    let newUrls = urlList
        .map(parseDates(urlList))
        .filter(createUrlFilter(source, (url) => /^https?:\/\/.*\/([^/]*hapter[^/\d]*|ch[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/.test(url)))

    const invalidIndexes = [] 
    if (newUrls.length < 5) {
        await newUrls.reduce((promise, url: Url, index) => {
            return promise.then(async () => {              
                const resp = await fetch(url.url, { headers })
                body = await getResponseBody(resp)
                const $ = cheerio.load(body)

                if (!$('#image-0').length || !$('#image-1').length) {
                    invalidIndexes.push(index)
                }
            })
        }, Promise.resolve())

        if (invalidIndexes.length) {
            invalidIndexes.forEach((index) => {
                const url = newUrls[index]
                if (!warned[url.url]) {
                    logWarning(getUrlKey(url, source.id), `Found url for "${source.title} - Chapter ${url.chapter}" but link doesnt lead to chapter: ${url.url}`, 0)
                    warned[url.url] = true
                    warned[source.id] = true
                }
            })
            newUrls = newUrls.filter((url, index) => !invalidIndexes.includes(index))
        }
    }
    if (warned[source.id]) {
        newUrls.forEach((url) => {
            if (warned[url.url]) {
                console.log(`Previously invalid url for "${source.title} - Chapter ${url.chapter}"`)
            }
        })
    }
    return newUrls
}

const idRegex = /["']?manga_id["']?:\s?["']?(\d{2,10})["']?/g

async function parseMadaraPage(rawUrl: string) {
    const sourcehtml: string = await fetch(rawUrl, { headers }).then(res => res.text())
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
        .reduce((map, id) => {
            map[id] = typeof map[id] === 'number' ? map[id] + 1 : 1
            return map
        }, {})

    const mangaId = Object.keys(ids).sort((id1, id2) => ids[id1] - ids[id2])[0]

    const titles = [
        Array.from($('script[type="application/ld+json"]'))
            .map((script) => parse($(script).text())?.headline).find((h) => h),
        $('#chapter-heading').text().split(' - ')[0],
        $('.post-title h1').contents().filter((index, el) => el.nodeType === 3).text(),
        $('.rate-title').attr('title')
    ]
        .filter((title) => !!title && String(title).length)
        .reduce((map, title) => {
            const clean = decodeHTMLEntities(title).trim()
            map[clean] = typeof map[clean] === 'number' ? map[clean] + 1 : 1
            return map
        }, {})
    const title = Object.keys(titles).sort((title1, title2) => titles[title1] - titles[title2])[0]

    let url = rawUrl.match(/https?:\/\/[^/]*\/[^/]*\/[^/]*\//)?.[0]

    return createSource(TYPE, mangaId, title, url)
}

async function fetchMadara(source: Source) {
    let body
    try {
        const formData = new FormData()
        formData.append('action', 'manga_get_chapters')
        formData.append('manga', source.mangaId)
        const baseurl = source.url.match(/https?:\/\/[^/]*\//)?.[0]
        const response = await fetch(`${baseurl}wp-admin/admin-ajax.php`, { method: 'post', body: formData, headers })
        try {
            body = await getResponseBody(response)
        }
        catch(err) {}
        
        if (!body || body.length < 1000) {
            const resp = await fetch(source.url, { headers })
            body = await getResponseBody(resp)
        }

        return parseMadara(source, body)
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.')
        logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${err?.message || 'Unknown Error.'}`, 0)
        return []
    }
}

const madara = {
    fetchFunction: fetchMadara,
    type: TYPE,
    parseLink: parseMadaraPage,
    parseCondition: () => false
}

export const MADARA = TYPE
registerParser(madara)