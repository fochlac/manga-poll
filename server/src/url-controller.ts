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
    urls = JSON.parse(fs.readFileSync(urlsPath, {encoding: 'utf-8'}))
}
catch (e) {
    console.log(e)
}

let writeUrlsTimeout = null

export function getUrlKey (url, sourceId) {
    const { chapter, host } = url

    return `${host}--${sourceId}--${chapter}`
}

export function updateUrl (source: Source, newUrl: Partial<Url>) {
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

export function addUrl (source: Source, isNew = false) {
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

export function getUrls () {
    return urls
}

export function urlController (app) {
    app.post('/api/urls/fetch', (req, res) => {
        let payload = []

        if (Array.isArray(req?.body?.sources) && req.body.sources.length > 0) {
            const sourceFilter = req.body.sources
            payload = Object.values(urls).filter((url) => sourceFilter.includes(url.sourceId))
        }
        if (!isNaN(Number(req?.body?.date)) && Number(req.body.date) > 0) {
            const limit = req?.body?.limit && !isNaN(Number(req.body.limit)) && Number(req.body.limit) || 25
            const date = Number(req.body.date)
            let old = 0
            payload = payload
                .sort((url1, url2) => url2.created - url1.created)
                .filter((url) => {
                    if (url.created >= date) {
                        return true
                    }
                    else if (old <= limit) {
                        old++
                        return true
                    }
                    return false
                })
        }

        res.status(200).json({ valid: true, payload })
    })
}
