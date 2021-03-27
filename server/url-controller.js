import fs from 'fs'
import { customAlphabet, urlAlphabet } from 'nanoid'
import { resolve } from 'path'

const nanoid = customAlphabet(urlAlphabet, 10)

const urlsPath = resolve('./urls.json')

let urls = {}
try {
    urls = JSON.parse(fs.readFileSync(urlsPath))
}
catch (e) {
    console.log(e)
}

let writeUrlsTimeout = null

export function addUrl (source) {
    return ({ url, created }) => {
        const entry = { url, id: nanoid(), created, title: source.title, sourceId: source.id }
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
        if (typeof req?.query?.date === 'number' && req.query.date > 0) {
            const limit = req?.query?.old && !isNaN(Number(req.query.old)) && Number(req.query.old) || 25
            let old = 0
            payload = payload
                .sort((url1, url2) => url1.created - url2.created)
                .filter((url) => {
                    if (url.created >= req.query.date) {
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
