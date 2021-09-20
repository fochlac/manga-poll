import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { registerParser, headers, getResponseBody, createSource, createUrlFilter } from '../parser'
import { logWarning } from '../stats'

const TYPE = 'mangastream'

async function testMangastream(rawUrl) {
    const sourcehtml: string = await fetch(rawUrl, { headers }).then(res => res.text())

    const $ = cheerio.load(sourcehtml)
    const breadcrumpLink = $('ol[itemtype="http://schema.org/BreadcrumbList"] li:has(meta[itemprop="position"][content="2"]) a[itemprop="item"][href*="/comics/"]')
    const url = breadcrumpLink.attr('href')
    const name = breadcrumpLink.find('span').text()

    return createSource(TYPE, url?.split('/')[4], name, url)
}

function parseMangastream(source: Source, body) {
    const $ = cheerio.load(body)
    const baseDate = new Date()
    baseDate.setHours(0, 0, 0, 0)
    const host = source.url.split('/')[2].split('.').slice(-2).join('.')

    const urlList = $('#chapterlist li').toArray().map((elem) => {
        const rawDate = new Date($(elem).find('.chapterdate').text())

        return {
            url: $(elem).find('a').attr('href'),
            chapter: $(elem).data('num').match(/^\d+/)?.[0],
            host,
            created: !isNaN(rawDate.getTime()) ? rawDate.getTime() : baseDate.getTime()
        }
    })

    if (!urlList?.length) {
        logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0)
        return []
    }

    return urlList.filter(createUrlFilter(source))
}

async function fetchMangastream(source: Source) {
    try {
        const response = await fetch(source.url, { method: 'get', headers })
        const body = await getResponseBody(response)

        return parseMangastream(source, body)
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.')
        logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${err?.message || 'Unknown Error.'}`, 0)
        return []
    }
}

const mangastream: Parser = {
    fetchFunction: fetchMangastream,
    type: TYPE,
    parseLink: testMangastream,
    parseCondition: async (url) => {
        const sourcehtml: string = await fetch(url, { headers }).then(res => res.text())
        return sourcehtml.includes('ts-breadcrumb bixbox')
    }
}

registerParser(mangastream)