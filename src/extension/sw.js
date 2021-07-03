import 'regenerator-runtime/runtime.js'
import { API } from '../common/api'
import { getLinkHelpers } from '../common/settings'
import { db } from './storage'

const Api = API('https://manga.fochlac.com')

const ALARMS = {
    URLS: 'urls'
}

const Links = getLinkHelpers(db, Api)
async function fetchUrls () {
    await Links.fetchLinkUpdate()
    const maxOld = await db.urls.getMaxOld()
    const hide = await db.urls.getHide()
    const sources = await db.sources.read()
    await Api.Urls.read(sources.map((source) => source.id), maxOld, hide)
        .then(db.urls.import)
    refreshBadge()
}

chrome.alarms.create(ALARMS.URLS, { periodInMinutes: 5 })

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === ALARMS.URLS) {
        fetchUrls()
    }
})

async function refreshBadge () {
    const { newUrls } = await db.urls.read()
    chrome.action.setBadgeText(
        newUrls.length
            ? { text: newUrls.length >= 100 ? '99+' : String(newUrls.length) }
            : { text: '' }
    )
    chrome.action.setTitle({
        title: newUrls.length
            ? `${newUrls.length} chapters available.`
            : 'No new chapters available.'
    })
}

db.onChange(async (changes) => {
    if (['hide', 'hiddenChapters', 'urls'].some((key) => Object.prototype.hasOwnProperty.call(changes, key))) {
        refreshBadge()
    }
    if (Object.keys(changes).some((change) => change.includes('sources')) || Object.prototype.hasOwnProperty.call(changes, 'maxOld')) {
        await fetchUrls()
    }
})

self.addEventListener('message', (event) => {
    if (event.data === 'FETCH_CHAPTERS') {
        fetchUrls()
    }
})
