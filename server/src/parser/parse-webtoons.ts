import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { createSource, createUrlFilter, registerParser, headers } from '../parser'
import { logWarning } from '../stats'
import { parseStringPromise } from 'xml2js'
import { getHost } from '../utils/parse'

const TYPE = 'webtoon'

async function fetchWebtoons(source: Source) {
    const host = getHost(source.url)
    try {
        const rssXml = await fetch(`${source.url}/rss?title_no=${source.mangaId}`, { headers }).then((res) => res.text())
        const rssJson = await parseStringPromise(rssXml)

        const urlList = rssJson?.rss?.channel?.[0]?.item
            ?.map((item) => {
                const url = item.link[0]
                const chapter = url.split('episode_no=')[1]?.split('&')[0]

                return { url, chapter, host, created: new Date(item.pubDate[0]).getTime() }
            })

        return urlList.filter(createUrlFilter(source))
    }
    catch (err) {
        logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${err?.message || 'Unknown Error.'}`, 0)
        return []
    }
}

async function parseWebtoonsLink (rawUrl: string) {
    console.log(TYPE)
    const url = rawUrl.split('/').slice(0, 6).join('/')
    const id = rawUrl.split('title_no=')[1]?.split('&')[0]
    const rssXml = await fetch(`${url}/rss?title_no=${id}`, { headers }).then(r => r.text())
    const rssJson = await parseStringPromise(rssXml)
    const title = rssJson?.rss?.channel?.[0]?.title[0]

    return createSource(TYPE, id, title, url)
}


const webtoons: Parser = {
    fetchFunction: fetchWebtoons,
    type: TYPE,
    parseLink: parseWebtoonsLink,
    parseCondition: (url) => url.includes('webtoons.com')
}

registerParser(webtoons)
