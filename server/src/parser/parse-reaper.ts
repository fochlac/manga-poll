import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { registerParser, headers, testForCloudFlare, categorizeRemoteUrls, queuePuppeteerFetch } from '../parser'
import { getHost, parseNAgoDateString } from '../utils/parse'

const TYPE = 'reaper'

function parseReaper (source: Source, urls: Record<string, Url>, body): ChapterResult {
    const $ = cheerio.load(body)
    const baseDate = new Date()
    baseDate.setHours(0, 0, 0, 0)
    const host = getHost(source.url)

    const urlList = $('ul li a[href*="/chapters/"]')
        .toArray()
        .map((elem) => {
            const rawDate = $(elem).find('div:nth-child(2) > div > div:nth-child(2) p').text()
            const url = $(elem).attr('href')
            const chapterNumberRaw = $(elem)
                .find('div:nth-child(2) > div > div:nth-child(1) p')
                .text()
            const chapterNumber = String(chapterNumberRaw).match(/[\d.-]+/)?.[0]
            const date = parseNAgoDateString(rawDate)

            return {
                url,
                chapter: `${chapterNumber}`,
                host,
                created: !isNaN(date) ? date : baseDate.getTime()
            }
        })

    const imageUrl = $('.container img').attr('src')
    const description = $('h1 + p.prose').text()

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
            warnings: [[host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0]]
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

async function fetchReaper (source: Source, urls: Record<string, Url>): Promise<ChapterResult> {
    try {
        const response = await fetch(source.url, { method: 'get', headers })
        const body = await response.text()

        testForCloudFlare(body, response.status)

        return parseReaper(source, urls, body)
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

async function parseFrontPage (
    sources: Source[],
    urls: Record<string, Url>,
    body: string
): Promise<ChapterResult[]> {
    const $ = cheerio.load(body)
    const baseDate = new Date()
    baseDate.setHours(0, 0, 0, 0)
    const host = getHost(sources[0].url)
    const trackedSeries:Record<string, Source> = sources.reduce((trackedSeries, source) => {
        trackedSeries[source.url] = source
        return trackedSeries
    }, {})

    return $('h2:contains(\'Latest Comics\')').parent().find('p > a[href*="/comics/"]')
        .toArray()
        .reduce((sourceResults, elem) => {
            const url = $(elem).attr('href')

            if (trackedSeries[url]) {
                const chapters = $(elem).parent().parent().find('a[href*="/chapters/"]').toArray()
                const source = trackedSeries[url]
                const chapterList = chapters.map((linkEl) => {
                    const link = $(linkEl)
                    const url = link.attr('href')
                    const rawChapter = link.contents().not(link.children()).text().trim()
                    const rawDate = parseNAgoDateString(link.find('p').text())

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
                    source
                })
            }
            return sourceResults
        }, [])
}

async function fetchFrontPage (sources: Source[], urls: Record<string, Url>): Promise<ChapterResult[]> {
    try {
        const url = `${sources[0].url.split('/').slice(0, 3).join('/')}/latest/comics`
        const response = await fetch(url, { method: 'get', headers })
        let body = await response.text()

        try {
            testForCloudFlare(body, response.status)
        }
        catch (e) {
            body = await queuePuppeteerFetch(url)
        }

        return parseFrontPage(sources, urls, body)
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

const reaper: Parser = {
    fetchFunction: fetchReaper,
    fetchFrontPageFunction: fetchFrontPage,
    type: TYPE
}

registerParser(reaper)
