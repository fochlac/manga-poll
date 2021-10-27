import { url } from 'inspector'
import { resolve } from 'path'
import { createWrite, readFile } from './utils/db'
import { getUrlKey } from './utils/keys'

const urlsPath = resolve(__dirname, '../db/urls.json')

declare global {
    interface Url {
        id: string;
        title: string;
        url: string;
        chapter: string;
        host: string;
        created: number;
        sourceId: string;
    }
}

const writeUrls = createWrite(urlsPath)

const urls = readFile<Url>(urlsPath, (urls) => {
    let modified = false
    Object.keys(urls).forEach((urlKey) => {
        if (urlKey.endsWith('.') || urlKey.endsWith('-') || urlKey.endsWith('_')) {
            delete urls[urlKey]
            modified = true
        }
        if (!/^[\d\.-]+(\s\(Vol.\s\d+\))?$/.test(String(urls[urlKey]?.chapter))) {
            delete urls[urlKey]
            modified = true
        }
    })
    return modified
}, writeUrls)

export function updateUrl(source: Source, newUrl: Partial<Url>) {
    const key = getUrlKey(newUrl, source.id)
    const stored = urls[key]
    if (stored && (stored.url !== newUrl.url || !stored.chapter)) {
        console.log(source.title, ':', newUrl.url, stored.url, '--', newUrl.chapter, stored.chapter)
        stored.url = newUrl.url
        stored.chapter = newUrl.chapter
        stored.host = newUrl.host
        writeUrls(urls)
    }
    return urls[key]
}

export function addUrl(source: Source, isNew = false) {
    return (newEntry: Url) => {
        const entry = {
            url: newEntry.url,
            id: getUrlKey(newEntry, source.id),
            created: !isNew ? Date.now() : newEntry.created,
            chapter: newEntry.chapter,
            host: newEntry.host,
            title: source.title,
            sourceId: source.id
        }
        urls[entry.id] = entry
        writeUrls(urls)
        return entry
    }
}

export function getUrls() {
    return urls
}

export function deleteUrlBySource(sourceId) {
    Object.keys(urls).forEach((key) => {
        if (key.includes(getUrlKey({host: '', chapter: ''}, sourceId))) {
            delete urls[key]
        }
    })
    writeUrls(urls)
}