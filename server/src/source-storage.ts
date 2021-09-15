import fs from 'fs'
import { customAlphabet, urlAlphabet } from 'nanoid'
import { resolve } from 'path'

declare global {
    interface Source {
        id: string;
        title: string;
        type: string;
        url: string;
        mangaId: string;
    }
}

const nanoid = customAlphabet(urlAlphabet, 10)
const sourcesPath = resolve(__dirname, '../db/sources.json')

let sources: Record<string, Source> = {}
try {
    sources = JSON.parse(fs.readFileSync(sourcesPath, { encoding: 'utf-8' }))
}
catch (e) {
    console.log(e)
}

export function getSources() {
    return sources
}

export async function addSource(title, url, mangaId, type) {
    const entry = {
        title,
        url,
        id: nanoid(),
        mangaId,
        type
    }
    sources[entry.id] = entry
    fs.writeFile(sourcesPath, JSON.stringify(sources, null, 2), () => null)
    return entry
}

export function removeSource(id) {
    if (sources[id]) {
        delete sources[id]
        fs.writeFile(sourcesPath, JSON.stringify(sources, null, 2), () => null)
        return true
    }
    return false
}
