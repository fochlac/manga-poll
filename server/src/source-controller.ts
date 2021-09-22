import { checkSourceType, parseSourceLink } from "./parser"
import { fetchSource } from "./scheduler"
import { getHosts, getStats, updateHosts } from "./stats"
import { addSource, getSources, removeSource } from "./source-storage"
import { deleteUrlBySource } from "./url-storage"
import { deleteSourceFromLinks } from "./link-controller"

async function createSourceIfNeeded(rawSource) {
    const { title, url, mangaId, type } = rawSource
    if (!title || !url || !mangaId || !type) {
        throw new Error(`Error creating new source. Basic values are missing:\n${JSON.stringify(rawSource)}`)
    }
    if (!checkSourceType(type)) {
        throw new Error(`Error creating new source. Source type "${type}" is not supported.`)
    }
    const sources = await getSources()
    let entry = Object.values(sources).find((source) => source.url === url && String(source.mangaId) === String(mangaId))
    if (!entry) {
        try {
            entry = await addSource(title, url, mangaId, type)
            await fetchSource(entry, true)
            updateHosts()
        }
        catch (e) {
            removeSource(entry.id)
            throw new Error(`Error fetching urls for new source ${entry?.title}:\n${JSON.stringify(entry)}\n${e.message}`)
        }
    }
    return entry
}

export function sourceController(app) {
    app.post('/api/sources', async (req, res) => {
        try {
            const entry = await createSourceIfNeeded(req.body)
            
            if (entry) {
                res.status(200).json({ valid: true, payload: entry })
            }
            else {
                res.status(400).json({ valid: false })
            }
        }
        catch(err) {
            console.log(err?.message)
            res.status(400).json({ valid: false })
        }
    })

    app.post('/api/sources/addFromUrl', async (req, res) => {
        try {
            const { url } = req.body
            if (!url) {
                throw new Error('No url passed to test endpoint.')
            }

            const rawSource = await parseSourceLink(url)
            if (!rawSource) {
                throw new Error(`Error parsing raw source "${url}".`)
            }
            const entry = await createSourceIfNeeded(rawSource)

            if (entry) {
                res.status(200).json({ valid: true, payload: entry })
                updateHosts()
            }
            else {
                throw new Error(`Could not create new source for url "${url}".`)
            }
        }
        catch (e) {
            console.log(e.message)
            res.status(400).json({ valid: false })
        }
    })

    app.delete('/api/sources/:id', async (req, res) => {
        const { id } = req.params
        const { authentication } = req.headers
        if (authentication === 'Ich darf das!') {
            const sources = await getSources()
            console.log(`Deleting source with id "${id}": ${JSON.stringify(sources[id])}`)
            const success = removeSource(id)
            deleteUrlBySource(id)
            deleteSourceFromLinks(id)

            updateHosts()
            res.status(200).json({ valid: success, payload: id })
        }
        else {
            console.log(`Rejected delete request for source with id "${id}" - bad password.`)
            res.status(401).json({ valid: false })
        }
    })

    app.get('/api/sources', async (req, res) => {
        const sources = await getSources()
        res.status(200).json({ valid: true, payload: Object.values(sources) })
    })

    app.get('/api/sources/stats', async (req, res) => {
        const stats = await getStats()
        res.status(200).json({ valid: true, payload: stats })
    })

    app.get('/api/sources/hosts', async (req, res) => {
        const hosts = await getHosts()
        res.status(200).json({ valid: true, payload: hosts })
    })
}
