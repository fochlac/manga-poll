import cheerio from 'cheerio'
import fetch from 'node-fetch'
import {
    registerParser,
    headers,
    getResponseBody,
    createSource,
    checkNewUrlAvailability,
    categorizeRemoteUrls
} from '../parser'
import { getHost } from '../utils/parse'

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

    const url = $('.readingnavtop .backseries a').length ? $('.readingnavtop .backseries a').attr('href') : breadcrumpLink.attr('href')
    const name = $('.headpost .allc a').text() ||
        $('.headpost [itemprop="name"]').text().split(/( –|\s+chapter)/i)?.[0] ||
        breadcrumpLink.find('span').text()
    const mangaId = $('.bookmark[data-id]').data('id') || sourcehtml.match(/"manga_ID":"(\d+)"/)?.[1] || url?.split('/')[4]

    return createSource(TYPE, mangaId, name, url)
}

async function parseMangastream (source: Source, urls: Record<string, Url>, body: string, currentUrl: string): Promise<ChapterResult> {
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
    const description = $('meta[name="description"],meta[property="og:description"]').attr('content') || $('div[itemprop="description"]').text()
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
    if (source.url !== updatedSource.url || updatedSource.mangaId !== source.mangaId) {
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

async function fetchMangastream (source: Source, urls: Record<string, Url>): Promise<ChapterResult> {
    try {
        const response = await fetch(source.url, { method: 'get', headers })
            .then((res) => {
                if (res.status === 404) {
                    return fetch(source.url.replace(/[0-9]{8,13}-/, ''), { method: 'get', headers })
                }
                return res
            })
        const body = await getResponseBody(response)

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

const mangastream: Parser = {
    fetchFunction: fetchMangastream,
    type: TYPE,
    parseLink: async (rawUrl) => {
        const sourcehtml: string = await fetch(rawUrl, { headers }).then((res) => res.text())
        return testMangastream(rawUrl, sourcehtml)
    },
    parseCondition: async (url) => {
        try {
            const sourcehtml: string = await fetch(url, { headers, redirect: 'manual' }).then((res) => res.text())
            const $ = cheerio.load(sourcehtml)
            return sourcehtml.includes('ts-breadcrumb bixbox') ||
                $('.readingnavtop .chpnw, .headpost [itemprop="name"], #content .hentry .thumb img')?.length > 0
        }
        catch (e) {
            console.log('Error fetching url.', e)
            return false
        }
    }
}

registerParser(mangastream)
