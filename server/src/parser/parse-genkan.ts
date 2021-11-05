import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { registerParser, headers, getResponseBody, createSource, joinUrl, categorizeRemoteUrls } from '../parser'
import { getHost } from '../utils/parse'

const TYPE = 'genkan'

async function testGenkan (rawUrl) {
    const [url, id] = rawUrl.match(/https?:\/\/.*\/comics\/(\d*)-[-\w\d]*/) || []
    if (!url || !id) {
        throw Error(`Could not extract url and/or id from genkan page. url: ${url} id: ${id}`)
    }
    const sourcehtml: string = await fetch(url, { headers }).then((res) => res.text())

    const $ = cheerio.load(sourcehtml)
    const title = $('meta[property*="title"]').attr('content')

    return createSource(TYPE, id, title, url)
}

function parseDate (dateString) {
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

async function fetchGenkan (source: Source, urls: Record<string, Url>): Promise<ChapterResult> {
    try {
        const response = await fetch(source.url, { method: 'get', headers })
        const body = await getResponseBody(response)

        const $ = cheerio.load(body)
        const host = getHost(source.url)

        const urlList = $('#content > .container > .row > .col-lg-9 .card .list-item')
            .toArray()
            .map((elem) => {
                const chapter = $(elem).find('span').text().trim()
                return {
                    url: $(elem).find('a').attr('href'),
                    chapter,
                    host,
                    created:
                        parseDate($(elem).find('.item-company').text()) +
                        (!isNaN(Number(chapter)) ? Number(chapter) : 0)
                }
            })

        const rawImageUrl = $('.media-comic-card a.media-content')
            .attr('style')
            ?.match(/background-image:\s*url\(([^)]*)\)/)?.[1]
        const imageUrl = rawImageUrl.includes(getHost(source.url))
            ? rawImageUrl
            : joinUrl(source.url.split('/').slice(0, 3).join('/'), rawImageUrl)
        const description = $('meta[name="description"]').attr('content')

        let sourceInfo
        if (imageUrl?.length && description?.length && (!source.imageUrl || !source.description)) {
            sourceInfo = {
                imageUrl,
                description
            }
        }

        if (!urlList?.length) {
            return {
                urls: [],
                warnings: [
                    [host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0]
                ]
            }
        }

        const { newUrls, oldUrls, warnings } = categorizeRemoteUrls(urlList, source, urls)
        return {
            urls: newUrls,
            oldUrls,
            warnings,
            sourceInfo
        }
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

const genkan: Parser = {
    fetchFunction: fetchGenkan,
    type: TYPE,
    parseLink: testGenkan,
    parseCondition: async (url) => {
        try {
            const sourcehtml: string = await fetch(url, { headers, redirect: 'manual' }).then((res) => res.text())
            return sourcehtml.includes('Powered by Genkan.')
        }
        catch (e) {
            console.log('Error fetching url.', e)
            return false
        }
    }
}

registerParser(genkan)
