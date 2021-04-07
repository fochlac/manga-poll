import localForage from 'localforage'
import { createDB } from '../common/db'

let onChange = Function.prototype

function read (_namespace, keyMap) {
    const values = Object.keys(keyMap)
        .map(async (key) => ({[key]: await localForage.getItem(key) || keyMap[key]}))

    return Promise.all(values)
        .then((values) => values .reduce((map, data) => ({ ...map, ...data }), {}))
}

async function write (_namespace, keyPairs) {
    await Promise.all(Object.keys(keyPairs).map(async (key) => await localForage.setItem(key, keyPairs[key])))
    onChange(keyPairs)
}

function addListener (callback = Function.prototype) {
    onChange = callback
    return window.addEventListener('storage', () => {
        callback(Object.keys(localStorage))
    })
}

const storage = {
    read, write, addListener
}

export const db = createDB(storage)
