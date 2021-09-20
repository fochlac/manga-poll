import fetch from 'node-fetch'
import { createSource, createUrlFilter, registerParser } from '../parser'
import { logWarning } from '../stats'
import { getUrlKey, getUrls, updateUrl } from '../url-storage'

const TYPE = 'mangadex'

const pageSize = 100

async function fetchMangadex(source: Source) {
    const host = source.url.split('/')[2].split('.').slice(-2).join('.')
    try {
        const result = await fetch(`${source.url}/feed?limit=${pageSize}`, { method: 'get' }).then((res) => res.json())

        let list = result.data

        if (!list?.length) {
            logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0)
            return []
        }

        if (result.total > pageSize) {
            for (let offset = pageSize; offset <= result.total; offset += pageSize) {
                const offsetResult = await fetch(`${source.url}?limit=${pageSize}&offset=${offset}`, { method: 'get' })
                    .then((res) => res.json())
                list = list.concat(offsetResult.data)
            }
        }

        const urlList = list
            .filter((chapter) => chapter?.type === 'chapter' && chapter.attributes?.translatedLanguage === 'en')
            .map((chapter) => {
                return {
                    url: `https://mangadex.org/chapter/${chapter.id}/1`,
                    chapter: chapter.attributes.chapter,
                    host,
                    created: new Date(chapter.attributes.publishAt).getTime()
                }
            })

        return urlList.filter(createUrlFilter(source))
    }
    catch (err) {
        logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${err?.message || 'Unknown Error.'}`, 0)
        return []
    }
}


async function parseMangadexPage(rawUrl: string) {
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

        return createSource(TYPE, id, mangaInfo.data.attributes?.title?.en, `https://api.mangadex.org/manga/${id}`)
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
