import { customAlphabet, urlAlphabet } from 'nanoid'
import { resolve } from 'path'
import { markLinksWithSourceChanged } from './link-controller'
import { createWrite, readFile } from './utils/db'

declare global {
    interface Source {
        id: string
        title: string
        type: string
        url: string
        created: number
        mangaId: string
        description?: string
        imageUrl?: string
    }
}

const nanoid = customAlphabet(urlAlphabet, 10)
const sourcesPath = resolve(__dirname, '../db/sources.json')
const writeSources = createWrite(sourcesPath)

const sources: Record<string, Source> = readFile<Source>(sourcesPath, (sources) => {
    let modified = false
    Object.keys(sources).forEach((key) => {
        if (sources[key].url?.includes('asurascans.com')) {
            delete sources[key]
            modified = true
        }
    })
    return modified
}, writeSources)

export function getSources () {
    return sources
}

export async function addSource (title, url, mangaId, type, imageUrl = '', description = '') {
    const entry = {
        title,
        url,
        imageUrl,
        description,
        id: nanoid(),
        created: Date.now(),
        mangaId,
        type
    }
    sources[entry.id] = entry
    triggerSourceChangeCallbacks()
    writeSources(sources)
    return entry
}

export async function updateSource (id, { title, url, mangaId, imageUrl, description }: Partial<Source>) {
    const entry = sources[id]
    if (entry) {
        entry.title = title
        entry.url = url
        entry.mangaId = mangaId
        if (imageUrl) {
            entry.imageUrl = imageUrl
        }
        if (description) {
            entry.description = description
        }
        sources[id] = entry
        markLinksWithSourceChanged(id)
        writeSources(sources)
        triggerSourceChangeCallbacks()
        return entry
    }
    throw new Error(`Cannot update. Source with ${id} doesn't exist.`)
}

export function removeSource (id) {
    if (sources[id]) {
        delete sources[id]
        writeSources(sources)
        triggerSourceChangeCallbacks()
        return true
    }
    throw new Error(`Cannot delete. Source with ${id} doesn't exist.`)
}

const callbacks = []

export function registerSourceChangeCallback (cb) {
    callbacks.push(cb)
}

function triggerSourceChangeCallbacks () {
    try {
        callbacks.forEach((fn) => typeof fn === 'function' && fn())
    }
    catch (e) {
        console.error(e)
    }
}
