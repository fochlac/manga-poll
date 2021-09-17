
import { addUrl } from './url-storage'
import { sendTopicMessage } from './subscriptions-controller'
import { fetchChapterList } from './parser'
import { getSources } from './source-storage'

async function fetchUrls(source, isNew = false) {
    let urls = []

    urls = await fetchChapterList(source)

    if (urls.length) {
        let page = source.url
        try {
            page = source.url.split('/')[2].split('.').slice(-2).join('.')
        }
        catch (e) { }
        console.log(`${urls.length} new urls for ${source.title} on "${page}".`)
        sendTopicMessage(source.id)
    }
    urls.forEach(addUrl(source, isNew))
}

async function fetchAllUrls(isNew?: boolean) {
    let results = []
    const start = Date.now()
    const fetchPromiseMap = Object.values(getSources())
        .reduce((promiseMap, source) => {
            const host = source.url.replace(/https?:\/\//, '').split('/')[0]
            const previousFetch = promiseMap[host] || Promise.resolve()
            promiseMap[host] = previousFetch.then(() => {
                const fetchPromise = fetchUrls(source, isNew)
                    .then(() => ({ hasError: false, source, error: null }))
                    .catch((error) => ({ hasError: true, error, source }))
                    .then((result) => results.push(result))
                const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 250))

                return Promise.all([fetchPromise, timeout])
            })
            return promiseMap
        }, {})

    await Promise.all(Object.values(fetchPromiseMap))

    console.log('Fetching all chapters completed after', Math.ceil((Date.now() - start) / 1000), 'seconds.')

    return results.forEach((result) => {
        if (result?.hasError) {
            console.log(`Error fetching urls for source ${result?.source?.title}:\n`, result.error)
        }
    })
}

let timer

export function init() {
    clearInterval(timer)
    timer = setInterval(() => {
        fetchAllUrls()
    }, 60000 * 5)
    fetchAllUrls(true)
}

export const fetchAll = () => fetchAllUrls()
export const fetchSource = (source, isNew) => fetchUrls(source, isNew)
