import fs from 'fs'
import { customAlphabet, urlAlphabet } from 'nanoid'
import { resolve } from 'path'

import { deleteSource } from '../src/db'
import { fetchSource } from './scheduler'

const nanoid = customAlphabet(urlAlphabet, 10)
const sourcesPath = resolve('./sources.json')

let sources = {}
try {
    sources = JSON.parse(fs.readFileSync(sourcesPath))
}
catch (e) {
    console.log(e)
}

export function getSources () {
    return sources
}

async function addSource (title, url, mangaId) {
    const entry = {
        title, url, id: nanoid(), mangaId
    }
    sources[entry.id] = entry
    fs.writeFile(sourcesPath, JSON.stringify(sources, null, 2), () => null)
    return entry
}

function removeSource (id) {
    if (sources[id]) {
        delete sources[id]
        fs.writeFile(sourcesPath, JSON.stringify(sources, null, 2), () => null)
        return true
    }
    return false
}

export function sourceController (app) {
    app.post('/api/sources', async (req, res) => {
        const { title, url, mangaId } = req.body
        if (!title || !url || !mangaId) {
            return res.status(400).send({ valid: false })
        }
        try {
            let entry = Object.values(sources).find((source) => source.url === url && String(source.mangaId) === String(mangaId))
            if (!entry) {
                entry = await addSource(title, url, mangaId)
                try {
                    await fetchSource(entry, true)
                }
                catch (e) {
                    deleteSource(entry.id)
                    console.log(`Error fetching urls for new source ${entry?.title}:\n`, JSON.stringify(entry), e)
                    return res.status(400).json({ valid: false, payload: e })
                }
            }
            return res.status(200).json({ valid: true, payload: entry })
        }
        catch (e) {
            console.log(e)
        }
        res.status(400).json({ valid: false })
    })

    app.delete('/api/sources/:id', (req, res) => {
        const { id } = req.params
        const success = removeSource(id)
        res.status(200).json({ valid: success, payload: id })
    })

    app.get('/api/sources', (req, res) => {
        res.status(200).json({ valid: true, payload: Object.values(sources) })
    })
}
