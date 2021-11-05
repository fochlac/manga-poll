import { resolve } from 'path'
import { createWrite, readFile } from './utils/db'
import { getUrlKey } from './utils/keys'

const urlsPath = resolve(__dirname, '../db/urls.json')

declare global {
    interface Url {
        id: string
        title: string
        url: string
        chapter: string
        host: string
        created: number
        sourceId: string
    }
}

const writeUrls = createWrite(urlsPath)

const urls = readFile<Url>(
    urlsPath,
    (urls) => {
        let modified = false
        const uniqueMap = Object.values(urls).reduce((uniqueMap, url) => {
            const duplicateUrlId = uniqueMap[url.url]
            uniqueMap[url.url] = duplicateUrlId && urls[duplicateUrlId].created > url.created ? duplicateUrlId : url.id

            return uniqueMap
        }, {})
        Object.keys(urls).forEach((urlKey) => {
            const url = urls[urlKey]
            if (
                uniqueMap[url.url] !== urlKey ||
                urlKey.endsWith('.') ||
                urlKey.endsWith('-') ||
                urlKey.endsWith('_') ||
                String(url?.chapter).startsWith('.') ||
                String(url?.chapter).startsWith('-') ||
                String(url?.chapter).startsWith('_')
            ) {
                delete urls[urlKey]
                modified = true
            }
            else if (!/^[\d.-]+(\s\(Vol.\s\d+\))?$/.test(String(url?.chapter))) {
                delete urls[urlKey]
                modified = true
            }
            else if (url?.created > 1635375451023 && url.created < 1635375741424) {
                delete urls[urlKey]
                modified = true
            }
            else if (!url) {
                delete urls[urlKey]
                modified = true
            }
        })
        return modified
    },
    writeUrls
)

export function updateUrl (source: Source, newUrl: Partial<Url>) {
    const key = getUrlKey(newUrl, source.id)
    const stored = urls[key]
    stored.url = newUrl.url
    stored.chapter = newUrl.chapter
    stored.host = newUrl.host
    stored.created = newUrl.created
    writeUrls(urls)
    return urls[key]
}

export function addUrl (source: Source, isNew = false) {
    return (newEntry: Url) => {
        const entry = {
            url: newEntry.url,
            id: getUrlKey(newEntry, source.id),
            created: !isNew ? Date.now() : newEntry.created,
            chapter: String(newEntry.chapter),
            host: newEntry.host,
            title: source.title,
            sourceId: source.id
        }
        urls[entry.id] = entry
        writeUrls(urls)
        return entry
    }
}

export function getUrls () {
    return urls
}

export function deleteUrlBySource (sourceId) {
    Object.keys(urls).forEach((key) => {
        if (key.includes(getUrlKey({ host: '', chapter: '' }, sourceId))) {
            delete urls[key]
        }
    })
    writeUrls(urls)
}
