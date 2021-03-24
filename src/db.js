import { parse } from './utils'

const NAMESPACES = {
    SYNC: 'sync',
    LOCAL: 'local',
}

function read (namespace, keys) {
    return new Promise(resolve => chrome.storage[namespace].get(keys, resolve))
}

function write (namespace, keyPairs) {
    return new Promise(resolve => chrome.storage[namespace].set(keyPairs, resolve))
}

export async function readSources () {
    const registry = await read(NAMESPACES.SYNC, {'sources': '["sources-1"]'})
    return parse(registry, ['sources-1']).reduce((sources, key) => {
        return Promise.all([sources, read(NAMESPACES.SYNC, {[key]: '[]'})])
            .then(([sources, source]) => sources.concat(parse(source[key], [])))
    }, Promise.resolve([]))
}

export function writeSources (sources) {
    const registry = []
    const updates = {}
    for (let x = 1; x <= Math.max(1, Math.ceil(sources.length / 20)); x++) {
        const key = `sources-${x}`
        registry.push(key)
        updates[key] = JSON.stringify(sources.slice((x-1) * 20, x * 20))
    }
    updates.registry = JSON.stringify(registry)
    return write(NAMESPACES.SYNC, updates)
}

export async function addSource (source) {
    const sources = await readSources()
    sources.push(source)
    await writeSources(sources)
    return sources
}

export async function deleteSource (sourceId) {
    const sources = await readSources()
    const newSources = sources.filter((source) => source?.id !== sourceId)
    await writeSources(newSources)

    return newSources
}



export async function isDirty () {
    const { urls, sources } = await read(NAMESPACES.LOCAL, ['urls', 'sources'])

    return !!urls || !!sources
}
    
export async function getFilteredSortedUrls () {
    const { hiddenChapters: hiddenChaptersString, hide } = await read(NAMESPACES.SYNC, {hiddenChapters: '{}', hide: Date.now()})
    const { urls } = await read(NAMESPACES.LOCAL, {urls: '[]'})

    const hiddenChapters = parse(hiddenChaptersString, {})
    const urlList = parse(urls, [])

    const checkOld = (chapter) => {
        if (hide && chapter.created < hide || hiddenChapters[chapter.id]) {
            return true;
        }
        return false;
    }

    const [oldUrls, newUrls] = Object.values(urlList)
        .sort((url1, url2) => {
            const diff = url2.created - url1.created;
            if (Math.abs(diff) < 500) {
                return String(url1).localeCompare(url2);
            }
            return diff;
        })
        .reduce(([oldUrls, newUrls], url) => {
            if (checkOld(url)) {
                oldUrls.push(url)
            }
            else {
                newUrls.push(url)
            }
            return [oldUrls, newUrls]
        }, [[], []])

    return {
        oldUrls,
        newUrls
    }
}

export async function addHiddenChapter(id) {
    const hiddenChapters = parse(await read(NAMESPACES.SYNC, {hiddenChapters: '{}'}), {})
    hiddenChapters[id] = true
    return write(NAMESPACES.SYNC, {hiddenChapters: JSON.stringify(hiddenChapters)})
}

export function writeUrls (urls) {
    return write(NAMESPACES.LOCAL, {urls: JSON.stringify(urls)})
}

