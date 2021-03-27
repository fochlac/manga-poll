import { createDB } from '../common/db'

function read (namespace, keys) {
    return new Promise((resolve) => chrome.storage[namespace].get(keys, resolve))
}

function write (namespace, keyPairs) {
    return new Promise((resolve) => chrome.storage[namespace].set(keyPairs, resolve))
}

function addListener (callback) {
    return chrome.storage.onChanged.addListener(callback)
}

const storage = {
    read, write, addListener
}

export const db = createDB(storage)
