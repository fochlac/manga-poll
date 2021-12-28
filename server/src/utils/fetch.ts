import AbortController from 'abort-controller'
import nodeFetch from 'node-fetch'

export function fetch (url, options, timeLimit = 15000) {
    const controller = new AbortController()
    const timeout = setTimeout(() => {
        controller.abort()
    }, timeLimit)

    const fetchPromise = nodeFetch(url, { ...options, signal: controller.signal })

    fetchPromise.finally(() => clearTimeout(timeout)).catch(Function.prototype)

    return fetchPromise
}
