import Worker from 'tiny-worker'
import { addUrl, getUrls, updateUrl } from './url-storage'
import { sendTopicMessage } from './subscriptions-controller'
import { getSources, updateSource } from './source-storage'
import { logWarning, resetStatsCache } from './stats'
import { getHost } from './utils/parse'
import { markLinksWithSourceChanged } from './link-controller'
import { storeImage } from './utils/images'

interface WorkerResult {
    hasError: boolean
    source: Source
    error: Error
    isNew: boolean
    result: ChapterResult
}

function fetchChapterListData (sources, urls): Promise<WorkerResult[]> {
    return new Promise((res, reject) => {
        const worker = new Worker('../../../dist/schedule-worker/fetch-chapters.js', [], { esm: true })
        const timeout = setTimeout(() => {
            reject(new Error('Fetch-Timeout: Terminating worker!'))
            worker.terminate()
        }, 1000 * 60 * 9)

        worker.onmessage = (e) => {
            res(e.data)
            worker.terminate()
            clearTimeout(timeout)
        }

        worker.onerror = (e) => {
            console.log(`Worker failed due to error: ${e?.message}`)
            reject(e)
            worker.terminate()
            clearTimeout(timeout)
        }

        worker.postMessage({ type: 'FETCH', sources, urls })
    })
}

let isRunning = 0
async function fetchForSources (sources: Record<string, Source>, isNew?: boolean) {
    const start = Date.now()
    console.log('Fetching new chapters...')
    const storedUrls = getUrls()
    const results = await fetchChapterListData(sources, storedUrls)
    console.log('Fetching chapters took ' + Math.floor((Date.now() - start) / 1000) + ' seconds.')

    results.forEach(({ hasError, result, error, source }) => {
        if (hasError) {
            console.log(`Error fetching urls for source ${source?.title}:\n`, error)
            logWarning(getHost(source.url), 'Unknown Error while fetching chapters.', 0)
        }
        else if (result) {
            const { sourceInfo, urls, oldUrls, warnings } = result
            const shouldUpdateDescription = !source.description || !source.imageUrl
            if (sourceInfo?.update && !shouldUpdateDescription) {
                console.log(
                    `Source has changed - updating from "${JSON.stringify(source)}" to "${JSON.stringify(
                        sourceInfo.update
                    )}".`
                )
                updateSource(source.id, sourceInfo.update)
                markLinksWithSourceChanged(source.id)
            }
            if (shouldUpdateDescription && sourceInfo?.description && sourceInfo.imageUrl) {
                console.log(`Updating source image + description for ${source.title}.`)
                storeImage(source, sourceInfo.imageUrl)
                    .then((imageUrl) =>
                        updateSource(source.id, {
                            ...source,
                            ...(sourceInfo.update ? sourceInfo.update : {}),
                            description: sourceInfo.description,
                            imageUrl
                        })
                    )
                    .catch(() => {
                        console.log(`Error storing or fetching image for ${source.title}.`)
                        updateSource(source.id, {
                            ...source,
                            ...(sourceInfo.update ? sourceInfo.update : {}),
                            description: sourceInfo.description
                        })
                    })
            }
            if (oldUrls?.length) {
                console.log(`Updating ${oldUrls.length} urls for source ${source.title}.`)
                try {
                    oldUrls.forEach((url) => updateUrl(source, url))
                }
                catch (e) {
                    console.log(`Error updating url for source ${source.title}.`)
                }
            }
            if (urls.length) {
                const page = getHost(source.url)
                console.log(`${urls.length} new urls for ${source.title} on "${page}".`)
                resetStatsCache()
                sendTopicMessage(source.id)
                const hasUrls = Object.values(storedUrls).some((url) => url.sourceId === source.id)
                urls.forEach(addUrl(source, !hasUrls || isNew))
            }
            if (warnings?.length) {
                result.warnings.forEach((rawWarning) => {
                    if (rawWarning[0] === null) {
                        rawWarning.shift()
                        console.log(...rawWarning)
                    }
                    else {
                        logWarning(rawWarning[0], rawWarning[1], rawWarning[2] as number)
                    }
                })
            }
        }
    })
}

const fetchAllUrls = async (isNew?: boolean) => {
    isRunning = Date.now() + 1000 * 60 * 15
    try {
        const sources = await getSources()
        await fetchForSources(sources, isNew)
        isRunning = 0
    }
    catch (e) {
        isRunning = 0
        throw e
    }
}

let timer

export function init () {
    clearInterval(timer)
    timer = setInterval(() => {
        if (isRunning < Date.now()) {
            fetchAllUrls()
        }
    }, 60000 * 5)
    fetchAllUrls(true)
}

export const fetchAll = (isNew) => fetchAllUrls(isNew)
export const fetchSource = (source, isNew) => fetchForSources({ [source.id]: source }, isNew)
