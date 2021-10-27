import { fetchChapterList } from '../parser'
import { getHost } from '../utils/parse'

import '../parser/parse-fanfox'
import '../parser/parse-madara'
import '../parser/parse-mangadex'
import '../parser/parse-mangastream'
import '../parser/parse-genkan'
import '../parser/parse-leviathan'
import '../parser/parse-webtoons'

async function fetchAllUrls(sources:Record<string, Source>, urls:Record<string, Url>) {
    let results = []
    const fetchPromiseMap = Object.values(sources)
        .reduce((promiseMap, source) => {
            const host = getHost(source.url)
            const previousFetch = promiseMap[host] || Promise.resolve()
            promiseMap[host] = previousFetch.then(() => {
                const fetchPromise = fetchChapterList(source, urls)
                    .then((result) => ({ hasError: false, source, error: null, result }))
                    .catch((error) => ({ hasError: true, error, source }))
                    .then((result) => results.push(result))
                const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 2500))

                return Promise.all([fetchPromise, timeout])
            })
            return promiseMap
        }, {})

    await Promise.all(Object.values(fetchPromiseMap))

    return results
}

onmessage = async function (e) {
    if (e.data.sources) {
        const data = await fetchAllUrls(e.data.sources, e.data.urls)
        postMessage(data);
    }
}