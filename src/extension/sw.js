import 'regenerator-runtime/runtime.js'
import { API } from '../common/api'
import { getLinkHelpers } from '../common/settings'
import { API_ADDRESS } from './constants'
import { fetchUrls } from './fetch-urls'
import { db } from './storage'

const Api = API(API_ADDRESS)

const ALARMS = {
    URLS: 'urls'
}

const Links = getLinkHelpers(db, Api)

const alarms = chrome?.alarms || browser?.alarms

alarms.create(ALARMS.URLS, { periodInMinutes: 5 })

alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === ALARMS.URLS) {
        await fetchUrls(db, Api)
    }
})

async function refreshBadge () {
    const action = chrome?.action || browser?.browserAction
    if (!action) {
        return
    }
    const { newUrls } = await db.urls.read()

    action.setBadgeText(
        newUrls.length
            ? { text: newUrls.length >= 100 ? '99+' : String(newUrls.length) }
            : { text: '' }
    )
    action.setTitle({
        title: newUrls.length
            ? `${newUrls.length} chapters available.`
            : 'No new chapters available.'
    })
}

db.onChange(async (changes) => {
    await Links.pushLinkUpdate(changes)

    if (['hide', 'hiddenChapters', 'urls'].some((key) => Object.prototype.hasOwnProperty.call(changes, key))) {
        refreshBadge()
    }
    if (Object.keys(changes).some((change) => change.includes('sources')) || Object.prototype.hasOwnProperty.call(changes, 'maxOld')) {
        await fetchUrls(db, Api)
    }
})

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    console.log('request', request)

    if (request?.action === 'PAGE_MATCH') {
        if (request?.source?.id && request.source.title && request.source.url) {
            db.sources.read().then((sources) => {
                if (!sources.some((source) => source.url.split('/')[2] === request.source.url.split('/')[2] && String(source.mangaId) === String(request.source.id))) {
                    sendResponse({ action: 'SHOW_BOOKMARK' })
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
})
