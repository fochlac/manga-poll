
import { addUrl } from './url-controller'
import { getSources } from './source-controller'
import { sendTopicMessage } from './subscriptions-controller'
import { parseFanfox } from './parser/parse-fanfox'
import { fetchChapterList } from './parser'

async function fetchUrls (source, isNew = false) {
    let urls = []

    urls = await fetchChapterList(source)

    if (urls.length) {
        sendTopicMessage(source.id)
        console.log(`${urls.length} new urls for ${source.title} on "${source.url.split('/')[2]}".`)
    }
    urls.forEach(addUrl(source, isNew))
}

function fetchAllUrls (isNew?: boolean) {
    return Promise.all(Object.values(getSources()).map((source) => fetchUrls(source, isNew)
        .then(() => ({ hasError: false, source, error: null }))
        .catch((error) => ({ hasError: true, error, source }))
    ))
        .then((results) => {
            results.forEach((result) => {
                if (result?.hasError) {
                    console.log(`Error fetching urls for source ${result?.source?.title}:\n`, result.error)
                }
            })
        })
}

let timer

export function init () {
    clearInterval(timer)
    timer = setInterval(() => {
        fetchAllUrls()
    }, 60000 * 5)
    fetchAllUrls(true)
}

export const fetchAll = () => fetchAllUrls()
export const fetchSource = (source, isNew) => fetchUrls(source, isNew)
