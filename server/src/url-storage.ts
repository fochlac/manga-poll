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
const sourceIdMap = {}
const createdIdMap = {}
const createdLowerLimit: Record<string, number> = {}

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
                addUrlToMaps(urls, url)
            }
        })
        return modified
    },
    writeUrls
)

function addUrlToMaps (urls: Record<string, Url>, url:Url) {
    const timeKey = String(url.created).slice(0, 4)
    if (!createdIdMap[timeKey]) {
        createdIdMap[timeKey] = {
            all: {},
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
        createdIdMap[timeKey].sources[url.sourceId] = {}
    }
    createdIdMap[timeKey].sources[url.sourceId][url.id] = true
    createdIdMap[timeKey].all[url.id] = true

    if (!sourceIdMap[url.sourceId]) {
        sourceIdMap[url.sourceId] = []
    }
    if (sourceIdMap[url.sourceId].includes(url.id)) {
        return
    }
    const firstOlderItemIndex = sourceIdMap[url.sourceId]
        .findIndex((key) => url.created === urls[key].created
            ? String(url.chapter).localeCompare(urls[key].chapter) > 0
            : url.created > urls[key].created
        )
    if (firstOlderItemIndex === -1) {
        sourceIdMap[url.sourceId].push(url.id)
    }
    else {
        sourceIdMap[url.sourceId].splice(firstOlderItemIndex, 0, url.id)
    }
}

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
        addUrlToMaps(urls, entry)
        writeUrls(urls)
        return entry
    }
}

export function getUrls () {
    return urls
}

export const getUrlKeysAfter = (date: number, sourceList?: string[]) => {
    const baseKey = Number(String(date).slice(0, 4))
    const today = Number(String(Date.now()).slice(0, 4)) + 1
    const diff = today - baseKey
    const lowestCreated = (sourceList || []).reduce(
        (lowest, sourceId) => (createdLowerLimit[sourceId] < lowest ? createdLowerLimit[sourceId] : lowest),
        9999
    )
    let urls = {}
    const addByKey = (key) => {
        let newUrls = {}
        if (!sourceList?.length) {
            newUrls = {
                ...newUrls,
                ...(createdIdMap[key]?.all || {})
            }
        }
        else {
            sourceList.forEach((sourceId) => {
                newUrls = {
                    ...newUrls,
                    ...(createdIdMap[key]?.sources?.[sourceId] || {})
                }
            })
        }
        urls = {...urls, ...newUrls}
        return newUrls
    }
    for (let x = 0; x <= diff; x++) {
        addByKey(today - x)
    }
    let previousCount = 0
    const getPrevious = () => {
        previousCount += 1
        const timeKey = baseKey - previousCount
        const additionalUrls = addByKey(timeKey)
        return {
            urls: Object.keys(urls),
            additionalUrls: Object.keys(additionalUrls),
            isLast: timeKey <= lowestCreated
        }
    }

    return {
        urls: Object.keys(urls),
        getPrevious
    }
}

export const getSortedUrlKeysForSource = (sourceId) => sourceIdMap[sourceId] || []

export function deleteUrlBySource (sourceId) {
    Object.keys(urls).forEach((key) => {
        const url = urls[key]
        if (key.includes(getUrlKey({ host: '', chapter: '' }, sourceId))) {
            const timeKey = String(url.created).slice(0, 4)
            delete createdIdMap[timeKey]?.sources?.[sourceId]
            const index = createdIdMap[timeKey].all.findIndex((urlKey) => key === urlKey)
            createdIdMap[timeKey].all.splice(index, 1)
            delete urls[key]
        }
    })
    delete sourceIdMap[sourceId]

    writeUrls(urls)
}
