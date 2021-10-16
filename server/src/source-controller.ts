import { checkSourceType, createSource, parseSourceLink } from "./parser"
import { fetchSource } from "./scheduler"
import { getHosts, updateHosts } from "./stats"
import { addSource, getSources, removeSource, updateSource } from "./source-storage"
import { deleteUrlBySource } from "./url-storage"
import { deleteSourceFromLinks, markLinksWithSourceChanged } from "./link-controller"
import { adminUrl } from "./utils/authentication"

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
            console.log('Unexpected Error while creating source:', err?.message, req?.body)
            res.status(500).json({ valid: false })
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

    app.put('/api/sources/:id', adminUrl, async (req, res) => {
        const { id } = req.params
        try {
            const sources = await getSources()
            if (sources[id]) {
                console.log(`Deleting source with id "${id}": ${JSON.stringify(sources[id])}`)
                try {
                    const { title, type, url, mangaId } = req?.body || {}
                    const rawSource = createSource(type, mangaId, title, url)
                    const changedSource = updateSource(id, rawSource)
                    markLinksWithSourceChanged(id)

                    res.status(200).json({ valid: true, payload: changedSource })
                }
                catch(e) {
                    res.status(500).json({ valid: false, payload: 'Internal Server Error'})
                }

            }
            else {
                res.status(400).send({ valid: false, payload: 'Bad Request' })
            }
        }
        catch(e) {
            res.status(500).send({ valid: false, payload: 'Internal Server Error' })
            console.log('Unexpected Error while updating source:', e)
        }
    })

    app.delete('/api/sources/:id', adminUrl, async (req, res) => {
        const { id } = req.params
        try {
            const sources = await getSources()
            if (sources[id]) {
                console.log(`Deleting source with id "${id}": ${JSON.stringify(sources[id])}`)
                const success = removeSource(id)
                deleteUrlBySource(id)
                deleteSourceFromLinks(id)
    
                updateHosts()
                res.status(200).json({ valid: success, payload: id })
            }
            else {
                console.log(`Cannot delete source with id "${id}": Doesn't exist.`)
                res.status(400).send({ valid: false, payload: 'Bad Request' })
            }
        }
        catch(e) {
            res.status(500).send({ valid: false, payload: 'Internal Server Error' })
            console.log('Unexpected Error while deleting source:', e)
        }
    })

    app.get('/api/sources', async (req, res) => {
        const sources = await getSources()
        res.status(200).json({ valid: true, payload: Object.values(sources) })
    })

    app.get('/api/sources/hosts', async (req, res) => {
        const hosts = await getHosts()
        res.status(200).json({ valid: true, payload: hosts })
    })
}
