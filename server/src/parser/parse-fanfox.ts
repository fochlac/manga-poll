import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { registerParser, headers, getResponseBody, joinUrl, categorizeRemoteUrls } from '../parser'
import { getHost } from '../utils/parse'

const TYPE = 'fanfox'

function parseFanfox (source: Source, urls: Record<string, Url>, body): ChapterResult {
    const $ = cheerio.load(body)
    const baseDate = new Date()
    baseDate.setHours(0, 0, 0, 0)
    const host = getHost(source.url)

    const urlList = $('#chapterlist .detail-main-list li')
        .toArray()
        .map((elem) => {
            const rawDate = new Date($(elem).find('.title2').text())
            const url = $(elem).find('a').attr('href')
            const chapterNumberRaw = $(elem)
                .find('.title3, .title3a')
                .text()
                .replace(/^.*Ch\./, '')
                .replace(/ - .*/, '')
            const chapterNumber = String(chapterNumberRaw).match(/^[_\d.-]+/)?.[0]
            const volumeNumberRaw = $(elem)
                .find('.title3, .title3a')
                .text()
                .replace(/^.*Vol\./, '')
                .replace(/\sCh\..*/, '')
            const volumeNumber = String(volumeNumberRaw).match(/^[_\d.-]+/)?.[0]

            return {
                url: url.includes('https://fanfox.net') ? url : joinUrl('https://fanfox.net', url),
                chapter: `${chapterNumber}${
                    volumeNumber && !isNaN(Number(volumeNumber)) ? ` (Vol. ${Number(volumeNumber)})` : ''
                }`,
                host,
                created: !isNaN(rawDate.getTime()) ? rawDate.getTime() : baseDate.getTime()
            }
        })

    const imageUrl = $('.detail-info-cover-img').attr('src')
    const description = $('.detail-info-right .fullcontent').text()

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

    const { newUrls, oldUrls, warnings } = categorizeRemoteUrls(urlList, source, urls, (url) =>
        /^https:\/\/fanfox.net\/manga\/.*\/c([\d.]*)\/1.html$/.test(url)
    )
    return {
        urls: newUrls,
        oldUrls,
        warnings,
        sourceInfo
    }
}

async function fetchFanFox (source: Source, urls: Record<string, Url>): Promise<ChapterResult> {
    try {
        const response = await fetch(source.url, { method: 'get', headers: { ...headers, cookie: 'isAdult=1;' } })
        const body = await getResponseBody(response)

        return parseFanfox(source, urls, body)
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

const fanfox: Parser = {
    fetchFunction: fetchFanFox,
    type: TYPE
}

registerParser(fanfox)
