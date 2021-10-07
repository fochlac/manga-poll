import { hideChapter } from '../../common/urls'
import { getHost } from '../../common/utils'

const controller = chrome || browser

export function initMessageHandler (db, Api) {
    controller.runtime.onMessage.addListener((request, _sender, sendResponseRaw) => {
        console.log('request', request)
        const sendResponse = (response) => {
            console.log('response', response)
            sendResponseRaw(response)
        }

        if (request?.action === 'PAGE_MATCH') {
            if (request?.source?.id && request.source.title && request.source.url) {
                db.sources.read().then(async (sources) => {
                    const source = sources.find((source) => getHost(source.url) === getHost(request.source.url) && String(source.mangaId) === String(request.source.id))
                    if (!source) {
                        return sendResponse({ action: 'SHOW_BOOKMARK' })
                    }
                    else if (request.source.chapter) {
                        const { newUrls } = await db.urls.read()
                        const url = newUrls.find((url) => url.sourceId === source.id && url.chapter === request.source.chapter)

                        if (url) {
                            return sendResponse({ action: 'TRACK_PROGRESS', url, source })
                        }
                    }

                    // close message channel by sending empty response
                    sendResponse({})
                })
                return true
            }
        }
        else if (request?.action === 'SAVE_BOOKMARK') {
            if (request.source?.mangaId && request.source.title && request.source.url && request.source.type) {
                Api.Source.insert(request.source)
                    .then((source) => db.sources.add(source))
                    .then(() => {
                        sendResponse({ action: 'SAVE_BOOKMARK_SUCCESS' })
                    })
                    .catch(() => {
                        sendResponse({ action: 'SAVE_BOOKMARK_ERROR' })
                    })
                return true
            }

            sendResponse({ action: 'SAVE_BOOKMARK_ERROR' })
        }
        else if (request?.action === 'MARK_READ') {
            if (request.url) {
                hideChapter(db, request.url.id)
                sendResponse({ action: 'MARK_READ_SUCCESS' })
                return true
            }
            sendResponse({ action: 'MARK_READ_ERROR' })
        }
    })
}
