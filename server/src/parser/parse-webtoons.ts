import fetch from 'node-fetch'
import { categorizeRemoteUrls, registerParser, headers } from '../parser'
import { parseStringPromise } from 'xml2js'
import { getHost } from '../utils/parse'
import https from 'https'

const TYPE = 'webtoon'

async function fetchWebtoons (source: Source, urls: Record<string, Url>): Promise<ChapterResult> {
    const host = getHost(source.url)
    try {
        const rssXml = await fetch(`${source.url}/rss?title_no=${source.mangaId}`, {
            headers,
            agent: new https.Agent({ rejectUnauthorized: false })
        }).then((res) =>
            res.text()
        )
        const rssJson = await parseStringPromise(rssXml)

        const description = rssJson?.rss?.channel?.[0]?.description[0]
        const imageUrl = rssJson?.rss?.channel?.[0]?.image?.[0]?.url?.[0]

        let sourceInfo
        if (imageUrl?.length && description?.length && (!source.imageUrl || !source.description)) {
            sourceInfo = {
                imageUrl,
                description
            }
        }

        const urlList = rssJson?.rss?.channel?.[0]?.item?.map((item) => {
            const url = item.link[0]
            const chapter = url.split('episode_no=')[1]?.split('&')[0]

            return { url, chapter, host, created: new Date(item.pubDate[0]).getTime() }
        })

        const { newUrls, oldUrls, warnings } = categorizeRemoteUrls(urlList, source, urls)
        return {
            urls: newUrls,
            oldUrls,
            warnings,
            sourceInfo
        }
    }
    catch (err) {
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

const webtoons: Parser = {
    fetchFunction: fetchWebtoons,
    type: TYPE
}

registerParser(webtoons)
