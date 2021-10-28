import { promises, readFileSync, copyFileSync } from "fs"

const { writeFile, copyFile } = promises

export function createWrite(path) {
    let timeout
    const dataRef = {current: null}
    const nextDataRef = {current: null}
    let isWriting = false
    return async (data) => {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                isWriting = true
                copyFile(path, `${path}.backup`)
                    .then(() => writeFile(path, JSON.stringify(dataRef.current, null, 2)))
                    .catch(console.log)
                    .then(() => {
                        dataRef.current = nextDataRef.current
                        isWriting = false
                    })
            }, 500)
        }
        if (isWriting) {
            nextDataRef.current = data
        }
        else {
            dataRef.current = data
        }
    }
}

export function readFile<T=any>(path: string, modificationCallback?:(data:Record<string, T>) => boolean|Promise<Boolean>, write?: Function):Record<string, T> {
    let data: Record<string, T> = {}
    try {
        data = JSON.parse(readFileSync(path, { encoding: 'utf-8' }))
    }
    catch (e) {
        console.log(`Error reading file "${path}". Trying to use backup...`)
        try {
            data = JSON.parse(readFileSync(`${path}.backup`, { encoding: 'utf-8' }))
        }
        catch (e) {
            console.log(`Error reading file "${path}.backup". Reinitializing DB`)
            copyFileSync(`${path}.backup`, `${path}.backup_${Date.now()}`)
        }   
    }
    if (typeof modificationCallback === 'function' && modificationCallback(data) && typeof write === 'function') {
        write(data)        
    }
    return data
}