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

const urls = readFile<Url>(urlsPath)

export function updateUrl(source: Source, newUrl: Partial<Url>) {
    const key = getUrlKey(newUrl, source.id)
    if (urls[key] && urls[key].url !== newUrl.url || !urls[key].chapter) {
        urls[key].url = newUrl.url
        urls[key].chapter = newUrl.chapter
        urls[key].host = newUrl.host
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