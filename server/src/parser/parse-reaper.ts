import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { registerParser, headers, getResponseBody, createSource, categorizeRemoteUrls } from '../parser'
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
            const chapterNumber = String(chapterNumberRaw).match(/^[_\d.-]+/)?.[0]
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
        const body = await getResponseBody(response)

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

async function parseReaperPage (rawUrl: string) {
    const sourcehtml: string = await fetch(rawUrl, { headers }).then((res) =>
        res.text()
    )

    const $ = cheerio.load(sourcehtml)
    const path = rawUrl.match(/\/comics\/[^/]*\//)?.[0]
    const title = $('main h2').text() || $('main .container h1').text()

    return createSource(TYPE, path?.split('/')[2], title, rawUrl.match(/^http.*reaperscans.com\/comics\/[^/]*\//)?.[0])
}

const reaper: Parser = {
    fetchFunction: fetchReaper,
    type: TYPE,
    parseLink: parseReaperPage,
    parseCondition: (url) => url.includes('reaperscans.com')
}

registerParser(reaper)
