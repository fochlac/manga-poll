import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { registerParser, headers, getResponseBody, createSource, createUrlFilter, checkNewUrlAvailability } from '../parser'
import { getHost } from '../utils/parse'

const TYPE = 'mangastream'

async function testMangastream(rawUrl) {
    const sourcehtml: string = await fetch(rawUrl, { headers }).then(res => res.text())

    const $ = cheerio.load(sourcehtml)
    const breadcrumpLink = $('ol[itemtype="http://schema.org/BreadcrumbList"] li:has(meta[itemprop="position"][content="2"]) a[itemprop="item"][href*="/comics/"]')
    const url = breadcrumpLink.attr('href')
    const name = breadcrumpLink.find('span').text()

    return createSource(TYPE, url?.split('/')[4], name, url)
}

let warned = {}
setTimeout(() => {
    warned = {}
}, 1000 * 3600)
async function parseMangastream(source: Source, body) {
    const $ = cheerio.load(body)
    const baseDate = new Date()
    baseDate.setHours(0, 0, 0, 0)
    const host = getHost(source.url)

    const urlList = $('#chapterlist li').toArray().map((elem) => {
        const rawDate = new Date($(elem).find('.chapterdate').text())

        return {
            url: $(elem).find('a').attr('href'),
            chapter: $(elem).data('num') && String($(elem).data('num')).match(/^\d+/)?.[0],
            host,
            created: !isNaN(rawDate.getTime()) ? rawDate.getTime() : baseDate.getTime()
        }
    })

    if (!urlList?.length) {
        return { urls: [], warning: [host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0] }
    }

    const imageUrl = $('.thumb img').attr('src')
    const description =  $('meta[name="description"],meta[property="og:description"]').attr('content')
    let sourceInfo
    if (imageUrl?.length && description?.length && (!source.imageUrl || !source.description)) {
        sourceInfo = {
            imageUrl,
            description
        }
    }

    let newUrls = urlList.filter(createUrlFilter(source))

    const urls = await checkNewUrlAvailability(source, newUrls, (body) => {
        const $ = cheerio.load(body)

        if ($('#readerarea img').length > 3) {
            return true
        }
        else if ($('#readerarea-loading').length) {
            return true
        }
        return false
    })

    return {
        urls,
        sourceInfo
    }
}

async function fetchMangastream(source: Source) {
    try {
        const response = await fetch(source.url, { method: 'get', headers })
        const body = await getResponseBody(response)

        return parseMangastream(source, body)
    }
    catch (err) {
        const host = getHost(source.url)
        return { urls: [], warning: [host, `Error fetching chapterlist for ${source.title} on ${host}: ${err?.message || 'Unknown Error.'}`, 0] }
    }
}

const mangastream: Parser = {
    fetchFunction: fetchMangastream,
    type: TYPE,
    parseLink: testMangastream,
    parseCondition: async (url) => {
        try {
            const sourcehtml: string = await fetch(url, { headers, redirect: 'manual' }).then(res => res.text())
            return sourcehtml.includes('ts-breadcrumb bixbox')
        }
        catch(e) {
            console.log('Error fetching url.', e)
            return false
        }
    }
}

registerParser(mangastream)
