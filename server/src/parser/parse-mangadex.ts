import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { registerParser } from '../parser'
import { getUrlKey, getUrls, updateUrl } from '../url-controller'

const TYPE = 'mangadex'
const warned: Record<string, number> = {}

async function fetchMangadex (source: Source) {
    const result = await fetch(`${source.url}/feed?limit=500`, { method: 'get' }).then((res) => res.json())
    let list = result.results

    if (result.total > 500) {
        for (let offset = 500; offset <= result.total; offset += 500) {
            const offsetResult = await fetch(`${source.url}?limit=500&offset=${offset}`, { method: 'get' })
                .then((res) => res.json())
            list = list.concat(offsetResult.results)
        }
    }
    const urlList = list
        .filter((chapter) => chapter?.data?.type === 'chapter' && chapter.data.attributes?.translatedLanguage === 'en')
        .map((chapter) => {
            return {
                url: `https://mangadex.org/chapter/${chapter.data.id}/1`,
                chapter: chapter.data.attributes.chapter,
                host: 'mangadex.org',
                created: new Date(chapter.data.attributes.publishAt).getTime()
            }
        })

    return urlList.filter((url) => {
        const isValid = url.chapter && url.url.split('/')?.[4]?.length && !isNaN(Number(url.created))
        const key = getUrlKey(url, source.id)
        const stored = getUrls()[key]

        if (!isValid && (warned[key] || 0) < 3) {
            console.log(`Invalid url found for ${source.title}: ${JSON.stringify(url)}`)
            warned[key] = typeof warned[key] === 'number' ? warned[key] + 1 : 0
        }
        if (isValid && stored) {
            updateUrl(source, url)
        }

        return isValid && !stored
    })
}


async function parseMangadexPage (rawUrl: string) {
    if (/title\/[\d-\w]*\/[\d-\w]*/.test(rawUrl)) {
        const id = rawUrl.split('/title/')?.[1]?.split('/')[0]
        if (!id) {
            console.log('Could not extract id from manga link.')
            return null
        }
        const mangaInfo = await fetch(`https://api.mangadex.org/manga/${id}`).then(r => r.json())

        if (mangaInfo?.data?.type !== 'manga') {
            console.log('Invalid id extracted from manga link.')
            return null
        }

        return {
            type: TYPE,
            mangaId: id,
            title: mangaInfo.data.attributes?.title?.en,
            url: `https://api.mangadex.org/manga/${id}`
        }
    }
    else if (/chapter\/[\d-\w]*(\/\d*)?/.test(rawUrl)) {
        const id = rawUrl.split('/chapter/')?.[1]?.split('/')[0]
        if (!id) {
            console.log('Could not extract id from chapter link.')
            return null
        }
        const chapterInfo = await fetch(`https://api.mangadex.org/chapter/${id}?includes[]=manga`).then(r => r.json())

        if (chapterInfo?.data?.type !== 'chapter') {
            console.log('Invalid id extracted from chapter link.')
            return null
        }

        const mangaInfo = chapterInfo.relationships?.find((rel) => rel?.type === 'manga')

        if (!mangaInfo) {
            console.log('Could not find manga for the chapter link.')
            return null
        }

        const title = Object.values(mangaInfo.attributes?.title || {})[0] as string

        return {
            type: TYPE,
            mangaId: mangaInfo.id,
            title,
            url: `https://api.mangadex.org/manga/${mangaInfo.id}`
        }
    }
    else {
        console.log('Mangadex url of no chapter or manga posted.')
    }
}

const fanfox: Parser = {
    fetchFunction: fetchMangadex,
    type: TYPE,
    parseLink: parseMangadexPage,
    parseCondition: (url) => url.includes('mangadex.org')
}

registerParser(fanfox)
