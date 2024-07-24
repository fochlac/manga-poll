import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { registerParser, headers, getResponseBody, joinUrl, categorizeRemoteUrls } from '../parser'
import { getHost, parseNAgoDateString } from '../utils/parse'

const TYPE = 'genkan'

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
                        parseNAgoDateString($(elem).find('.item-company').text()) +
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
    type: TYPE
}

registerParser(genkan)
