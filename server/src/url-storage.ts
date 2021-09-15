import fs from 'fs'
import { resolve } from 'path'

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

let urls: Record<string, Url> = {}
try {
    urls = JSON.parse(fs.readFileSync(urlsPath, { encoding: 'utf-8' }))
}
catch (e) {
    console.log(e)
}

let writeUrlsTimeout = null

export function getUrlKey(url, sourceId) {
    const { chapter, host } = url

    return `${host}--${sourceId}--${chapter}`
}

export function updateUrl(source: Source, newUrl: Partial<Url>) {
    const key = getUrlKey(newUrl, source.id)
    if (urls[key] && urls[key].url !== newUrl.url || !urls[key].chapter) {
        urls[key].url = newUrl.url
        urls[key].chapter = newUrl.chapter
        urls[key].host = newUrl.host
        clearTimeout(writeUrlsTimeout)
        writeUrlsTimeout = setTimeout(() => {
            fs.writeFile(urlsPath, JSON.stringify(urls, null, 2), () => null)
        }, 100)
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
        urls[getUrlKey(entry, source.id)] = entry
        clearTimeout(writeUrlsTimeout)
        writeUrlsTimeout = setTimeout(() => {
            fs.writeFile(urlsPath, JSON.stringify(urls, null, 2), () => null)
        }, 100)
        return entry
    }
}

export function getUrls() {
    return urls
}