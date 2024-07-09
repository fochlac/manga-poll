import { createDB } from '../common/db'

const browserStorage = chrome?.storage || browser?.storage

function read (namespace, keys) {
    return new Promise((resolve) => browserStorage[namespace].get(keys, resolve))
}

function write (namespace, keyPairs) {
    return new Promise((resolve) => browserStorage[namespace].set(keyPairs, resolve))
}

function stringifyCompare (a, b) {
    const compA = typeof a === 'string' ? a : JSON.stringify(a)
    const compB = typeof b === 'string' ? b : JSON.stringify(b)
    return compA === compB
}

function addListener (callback) {
    let lastSyncValue
    let lastLocalValue
    setInterval(async () => {
        const syncValue = await browserStorage.sync.get()
        const localValue = await browserStorage.local.get()

        if (!lastLocalValue || !lastSyncValue) {
            lastLocalValue = localValue
            lastSyncValue = syncValue
            return callback({...localValue, ...syncValue})
        }
        const changes = {}
        Object.keys(syncValue).forEach((syncKey) => {
            if (!stringifyCompare(lastSyncValue[syncKey], syncValue[syncKey])) {
                changes[syncKey] = syncValue[syncKey]
            }
        })
        Object.keys(localValue).forEach((localKey) => {
            if (!stringifyCompare(lastLocalValue[localKey], localValue[localKey])) {
                changes[localKey] = localValue[localKey]
            }
        })
        if (Object.keys(changes).length) {
            console.log('db-changes', changes)
            lastLocalValue = localValue
            lastSyncValue = syncValue
            return callback(changes)
        }
    }, 1000)
    return browserStorage.onChanged.addListener(callback)
}

const storage = {
    read, write, addListener
}

export const db = createDB(storage)
