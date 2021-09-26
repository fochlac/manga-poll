import { createDB } from '../common/db'

const browserStorage = chrome?.storage || browser?.storage

function read (namespace, keys) {
    return new Promise((resolve) => browserStorage[namespace].get(keys, resolve))
}

function write (namespace, keyPairs) {
    return new Promise((resolve) => browserStorage[namespace].set(keyPairs, resolve))
}

function addListener (callback) {
    return browserStorage.onChanged.addListener(callback)
}

const storage = {
    read, write, addListener
}

export const db = createDB(storage)
