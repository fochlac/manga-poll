import fetch from 'node-fetch'
import { categorizeRemoteUrls, headers, registerParser } from '../parser'
import { getHost } from '../utils/parse'

const TYPE = 'mangadex'

const pageSize = 100

async function fetchMangadex (source: Source, urls: Record<string, Url>): Promise<ChapterResult> {
    const host = getHost(source.url)
    try {
        const result = await fetch(`https://api.mangadex.org/manga/${source.mangaId}/feed?limit=${pageSize}`, {
            method: 'get',
            headers: headers
        }).then((res) => res.json())

        let list = result.data

        if (!list?.length) {
            return {
                urls: [],
                warnings: [
                    [host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0]
                ]
            }
        }

        if (result.total > pageSize) {
            for (let offset = pageSize; offset <= result.total; offset += pageSize) {
                const offsetResult = await fetch(
                    `https://api.mangadex.org/manga/${source.mangaId}/feed?limit=${pageSize}&offset=${offset}`,
                    { method: 'get', headers: headers }
                ).then((res) => res.json())
                list = list.concat(offsetResult.data)
            }
        }

        let sourceInfo
        if (!source.imageUrl || !source.description) {
            const mangaInfo = await fetch(`https://api.mangadex.org/manga/${source.mangaId}`, {
                method: 'get',
                headers: headers
            }).then((res) => res.json())
            const coverId = mangaInfo.data?.relationships?.find((rel) => rel.type === 'cover_art')?.id
            const coverInfo =
                coverId &&
                (await fetch(`https://api.mangadex.org/cover/${coverId}`, {
                    method: 'get',
                    headers: headers
                }).then((res) => res.json()))
            const coverFileName = coverInfo?.data?.attributes?.fileName
            const imageUrl = coverFileName && `https://uploads.mangadex.org/covers/${source.mangaId}/${coverFileName}.256.jpg`
            const description = mangaInfo?.data?.attributes?.description?.en

            if (imageUrl?.length && description?.length && (!source.imageUrl || !source.description)) {
                sourceInfo = {
                    imageUrl,
                    description
                }
            }
        }

        const chapterIncluded = {}
        const urlList = list
            .slice()
            .reverse()
            .filter((chapter) => chapter?.type === 'chapter' && chapter.attributes?.translatedLanguage === 'en')
            .map((chapter) => {
                return {
                    url: `https://mangadex.org/chapter/${chapter.id}/1`,
                    chapter: chapter.attributes.chapter,
                    host,
                    created: new Date(chapter.attributes.publishAt).getTime()
                }
            })
            .filter((chapter) => {
                if (!chapterIncluded[chapter.chapter]) {
                    chapterIncluded[chapter.chapter] = true
                    return true
                }
                return false
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

const fanfox: Parser = {
    fetchFunction: fetchMangadex,
    type: TYPE
}

registerParser(fanfox)
