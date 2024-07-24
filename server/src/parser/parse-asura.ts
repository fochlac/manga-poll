import cheerio from 'cheerio'
import fetch from 'node-fetch'
import {
    registerParser,
    headers,
    categorizeRemoteUrls,
    testForCloudFlare,
    queuePuppeteerFetch,
    cloudscrape
} from '../parser'
import { getHost, parseNAgoDateString } from '../utils/parse'

const TYPE = 'asura'
const BASEURL = 'https://asuracomic.net'

async function parseMangastreamFront (
    sources: Source[],
    urls: Record<string, Url>,
    body: string
): Promise<ChapterResult[]> {
    const $ = cheerio.load(body)
    const baseDate = new Date()
    baseDate.setHours(0, 0, 0, 0)
    const host = getHost(sources[0].url)
    const trackedSeries:Record<string, Source> = sources.reduce((trackedSeries, source) => {
        const path = source.url.split('/').slice(3).join('/')
        trackedSeries[path] = source
        trackedSeries[source.title.replace(/[\W_]+/g, '')] = source
        return trackedSeries
    }, {})

    return $('a[href*="/series/"]')
        .toArray()
        .reduce((sourceResults, elem) => {
            if (!/^\/series\/[^/]+\/?$/.test($(elem).attr('href')) || $(elem).html().includes('<img')) {
                return sourceResults
            }
            const url = BASEURL + $(elem).attr('href')

            const title = $(elem).text()
            const path = url.split('/').slice(3).join('/')
            const source = trackedSeries[path] || trackedSeries[title.replace(/[\W_]+/g, '')]

            if (source) {
                const mangaId = url?.split('/').filter((str) => str.trim().length).slice(-1)[0]
                const chapters = $(elem).parent().parent().find('a:has(svg)').toArray()
                let update
                if (source.url !== url || source.title !== title || source.mangaId !== url?.split('/').filter((str) => str.trim().length).slice(-1)[0]) {
                    update = {
                        ...source,
                        mangaId,
                        url,
                        title
                    }
                }

                const chapterList = chapters.map((link) => {
                    const url = BASEURL + $(link).attr('href')
                    const rawChapter = $(link).find('svg').closest('div').text()
                    const rawDate = parseNAgoDateString($(link).find('p').text())

                    return {
                        url,
                        chapter: String(rawChapter).trim().match(/^Chapter ([\d.]+)/)?.[1],
                        host,
                        created: rawDate
                    }
                })

                const { newUrls, oldUrls, warnings } = categorizeRemoteUrls(chapterList, source, urls)

                sourceResults.push({
                    urls: newUrls,
                    warnings: warnings,
                    oldUrls,
                    source,
                    sourceInfo: update ? { update } : undefined
                })
            }
            return sourceResults
        }, [])
}

async function fetchFrontPage (sources: Source[], urls: Record<string, Url>): Promise<ChapterResult[]> {
    if (!sources.length) return []

    try {
        const url = sources[0].url.split('/').slice(0, 3).join('/')
        const response = await fetch(url, { method: 'get', headers })
        const hostUrl = response.url
        if (hostUrl !== url) {
            console.log('changed URL', hostUrl)
        }

        let body = await response.text()

        try {
            testForCloudFlare(body, response.status)
        }
        catch (e) {
            body = await queuePuppeteerFetch(url)
            if (body === '') {
                body = await cloudscrape(url)
            }
        }

        if (!body) return []

        return parseMangastreamFront(sources, urls, body)
    }
    catch (err) {
        const host = getHost(sources[0].url)
        return sources.map((source) => ({
            urls: [],
            source,
            warnings: [
                [
                    host,
                    `Error fetching frontpage for ${host}: ${err?.message || 'Unknown Error.'}`,
                    0
                ]
            ]
        }))
    }
}

export const asura: Parser = {
    fetchFunction: () => null,
    fetchFrontPageFunction: fetchFrontPage,
    type: TYPE
}

registerParser(asura)
