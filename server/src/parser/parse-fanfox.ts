import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { registerParser, headers, getResponseBody } from '../parser'
import { logWarning } from '../stats'
import { getUrlKey, getUrls, updateUrl } from '../url-storage'

const TYPE = 'fanfox'

function parseFanfox(source: Source, body) {
    const $ = cheerio.load(body)
    const baseDate = new Date()
    baseDate.setHours(0, 0, 0, 0)
    const host = source.url.split('/')[2].split('.').slice(-2).join('.')

    const urlList = $('#chapterlist .detail-main-list li').toArray().map((elem) => {
        const rawDate = new Date($(elem).find('.title2').text())
        const url = $(elem).find('a').attr('href')

        return {
            url: url.includes('https://fanfox.net') ? url : `https://fanfox.net${url}`,
            chapter: $(elem).find('.title3a').text().replace(/^.*Ch\./, '').replace(/ - .*/, ''),
            host,
            created: !isNaN(rawDate.getTime()) ? rawDate.getTime() : baseDate.getTime()
        }
    })

    if (!urlList?.length) {
        logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0)
        return []
    }
    return urlList.filter((url) => {
        const isValid = /^https:\/\/fanfox.net\/manga\/.*\/c([\d.]*)\/1.html$/.test(url.url) &&
            /^[\d\.-]*$/.test(String(url.chapter)) && url.host && url.host.length > 0
        const key = getUrlKey(url, source.id)
        const stored = getUrls()[key]

        if (!isValid && !stored) {
            logWarning(key, `Invalid url found for ${source.title}: ${JSON.stringify(url)}`)
        }
        if (isValid && stored) {
            updateUrl(source, url)
        }

        return isValid && !stored
    })
}

async function fetchFanFox(source: Source) {
    try {
        const response = await fetch(source.url, { method: 'get', headers: { ...headers, cookie: 'isAdult=1;' } })
        const body = await getResponseBody(response)

        return parseFanfox(source, body)
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.')
        logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${err?.message || 'Unknown Error.'}`, 0)
        return []
    }
}


async function parseFanfoxPage(rawUrl: string) {
    const sourcehtml: string = await fetch(rawUrl, { headers: { ...headers, cookie: 'isAdult=1;' }}).then(res => res.text())

    const $ = cheerio.load(sourcehtml)

    const path = rawUrl.match(/\/manga\/[^/]*\//)?.[0]
    const name = $('.reader-header-title-1 a:first-child').text() || $('.detail-info-right-title-font').text()

    return {
        type: TYPE,
        mangaId: path ? path.split('/')[2] : null,
        title: name,
        url: rawUrl.match(/^http.*fanfox.net\/manga\/[^/]*\//)?.[0]
    }
}

const fanfox: Parser = {
    fetchFunction: fetchFanFox,
    type: TYPE,
    parseLink: parseFanfoxPage,
    parseCondition: (url) => url.includes('fanfox.net')
}

registerParser(fanfox)
