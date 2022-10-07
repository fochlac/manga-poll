/* globals postMessage */
import { fetchChapterList } from '../parser'
import { getHost } from '../utils/parse'

import '../parser/parse-fanfox'
import '../parser/parse-madara'
import '../parser/parse-mangadex'
import '../parser/parse-mangastream'
import '../parser/parse-genkan'
import '../parser/parse-leviathan'
import '../parser/parse-webtoons'
import '../parser/parse-reaper'

let skip = false
async function fetchAllUrls (sources: Record<string, Source>, urls: Record<string, Url>) {
    const results = []
    let count = 0
    let complete = 0
    let next = 0.1
    const fetchPromiseMap = Object.values(sources).reduce((promiseMap, source) => {
        const host = getHost(source.url)
        count += 1
        const previousFetch = promiseMap[host] || Promise.resolve()
        promiseMap[host] = previousFetch.then(() => {
            if (skip) {
                return Promise.resolve()
            }
            const fetchPromise = fetchChapterList(source, urls)
                .then((result) => ({ hasError: false, source, error: null, result }))
                .catch((error) => ({ hasError: true, error, source }))
                .then((result) => results.push(result))

            const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 2500))
            complete += 1
            if (complete / count >= next) {
                next += 0.1
                console.log(`Checked ${complete}/${count} series.`)
            }

            return Promise.all([fetchPromise, timeout])
        })

        return promiseMap
    }, {})

    await Promise.all(Object.values(fetchPromiseMap))

    return results
}

// eslint-disable-next-line no-undef
onmessage = async function (e) {
    if (e.data.type === 'FETCH_ALL' && e.data.sources) {
        const data = await fetchAllUrls(e.data.sources, e.data.urls)
        postMessage(data)
    }
    else if (e.data.type === 'FORCE_STOP') {
        skip = true
    }
}
