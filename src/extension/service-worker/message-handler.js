import { hideChapter } from '../../common/urls'

const controller = chrome || browser

export function initMessageHandler (db, Api) {
    controller.runtime.onMessage.addListener((request, _sender, sendResponse) => {
        console.log('request', request)

        if (request?.action === 'PAGE_MATCH') {
            if (request?.source?.id && request.source.title && request.source.url) {
                db.sources.read().then((sources) => {
                    const source = sources.find((source) => source.url.split('/')[2] === request.source.url.split('/')[2] && String(source.mangaId) === String(request.source.id))
                    if (!source) {
                        sendResponse({ action: 'SHOW_BOOKMARK' })
                    }
                    else if (request.source.chapter) {
                        sendResponse({ action: 'TRACK_PROGRESS', source })
                    }
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
            if (request.source?.id && request.chapter) {
                db.urls.read().then(({newUrls}) => {
                    const url = newUrls.find((url) => url.sourceId === request.source?.id && url.chapter === request.chapter)
                    if (url) {
                        hideChapter(db, url.id)
                    }
                })
            }
        }
    })
}
