import { resolve } from 'path'
import { createWrite, readFile } from './utils/db'
import { getUrlKey } from './utils/keys'

const urlsPath = resolve(__dirname, '../db/urls.json')

declare global {
    interface Url {
        id: string
        title: string
        url: string
        chapter: string
        host: string
        created: number
        sourceId: string
    }
}

const writeUrls = createWrite(urlsPath)
let sourceIdMap = {}
let createdIdMap = {}
let createdLowerLimit: Record<string, number> = {}

const addUrlToMaps = (url: Url) => {
    const timeKey = String(url.created).slice(0, 4)
    if (!createdIdMap[timeKey]) {
        createdIdMap[timeKey] = {
            all: [],
            sources: {}
        }
    }
    if (!createdLowerLimit[url.sourceId] || Number(timeKey) < createdLowerLimit[url.sourceId]) {
        createdLowerLimit[url.sourceId] = Number(timeKey)
    }
    if (!createdLowerLimit.all || Number(timeKey) < createdLowerLimit.all) {
        createdLowerLimit.all = Number(timeKey)
    }
    if (!createdIdMap[timeKey].sources[url.sourceId]) {
        createdIdMap[timeKey].sources[url.sourceId] = []
    }
    createdIdMap[timeKey].sources[url.sourceId].push(url.id)
    createdIdMap[timeKey].all.push(url.id)

    if (!sourceIdMap[url.sourceId]) {
        sourceIdMap[url.sourceId] = []
    }
    const firstOlderItemIndex = sourceIdMap[url.sourceId].findIndex((key) => url.created > urls[key].created)
    if (firstOlderItemIndex === -1) {
        sourceIdMap[url.sourceId].push(url.id)
    }
    else {
        sourceIdMap[url.sourceId].splice(firstOlderItemIndex, 0, url.id)
    }
}

const urls = readFile<Url>(
    urlsPath,
    (urls) => {
        let modified = false
        const uniqueMap = Object.values(urls).reduce((uniqueMap, url) => {
            const duplicateUrlId = uniqueMap[url.url]
            uniqueMap[url.url] = duplicateUrlId && urls[duplicateUrlId].created > url.created ? duplicateUrlId : url.id

            return uniqueMap
        }, {})
        Object.keys(urls).forEach((urlKey) => {
            const url = urls[urlKey]
            if (
                uniqueMap[url.url] !== urlKey ||
                urlKey.endsWith('.') ||
                urlKey.endsWith('-') ||
                urlKey.endsWith('_') ||
                String(url?.chapter).startsWith('.') ||
                String(url?.chapter).startsWith('-') ||
                String(url?.chapter).startsWith('_')
            ) {
                delete urls[urlKey]
                modified = true
            }
            else if (!/^[\d.-]+(\s\(Vol.\s\d+\))?$/.test(String(url?.chapter))) {
                delete urls[urlKey]
                modified = true
            }
            else if (!url) {
                delete urls[urlKey]
                modified = true
            }
            else if (url.url.includes('asurascans.com')) {
                delete urls[urlKey]
                modified = true
            }
            else {
                const url = urls[urlKey]
                addUrlToMaps(url)
            }
        })
        return modified
    },
    writeUrls
)

export function updateUrl (source: Source, newUrl: Partial<Url>) {
    const key = getUrlKey(newUrl, source.id)
    const stored = urls[key]
    stored.url = newUrl.url
    stored.chapter = newUrl.chapter
    stored.host = newUrl.host
    writeUrls(urls)
    return urls[key]
}

export function addUrl (source: Source, isNew = false) {
    return (newEntry: Url) => {
        const entry = {
            url: newEntry.url,
            id: getUrlKey(newEntry, source.id),
            created: !isNew ? Date.now() : newEntry.created,
            chapter: String(newEntry.chapter),
            host: newEntry.host,
            title: source.title,
            sourceId: source.id
        }
        urls[entry.id] = entry
        addUrlToMaps(entry)
        writeUrls(urls)
        return entry
    }
}

export function getUrls () {
    return urls
}

export const getUrlKeysAfter = (date: number, sourceList?: string[]) => {
    const baseKey = Number(String(date).slice(0, 4))
    const today = Number(String(Date.now()).slice(0, 4))
    const diff = today - baseKey
    const lowestCreated = sourceList.reduce(
        (lowest, sourceId) => (createdLowerLimit[sourceId] < lowest ? createdLowerLimit[sourceId] : lowest),
        9999
    )
    let urls = []
    const addByKey = (key) => {
        if (!sourceList?.length) {
            urls = urls.concat(createdIdMap[key]?.all || [])
        }
        else {
            sourceList.forEach((sourceId) => {
                urls = urls.concat(createdIdMap[key]?.sources?.[sourceId] || [])
            })
        }
    }
    for (let x = 0; x <= diff; x++) {
        addByKey(today - x)
    }
    let previousCount = 0
    const getPrevious = () => {
        previousCount += 1
        const oldLength = urls.length
        const timeKey = baseKey - previousCount
        addByKey(timeKey)
        return {
            urls,
            additionalUrls: urls.slice(oldLength),
            isLast: timeKey <= lowestCreated
        }
    }

    return {
        urls,
        getPrevious
    }
}

export const getSortedUrlKeysForSource = (sourceId) => sourceIdMap[sourceId] || []

export function deleteUrlBySource (sourceId) {
    const newSourceIdMap = {}
    const newCreatedIdMap = {}
    const newCreatedLowerLimit: Record<string, number> = {}
    Object.keys(urls).forEach((key) => {
        const url = urls[key]
        if (key.includes(getUrlKey({ host: '', chapter: '' }, sourceId))) {
            delete urls[key]
        }
        const timeKey = String(url.created).slice(0, 4)
        if (!newCreatedIdMap[timeKey]) {
            newCreatedIdMap[timeKey] = {
                all: [],
                sources: {}
            }
        }
        if (!newCreatedLowerLimit[url.sourceId] || Number(timeKey) < newCreatedLowerLimit[url.sourceId]) {
            newCreatedLowerLimit[url.sourceId] = Number(timeKey)
        }
        if (!newCreatedLowerLimit.all || Number(timeKey) < newCreatedLowerLimit.all) {
            newCreatedLowerLimit.all = Number(timeKey)
        }
        if (!newCreatedIdMap[timeKey].sources[url.sourceId]) {
            newCreatedIdMap[timeKey].sources[url.sourceId] = []
        }
        newCreatedIdMap[timeKey].sources[url.sourceId].push(url.id)
        newCreatedIdMap[timeKey].all.push(url.id)

        if (!newSourceIdMap[url.sourceId]) {
            newSourceIdMap[url.sourceId] = []
        }
        const firstOlderItemIndex = newSourceIdMap[url.sourceId].findIndex((key) => url.created > urls[key].created)
        if (firstOlderItemIndex === -1) {
            newSourceIdMap[url.sourceId].push(url.id)
        }
        else {
            newSourceIdMap[url.sourceId].splice(firstOlderItemIndex, 0, url.id)
        }
    })
    sourceIdMap = newSourceIdMap
    createdIdMap = newCreatedIdMap
    createdLowerLimit = newCreatedLowerLimit

    writeUrls(urls)
}
