import fs from 'fs'
import { resolve } from 'path'

import { getSources, removeSource, updateSource } from './source-storage'
import { deleteUrlBySource } from './url-storage'
import { getHost } from './utils/parse'

const duplicatesPath = resolve(__dirname, '../db/duplicates.json')

let duplicates: Record<string, string> = {}
try {
    duplicates = JSON.parse(fs.readFileSync(duplicatesPath, { encoding: 'utf-8' }))
}
catch (e) {
    console.log(e)
}

function write () {
    fs.writeFile(duplicatesPath, JSON.stringify(duplicates, null, 2), () => null)
}

export function findAndCleanDuplicates () {
    const sourceList = Object.values(getSources())
    const defaultList: {ids: Record<string, string>; duplicates: {originalId: string;duplicate: Source; }[]} = { ids: {}, duplicates: [] }
    const asuraOldSources = {}
    const nameDuplicates = {}
    const result = sourceList.reduce((result, source) => {
        if (source.type === 'mangastream' && source.mangaId !== source.url.split('/').filter((str) => str.trim().length).slice(-1)[0]) {
            const key = source.url + '_-_' + source.url.split('/').filter((str) => str.trim().length).slice(-1)[0]
            if (result.ids[key]) {
                result.duplicates.push({
                    originalId: result.ids[key],
                    duplicate: source
                })
            }
            else {
                asuraOldSources[source.url] = asuraOldSources[source.url] || []
                asuraOldSources[source.url].push(source)
            }
            return result
        }
        if (source.type === 'mangastream') {
            const key2 = getHost(source.url) + '_-_' + source.title
            if (!nameDuplicates[key2]) {
                nameDuplicates[key2] = source
            }
            else {
                result.duplicates.push({
                    originalId: nameDuplicates[key2],
                    duplicate: source
                })
                return result
            }
        }

        const key = source.url + '_-_' + source.mangaId
        if (asuraOldSources[source.url]) {
            asuraOldSources[source.url].forEach((oldSource) => {
                result.duplicates.push({
                    originalId: source.id,
                    duplicate: oldSource
                })
            })
            delete asuraOldSources[source.url]
        }
        if (!result.ids[key]) {
            result.ids[key] = source.id
        }
        else {
            result.duplicates.push({
                originalId: result.ids[key],
                duplicate: source
            })
        }

        return result
    }, defaultList)

    Object.values(asuraOldSources).forEach((sources: Source[]) => {
        const firstSource = sources.pop()
        const newSource = {
            ...firstSource,
            mangaId: firstSource.url.split('/').filter((str) => str.trim().length).slice(-1)[0]
        }
        updateSource(firstSource.id, newSource)
        result.duplicates.push(...sources.map((duplicate) => ({
            duplicate,
            originalId: firstSource.id
        })))
    })

    result.duplicates.forEach(({duplicate, originalId}) => {
        duplicates[duplicate.id] = originalId
        removeSource(duplicate.id)
        deleteUrlBySource(duplicate.id)
    })

    write()
}

export function checkForDuplicate (id) {
    return duplicates[id] || id
}
