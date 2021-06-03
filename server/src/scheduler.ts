import FormData from 'form-data'
import fetch from 'node-fetch'
import { parseMadaro } from './parse-madaro'
import { addUrl } from './url-controller'
import { getSources } from './source-controller'
import { sendTopicMessage } from './subscriptions-controller'

async function fetchUrls (source, isNew = false) {
    const formData = new FormData()
    formData.append('action', 'manga_get_chapters')
    formData.append('manga', source.mangaId)

    const body = await fetch(source.url, { method: 'post', body: formData }).then((res) => res.text())

    const urls = parseMadaro(source, body)
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
    }, 60000 * 15)
    fetchAllUrls(true)
}

export const fetchAll = () => fetchAllUrls()
export const fetchSource = (source, isNew) => fetchUrls(source, isNew)
