import { checkSourceType, createSource } from './parser'
import { fetchSource } from './scheduler'
import { getHosts, updateHosts } from './stats'
import { addSource, getSources, removeSource, updateSource } from './source-storage'
import { deleteUrlBySource } from './url-storage'
import { deleteSourceFromLinks, markLinksWithSourceChanged } from './link-controller'
import { adminUrl } from './utils/authentication'
import { checkForDuplicate } from './duplicates'
import { normalizeAsuraMangaId, normalizeAsuraUrl } from './utils/parse'

function normalizeIncomingSource<T extends Partial<Source>>(rawSource: T): T {
    if (rawSource?.type !== 'asura') {
        return rawSource
    }

    return {
        ...rawSource,
        url: normalizeAsuraUrl(rawSource.url),
        mangaId: normalizeAsuraMangaId(rawSource.mangaId)
    }
}

async function createSourceIfNeeded (rawSource) {
    const normalizedSource = normalizeIncomingSource(rawSource)
    const { title, url, mangaId, type } = normalizedSource
    if (!title || !url || !mangaId || !type) {
        throw new Error(`Error creating new source. Basic values are missing:\n${JSON.stringify(normalizedSource)}`)
    }
    if (!checkSourceType(type)) {
        throw new Error(`Error creating new source. Source type "${type}" is not supported.`)
    }
    const sources = await getSources()
    let entry = Object.values(sources).find(
        (source) => source.url === url && String(source.mangaId) === String(mangaId)
    )
    if (!entry) {
        try {
            entry = await addSource(title, url, mangaId, type)
            await fetchSource(entry, true)
            updateHosts()
        }
        catch (e) {
            removeSource(entry.id)
            throw new Error(
                `Error fetching urls for new source ${entry?.title}:\n${JSON.stringify(entry)}\n${e.message}`
            )
        }
    }
    return entry
}

export function sourceController (app) {
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
        catch (err) {
            console.log('Unexpected Error while creating source:', err?.message, req?.body)
            res.status(500).json({ valid: false })
        }
    })

    app.post('/api/sources/:id/upload', async (req, res) => {
        try {
            const entry = await createSourceIfNeeded(req.body)

            if (entry) {
                res.status(200).json({ valid: true, payload: entry })
            }
            else {
                res.status(400).json({ valid: false })
            }
        }
        catch (err) {
            console.log('Unexpected Error while creating source:', err?.message, req?.body)
            res.status(500).json({ valid: false })
        }
    })

    app.post('/api/sources/bulkMatch', async (req, res) => {
        try {
            if (Array.isArray(req.body?.sources)) {
                const sources = await getSources()
                const responseBody = []
                const sourceList = req.body.sources as Source[]
                let hasChanges = false
                for (const source of sourceList) {
                    const normalizedSource = normalizeIncomingSource(source)
                    if (sources[checkForDuplicate(normalizedSource.id)]) {
                        responseBody.push(sources[checkForDuplicate(normalizedSource.id)])
                        if (!hasChanges) {
                            hasChanges = normalizedSource.id !== checkForDuplicate(normalizedSource.id)
                        }
                        continue
                    }
                    hasChanges = true
                    const { url, mangaId } = normalizedSource
                    if (!url || !mangaId) {
                        console.log('Error matching source, url or mangaid are missing')
                        continue
                    }

                    const entry = Object.values(sources).find(
                        (source) => source.url === url && String(source.mangaId) === String(mangaId)
                    )
                    if (entry) {
                        responseBody.push(entry)
                    }
                    else {
                        console.log(`Error matching source entry:\n${JSON.stringify(normalizedSource)}`)
                    }
                }

                res.status(200).json({ valid: true, payload: { sources: responseBody, hasChanges } })
            }
            else {
                res.status(400).json({ valid: false })
            }
        }
        catch (err) {
            console.log('Unexpected Error while creating source:', err?.message, req?.body)
            res.status(500).json({ valid: false })
        }
    })

    app.put('/api/sources/:id', adminUrl, async (req, res) => {
        const { id } = req.params
        try {
            const sources = await getSources()
            if (sources[id]) {
                console.log(`Editing source with id "${id}": ${JSON.stringify(sources[id])}`)
                try {
                    const { title, url } = req?.body || {}
                    const rawSource = createSource(sources[id].type, sources[id].mangaId, title, url)
                    const changedSource = await updateSource(id, rawSource)
                    await fetchSource(changedSource, true)
                    markLinksWithSourceChanged(id)

                    res.status(200).json({ valid: true, payload: changedSource })
                }
                catch (e) {
                    console.log('Unexpected Error while updating source:', e)
                    res.status(500).json({ valid: false, payload: 'Internal Server Error' })
                }
            }
            else {
                res.status(400).send({ valid: false, payload: 'Bad Request' })
            }
        }
        catch (e) {
            console.log('Unexpected Error while updating source:', e)
            res.status(500).send({ valid: false, payload: 'Internal Server Error' })
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
        catch (e) {
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
