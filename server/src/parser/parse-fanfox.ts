import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { registerParser } from '../parser'
import { getUrlKey, getUrls, updateUrl } from '../url-controller'

const TYPE = 'fanfox'
const warned: Record<string, number> = {}

function parseFanfox (source: Source, body) {
    const $ = cheerio.load(body)
    const baseDate = new Date()
    baseDate.setHours(0, 0, 0, 0)
    const host = source.url.replace(/https?:\/\//, '').split('/')[0]

    const urlList = $('#chapterlist .detail-main-list li').toArray().map((elem) => {
        const rawDate = new Date($(elem).find('.title2').text())
        const url = $(elem).find('a').attr('href')

        return {
            url: url.includes('https://fanfox.net') ? url : `https://fanfox.net${url}`,
            chapter: $(elem).find('.title3').text().replace(/^.*Ch\./, '').replace(/ - .*/, ''),
            host,
            created: !isNaN(rawDate.getTime()) ? rawDate.getTime() : baseDate.getTime()
        }
    })

    return urlList.filter((url) => {
        const isValid = /^https:\/\/fanfox.net\/manga\/.*\/c([\d.]*)\/1.html$/.test(url.url)
        const key = getUrlKey(url, source.id)
        const stored = getUrls()[key]

        if (!isValid && (warned[key] || 0) < 3) {
            console.log(`Invalid url found for ${source.title}: ${JSON.stringify(url)}`)
            warned[key] = typeof warned[key] === 'number' ? warned[key] + 1 : 0
        }
        if (isValid && stored) {
            updateUrl(source, url)
        }

        return isValid && !stored
    })
}

async function fetchFanFox (source: Source) {
    const body = await fetch(source.url, { method: 'get', headers: {cookie: 'isAdult=1;'} }).then((res) => res.text())

    return parseFanfox(source, body)
}


async function parseFanfoxPage (rawUrl: string) {
    const sourcehtml: string = await fetch(rawUrl).then(res => res.text())
    
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
