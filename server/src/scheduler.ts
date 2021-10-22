import Worker from 'tiny-worker'
import { addUrl } from './url-storage'
import { sendTopicMessage } from './subscriptions-controller'
import { getSources, updateSource } from './source-storage'
import { logWarning } from './stats'
import { getHost } from './utils/parse'
import { markLinksWithSourceChanged } from './link-controller'
import { storeImage } from './utils/images'
import { resolve } from 'path'

interface WorkerResult {
    hasError: boolean;
    source: Source;
    error: Error;
    isNew: boolean;
    result: ChapterResult;
}

function fetchChapterListData (sources): Promise<WorkerResult[]> {
    return new Promise(async (res, reject) => {
        const worker = new Worker('../../../dist/schedule-worker/fetch-chapters.js', [], { esm: true })
        const timeout = setTimeout(() => worker.terminate(), 300000)

        worker.onmessage = (e) => {
            res(e.data)
            worker.terminate()
            clearTimeout(timeout)
        }
        
        worker.onerror = (e) => {
            reject(e)
            worker.terminate()
            clearTimeout(timeout)
        }

        worker.postMessage({ type: 'FETCH', sources })
    })

}

async function fetchForSources(sources: Record<string, Source>, isNew?: boolean) {
    const start = Date.now()
    console.log('Fetching new chapters...')
    const results = await fetchChapterListData(sources)
    console.log('Fetching chapters took ' + Math.floor((Date.now() - start) / 1000) + ' seconds.')

    results.forEach(({hasError, result, error, source}) => {
        if (hasError) {
            console.log(`Error fetching urls for source ${source?.title}:\n`, error)
            logWarning(getHost(source.url), 'Unknown Error while fetching chapters.', 0)
        }
        else if (result.warning) {
            logWarning(result.warning[0], result.warning[1], result.warning[2] as number)
        }
        else if (result) {
            const { sourceInfo, urls } = result
            const shouldUpdateDescription = !source.description || !source.imageUrl
            if (sourceInfo?.update && !shouldUpdateDescription) {
                console.log(`Source has changed - updating from "${JSON.stringify(source)}" to "${JSON.stringify(sourceInfo.update)}".`)
                updateSource(source.id, sourceInfo.update)
                markLinksWithSourceChanged(source.id)
            }
            if (shouldUpdateDescription && sourceInfo?.description && sourceInfo.imageUrl) {
                console.log(`Updating source image + description for ${source.title}.`)
                storeImage(source, sourceInfo.imageUrl)
                    .then((imageUrl) => updateSource(source.id, { 
                        ...source, 
                        ...(sourceInfo.update ? sourceInfo.update : {}) ,
                        description: sourceInfo.description, 
                        imageUrl,
                    }))
            }
            if (urls.length) {
                let page = source.url
                try {
                    page = getHost(source.url)
                }
                catch (e) { }
                console.log(`${urls.length} new urls for ${source.title} on "${page}".`)
                sendTopicMessage(source.id)
            }
            urls.forEach(addUrl(source, isNew))
        }
    })
}

const fetchAllUrls = async (isNew?: boolean) => {    
    const sources = await getSources()
    fetchForSources(sources, isNew)
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
export const fetchSource = (source, isNew) => fetchForSources({[source.id]: source}, isNew)
