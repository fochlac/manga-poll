import fs from 'fs'
import { resolve } from 'path'

import { getSources, removeSource } from './source-storage'
import { deleteUrlBySource } from './url-storage'

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
    const result = sourceList.reduce((result, source) => {
        const key = source.url + '_-_' + source.mangaId
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
