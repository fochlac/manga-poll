import { readFileSync } from 'fs'
import { customAlphabet, urlAlphabet } from 'nanoid'
import { resolve } from 'path'
import { markLinksWithSourceChanged } from './link-controller'
import { createWrite } from './utils/db'

declare global {
    interface Source {
        id: string;
        title: string;
        type: string;
        url: string;
        mangaId: string;
        description?: string;
        imageUrl?: string;
    }
}

const nanoid = customAlphabet(urlAlphabet, 10)
const sourcesPath = resolve(__dirname, '../db/sources.json')
const writeSources = createWrite(sourcesPath)

let sources: Record<string, Source> = {}
try {
    sources = JSON.parse(readFileSync(sourcesPath, { encoding: 'utf-8' }))
    let hasChanges = false
    Object.keys(sources).forEach((key) => {
        if (sources[key].type === 'mangadex' && sources[key].url.includes('api.mangadex')) {
            sources[key].url = `https://mangadex.org/title/${sources[key].id}`
            hasChanges = true
        }
    })
    if (hasChanges) {
        writeSources(sources)        
    }
}
catch (e) {
    console.log(e)
}

export function getSources() {
    return sources
}

export async function addSource(title, url, mangaId, type, imageUrl = '', description = '') {
    const entry = {
        title,
        url,
        imageUrl,
        description,
        id: nanoid(),
        mangaId,
        type
    }
    sources[entry.id] = entry
    writeSources(sources)
    return entry
}

export async function updateSource(id, { title, url, mangaId, imageUrl, description }: Partial<Source>) {
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
        return entry
    }
    throw new Error(`Cannot update. Source with ${id} doesn't exist.`)
}

export function removeSource(id) {
    if (sources[id]) {
        delete sources[id]
        writeSources(sources)
        return true
    }
    throw new Error(`Cannot delete. Source with ${id} doesn't exist.`)
}
