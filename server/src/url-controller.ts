import { checkForDuplicate } from './duplicates'
import { getUrls } from './url-storage'

export function urlController (app) {
    app.post('/api/urls/fetch', async (req, res) => {
        let payload = []
        const urls = await getUrls()

        if (Array.isArray(req?.body?.sources) && req.body.sources.length > 0) {
            const sourceFilter = req.body.sources.map(checkForDuplicate)
            payload = Object.values(urls).filter((url) => sourceFilter.includes(url.sourceId))
        }
        if (!isNaN(Number(req?.body?.date)) && Number(req.body.date) > 0) {
            const limit = (req?.body?.limit && !isNaN(Number(req.body.limit)) && Number(req.body.limit)) || 25
            const date = Number(req.body.date)
            let old = 0
            payload = payload
                .sort((url1, url2) => url2.created - url1.created)
                .filter((url) => {
                    if (url.created >= date) {
                        return true
                    }
                    else if (old <= limit) {
                        old++
                        return true
                    }
                    return false
                })
        }

        res.status(200).json({ valid: true, payload })
    })
}
