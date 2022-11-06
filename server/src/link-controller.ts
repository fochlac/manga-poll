import fs from 'fs'
import { customAlphabet } from 'nanoid'
import { resolve } from 'path'
import { checkForDuplicate } from './duplicates'
import { getSources } from './source-storage'

const idGen = customAlphabet('0123456789', 10)
const pwGen = customAlphabet('0123456789', 5)

const linksPath = resolve(__dirname, '../db/links.json')

declare global {
    interface Link {
        id: string
        pw: string
        hiddenChapters: Record<string, boolean>
        hide: number
        sources: unknown[]
        lastModified: number
    }
}

let links: Record<string, Link> = {}
try {
    links = JSON.parse(fs.readFileSync(linksPath, { encoding: 'utf-8' }))
}
catch (e) {
    console.log(e)
}

let writeLinksTimeout = null
function write () {
    clearTimeout(writeLinksTimeout)
    writeLinksTimeout = setTimeout(() => {
        fs.writeFile(linksPath, JSON.stringify(links, null, 2), () => null)
    }, 100)
}

function toKey (id, pw) {
    if (!/^\d{10}$/.test(id) || !/^\d{5}$/.test(pw)) {
        throw new Error('Invalid id or pw.')
    }
    return `${pw.slice(0, 2)}${id.slice(0, 5)}${pw[2]}${id.slice(5)}${pw.slice(3)}`
}
function fromKey (key) {
    if (!/^\d{15}$/.test(key)) {
        throw new Error('Invalid key.')
    }
    return {
        id: `${key.slice(2, 7)}${key.slice(8, 13)}`,
        pw: `${key.slice(0, 2)}${key[7]}${key.slice(13)}`
    }
}

function createPayload (link: Link) {
    const { hiddenChapters, hide, sources, lastModified, id, pw } = link
    const sourceMap = getSources()

    return {
        key: toKey(id, pw),
        hiddenChapters,
        hide,
        sources: sources
            .map(
                (linksrc) =>
                    (typeof linksrc === 'string' && sourceMap[checkForDuplicate(linksrc)]) ||
                    (Object.prototype.hasOwnProperty.call(linksrc, 'id') && sourceMap[(linksrc as Source).id])
            )
            .filter((source) => !!source),
        lastModified
    }
}

const bfp = {}
function checkKey (key) {
    const { id, pw } = fromKey(key)

    if (bfp[id] && bfp[id].count >= 3 && Date.now() - bfp[id].lastHit <= 10000) {
        bfp[id].lastHit = Date.now()
        throw new Error('Too many tries for this id.')
    }
    else if (bfp[id] && bfp[id].count > 0 && Date.now() - bfp[id].lastHit <= 10000) {
        bfp[id].count = 0
    }

    if (!links[id] || links[id].pw !== pw) {
        bfp[id] = bfp[id] || { count: 0 }
        bfp[id].lastHit = Date.now()
        bfp[id].count++
        throw new Error('Bad id or pw.')
    }

    return id
}

const invalidQueue = Promise.resolve()
function handleKeyError (res) {
    const hasTimedOut = false
    const timeout = setTimeout(() => res.status(429).send({ valid: false }), 100000)
    invalidQueue
        .catch(() => null)
        .then(
            () =>
                new Promise((resolve) =>
                    setTimeout(() => {
                        if (!hasTimedOut) {
                            clearTimeout(timeout)
                            res.status(400).send({ valid: false })
                            resolve(null)
                        }
                    }, 5000)
                )
        )
}

export function deleteSourceFromLinks (sourceId) {
    Object.keys(links).forEach((key) => {
        if (links[key].sources?.includes(sourceId)) {
            links[key].sources = links[key].sources.filter((sourceKey) => sourceKey && sourceKey !== sourceId)
            links[key].lastModified = Date.now()
        }
    })
    write()
}

export function markLinksWithSourceChanged (sourceId) {
    Object.keys(links).forEach((key) => {
        if (links[key].sources?.includes(sourceId)) {
            links[key].lastModified = Date.now()
        }
    })
    write()
}

export function linksController (app) {
    app.post('/api/links', (req, res) => {
        const { hiddenChapters, hide, sources } = req.body

        const pw = pwGen()
        let id = idGen()
        if (links[id]) {
            let count = 0
            while (links[id] && count < 1000) {
                id = idGen()
                count++
            }
            if (links[id]) {
                res.status(500).send({ valid: false })
                throw new Error('Cannot generate free id...')
            }
        }

        links[id] = {
            hiddenChapters,
            hide,
            sources,
            id,
            pw,
            lastModified: Date.now()
        }
        write()

        res.status(200).json({
            valid: true,
            payload: createPayload(links[id])
        })
    })

    const updateFields = ['hiddenChapters', 'hide', 'sources']
    app.put('/api/links/:key', (req, res) => {
        try {
            const id = checkKey(req.params.key)

            let changes = 0
            updateFields.forEach((key) => {
                if (req.body[key]) {
                    changes++
                    links[id][key] = req.body[key]
                }
            })

            if (changes > 0) {
                links[id].lastModified = Date.now()
                write()
            }

            res.status(200).json({
                valid: true,
                payload: createPayload(links[id])
            })
        }
        catch (e) {
            handleKeyError(res)
        }
    })

    app.get('/api/links/:key', (req, res) => {
        try {
            const id = checkKey(req.params.key)
            const changedSince = req.query.changedSince
            if (changedSince && Number(changedSince) >= links[id].lastModified) {
                res.status(304).send({ valid: true, payload: null })
            }
            else {
                res.status(200).json({
                    valid: true,
                    payload: createPayload(links[id])
                })
            }
        }
        catch (e) {
            handleKeyError(res)
        }
    })
}
