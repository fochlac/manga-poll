import cheerio from 'cheerio'
import fetch from 'node-fetch'
import {
    registerParser,
    headers,
    createSource,
    checkNewUrlAvailability,
    categorizeRemoteUrls,
    testForCloudFlare,
    queuePuppeteerFetch,
    cloudscrape
} from '../parser'
import { getHost, parseNAgoDateString } from '../utils/parse'

const TYPE = 'mangastream'

function testMangastream (rawUrl, sourcehtml) {
    const $ = cheerio.load(sourcehtml)
    const breadcrumpLink = $('ol[itemtype="http://schema.org/BreadcrumbList"] meta[itemprop="position"][content="2"]')
        .closest('li')
        .find('a')
    const thumbnail = $('#content .hentry .thumb img')
    if (!breadcrumpLink?.length && thumbnail?.length) {
        const name = thumbnail.attr('title')
        return createSource(TYPE, rawUrl?.split('/')[4], name, rawUrl)
    }

    const url = $('.readingnavtop .backseries a').length
        ? $('.readingnavtop .backseries a').attr('href')
        : breadcrumpLink.attr('href')
    const name =
        $('.headpost .allc a').text() ||
        $('.headpost [itemprop="name"]')
            .text()
            .split(/( –|\s+chapter)/i)?.[0] ||
        breadcrumpLink.find('span').text()
    const mangaId = url?.split('/').filter((str) => str.trim().length).slice(-1)[0]

    return createSource(TYPE, mangaId, name, url)
}

async function parseMangastream (
    source: Source,
    urls: Record<string, Url>,
    body: string,
    currentUrl: string
): Promise<ChapterResult> {
    const $ = cheerio.load(body)
    const baseDate = new Date()
    baseDate.setHours(0, 0, 0, 0)
    const host = getHost(source.url)

    const urlList = $('#chapterlist li')
        .toArray()
        .map((elem) => {
            const rawDate = new Date($(elem).find('.chapterdate').text())

            return {
                url: $(elem).find('a').attr('href'),
                chapter: String($(elem).data('num') && String($(elem).data('num')).match(/^\d+/)?.[0]),
                host,
                created: !isNaN(rawDate.getTime()) ? rawDate.getTime() : baseDate.getTime()
            }
        })

    if (!urlList?.length) {
        return {
            urls: [],
            warnings: [[host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0]]
        }
    }

    let imageUrl = $('.thumb img').attr('src')
    if (!/https/.test(imageUrl)) {
        imageUrl = $('.thumb img').attr('data-src')
    }
    const description =
        $('meta[name="description"],meta[property="og:description"]').attr('content') ||
        $('div[itemprop="description"]').text()
    let sourceInfo
    if (imageUrl?.length && description?.length && (!source.imageUrl || !source.description)) {
        sourceInfo = {
            imageUrl,
            description
        }
    }

    let updatedSource
    try {
        updatedSource = testMangastream(currentUrl, body)
    }
    catch (e) {
        console.log(e)
    } // eslint-disable-line no-empty
    if (updatedSource && (source.url !== updatedSource.url || updatedSource.mangaId !== source.mangaId)) {
        sourceInfo = sourceInfo || {}
        sourceInfo.update = updatedSource
    }

    const { newUrls, oldUrls, warnings } = categorizeRemoteUrls(urlList, source, urls)

    const { newUrls: availableNewUrls, warnings: availabilityWarnings } = await checkNewUrlAvailability(
        source,
        newUrls,
        (body) => {
            const $ = cheerio.load(body)

            if ($('#readerarea img').length > 3) {
                return true
            }
            else if ($('#readerarea-loading').length) {
                return true
            }
            return false
        }
    )

    return {
        urls: availableNewUrls,
        warnings: warnings.concat(availabilityWarnings),
        oldUrls,
        sourceInfo
    }
}

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

    return $('a.series:has(h4)')
        .toArray()
        .reduce((sourceResults, elem) => {
            const url = $(elem).attr('href')
            const title = $(elem).attr('title')
            const path = url.split('/').slice(3).join('/')
            const source = trackedSeries[path] || trackedSeries[title.replace(/[\W_]+/g, '')]

            if (source) {
                const chapters = $(elem).parent().find('li').toArray()
                let update
                if (source.url !== url || source.title !== title || source.mangaId !== url?.split('/').filter((str) => str.trim().length).slice(-1)[0]) {
                    update = {
                        ...source,
                        mangaId: url?.split('/').filter((str) => str.trim().length).slice(-1)[0],
                        url,
                        title
                    }
                }

                const chapterList = chapters.map((li) => {
                    const link = $(li).find('a')
                    const url = link.attr('href')
                    const rawChapter = link.text()
                    const rawDate = parseNAgoDateString($(li).find('span').text())

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

async function fetchMangastream (source: Source, urls: Record<string, Url>): Promise<ChapterResult> {
    try {
        let url = source.url
        const response = await fetch(url, { method: 'get', headers }).then((res) => {
            if (res.status === 404) {
                url = url.replace(/[0-9]{8,13}-/, '')
                return fetch(url, { method: 'get', headers })
            }
            return res
        })

        const body = await response.text()
        testForCloudFlare(body, response.status)

        return parseMangastream(source, urls, body, response.url)
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

async function fetchFrontPage (sources: Source[], urls: Record<string, Url>): Promise<ChapterResult[]> {
    if (!sources.length) return []

    try {
        const url = sources[0].url.split('/').slice(0, 3).join('/')
        const response = await fetch(url, { method: 'get', headers })

        let body = await response.text()

        try {
            testForCloudFlare(body, response.status)
            if (url.includes('flame')) {
                console.log(url, body)
            }
        }
        catch (e) {
            body = await queuePuppeteerFetch(url)
            if (body === '') {
                body = await cloudscrape(url)
            }
        }

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

export const mangastream: Parser = {
    fetchFunction: fetchMangastream,
    fetchFrontPageFunction: fetchFrontPage,
    type: TYPE
}

registerParser(mangastream)
