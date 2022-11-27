import { checkForDuplicate } from './duplicates'
import { getSources } from './source-storage'
import { getSortedUrlKeysForSource, getUrlKeysAfter, getUrls } from './url-storage'

interface FetchFilter {
    sources?: Record<string, boolean>;
    date?: number;
    requiredPerSource?: number;
    limit?: number;
}

export function urlController (app) {
    app.post('/api/urls/fetch', (req, res) => {
        const sources = getSources()
        let payload = []
        const filters: FetchFilter = {}

        if (Array.isArray(req?.body?.sources) && req.body.sources.length > 0) {
            filters.sources = req.body.sources.reduce((map, sourceId) => {
                const id = checkForDuplicate(sourceId)
                if (sources[id]) {
                    map[id] = true
                }
                return map
            }, {})
        }
        if (!isNaN(Number(req?.body?.date)) && Number(req.body.date) > 0) {
            filters.date = Number(req.body.date)
            filters.limit = (req?.body?.limit && !isNaN(Number(req.body.limit)) && Number(req.body.limit)) || 25
        }
        if (filters.sources && !isNaN(Number(req?.body?.requiredPerSource))) {
            filters.requiredPerSource = Number(req?.body?.requiredPerSource)
        }

        const urls = getUrls()
        let oldestCreated
        if (filters.date) {
            const keys = getUrlKeysAfter(filters.date, Object.keys(filters.sources || {}))
            const sortedUrlKeys = keys.urls.sort((key1, key2) => urls[key2].created - urls[key1].created)
            const reverseStartIndex = sortedUrlKeys.slice(0).reverse().findIndex((urlKey) => urls[urlKey].created > filters.date)
            let old = 0
            let index = sortedUrlKeys.length - reverseStartIndex
            while (old < filters.limit) {
                if (!sortedUrlKeys[index]) {
                    let result
                    while (!result || !result.isLast && result.additionalUrls.length === 0) {
                        result = keys.getPrevious()
                    }
                    const additionalUrlsSorted = result.additionalUrls.sort((key1, key2) => urls[key2].created - urls[key1].created)
                    sortedUrlKeys.push(...additionalUrlsSorted)
                }
                if (!sortedUrlKeys[index]) {
                    break
                }
                if (urls[sortedUrlKeys[index]].created < filters.date) {
                    old++
                    oldestCreated = urls[sortedUrlKeys[index]].created
                }

                index++
            }
            payload = sortedUrlKeys.slice(0, index).map((key) => urls[key])
        }
        if (filters.requiredPerSource) {
            Object.keys(filters.sources).forEach((sourceId) => {
                const keys = getSortedUrlKeysForSource(sourceId).slice(0, filters.requiredPerSource)
                keys.forEach((key) => {
                    if (urls[key].created <= oldestCreated) {
                        payload.push(urls[key])
                    }
                })
            })
        }

        res.status(200).json({ valid: true, payload })
    })
}
