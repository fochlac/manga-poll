import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { registerParser, headers, getResponseBody, createSource, createUrlFilter } from '../parser'
import { logWarning } from '../stats'

const TYPE = 'genkan'

async function testGenkan(rawUrl) {
    const [url, id] = rawUrl.match(/https?:\/\/[^/]*\/comics\/(\d*)-[-\w\d]*/) || []
    if (!url || !id) {
        throw Error(`Could not extract url and/or id from genkan page. url: ${url} id: ${id}`)
    }
    const sourcehtml: string = await fetch(url, { headers }).then(res => res.text())

    const $ = cheerio.load(sourcehtml)
    const title = $('meta[property*="title"]').attr('content')

    return createSource(TYPE, id, title, url)
}

function parseDate(dateString) {
    const baseDate = new Date()
    baseDate.setHours(0, 0, 0, 0)
    const amount = Number(dateString.match(/\d+/)?.[0])
    if (isNaN(amount)) {
        return baseDate.getTime()
    }
    if (dateString.includes('inutes')) {
        return Date.now() - amount * 60 * 1000
    }
    if (dateString.includes('hour')) {
        return Date.now() - amount * 60 * 60 * 1000
    }
    if (dateString.includes('day')) {
        return Date.now() - amount * 24 * 60 * 60 * 1000
    }
    if (dateString.includes('week')) {
        return Date.now() - amount * 7 * 24 * 60 * 60 * 1000
    }
    const date = new Date()
    if (dateString.includes('onth')) {
        date.setMonth(date.getMonth() - amount)
        return date.getTime()
    }
    if (dateString.includes('ear')) {
        date.setFullYear(date.getFullYear() - amount)
        return date.getTime()
    }

    return baseDate.getTime()
}

async function fetchGenkan(source: Source) {
    try {
        const response = await fetch(source.url, { method: 'get', headers })
        const body = await getResponseBody(response)

        const $ = cheerio.load(body)
        const host = source.url.split('/')[2].split('.').slice(-2).join('.')
    
        const urlList = $('#content > .container > .row > .col-lg-9 .card .list-item').toArray().map((elem) => {
            const chapter = $(elem).find('span').text().trim()
            return {
                url: $(elem).find('a').attr('href'),
                chapter,
                host,
                created: parseDate($(elem).find('.item-company').text()) + (!isNaN(Number(chapter)) ? Number(chapter) : 0)
            }
        })
    
        if (!urlList?.length) {
            logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0)
            return []
        }
    
        return urlList.filter(createUrlFilter(source))
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.')
        logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${err?.message || 'Unknown Error.'}`, 0)
        return []
    }
}

const genkan: Parser = {
    fetchFunction: fetchGenkan,
    type: TYPE,
    parseLink: testGenkan,
    parseCondition: async (url) => {
        const sourcehtml: string = await fetch(url, { headers }).then(res => res.text())
        return sourcehtml.includes('Powered by Genkan.')
    }
}

registerParser(genkan)
