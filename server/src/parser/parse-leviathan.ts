import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { getResponseBody, registerParser, headers, decodeHTMLEntities, parse, createSource, createUrlFilter } from '../parser'
import { logWarning } from '../stats'

const TYPE = 'leviathan'

function parseLeviathan(source: Source, body, url) {
    const $ = cheerio.load(body)
    const host = source.url.split('/')[2].split('.').slice(-2).join('.')
    const baseDate = new Date()
    baseDate.setHours(0, 0, 0, 0)

    const urlList = $('li.wp-manga-chapter > a').toArray().map((elem) => {
        const url = $(elem).attr('href')
        const result = String(url).match(/^https?:\/\/([^/]*)\/.*\/([^/]*hapter[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/) || []
        const date = $(elem).closest('.wp-manga-chapter').find('.chapter-release-date').text()
        const created = typeof date === 'string' && date.trim().length && new Date(date.trim()).toJSON()
            ? new Date(date.trim()).getTime()
            : baseDate.getTime()

        return {
            host,
            chapter: result[3],
            url,
            created
        }
    })

    if (!urlList?.length) {
        logWarning(host, `Invalid chapterlist found for ${source.title} from ${url}: Recieved empty URL-List`, 0)
        return []
    }

    return urlList.filter(createUrlFilter(source, (url) => /^https?:\/\/.*\/([^/]*hapter[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/.test(url)))
}


async function parseLeviathanPage(rawUrl: string) {
    const sourcehtml: string = await fetch(rawUrl, { headers }).then(res => res.text())
    const $ = cheerio.load(sourcehtml)

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


    const baseUrl = rawUrl.split('/manga/')[0] + '/manga/'
    const mangaId = rawUrl.replace(baseUrl, '').split('/')[0]

    return createSource(TYPE, mangaId, title, `${baseUrl}${mangaId}`)
}

async function fetchLeviathan(source: Source) {
    let body
    let url
    try {
        const baseUrl = await fetch(source.url.split('/').slice(0, 3).join('/'), { headers }).then((res) => res.url)
        url = `${baseUrl}/manga/${source.url.split('/manga/')[1]}/ajax/chapters`
        url = url.slice(0, 10) + url.slice(10).replace(/\/\//g, '/')
        const response = await fetch(url, { method: 'post', headers })
        body = await getResponseBody(response)
        return parseLeviathan(source, body, url)
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.')
        logWarning(host, `Error fetching chapterlist for ${source.title} from ${url}: ${err?.message || 'Unknown Error.'}`, 0)
        return []
    }
}

const leviathan = {
    fetchFunction: fetchLeviathan,
    type: TYPE,
    parseLink: parseLeviathanPage,
    parseCondition: (url) => url.includes('leviatanscans.com') || url.includes('immortalupdates.com')
}

registerParser(leviathan)