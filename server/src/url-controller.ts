import fs from 'fs'
import { customAlphabet, urlAlphabet } from 'nanoid'
import { resolve } from 'path'

const nanoid = customAlphabet(urlAlphabet, 10)

const urlsPath = resolve(__dirname, '../db/urls.json')

declare global {
    interface Url {
        id: string;
        title: string;
        url: string;
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

export function addUrl (source, isNew = false) {
    return ({ url, created }) => {
        const entry = {
            url,
            id: nanoid(),
            created: !isNew ? Date.now() : created,
            title: source.title,
            sourceId: source.id
        }
        urls[url] = entry
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
    app.get('/api/urls', (req, res) => {
        let payload = Object.values(urls)

        if (typeof req?.query?.sources === 'string' && req.query.sources.length > 0) {
            const sourceFilter = req.query.sources.split(',')
            payload = payload.filter((url) => sourceFilter.includes(url.sourceId))
        }
        if (!isNaN(Number(req?.query?.date)) && Number(req.query.date) > 0) {
            const limit = req?.query?.limit && !isNaN(Number(req.query.limit)) && Number(req.query.limit) || 25
            const date = Number(req.query.date)
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
