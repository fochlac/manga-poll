import { promises } from "fs"

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