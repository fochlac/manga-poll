import 'regenerator-runtime/runtime.js'
import { Urls } from '../common/api'
import { db } from './storage'

const ALARMS = {
    URLS: 'urls'
}

chrome.alarms.create(ALARMS.URLS, { periodInMinutes: 15 })

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === ALARMS.URLS) {
        const sources = await db.sources.read()
        Urls.read(sources.map((source) => source.id))
            .then(db.urls.import)
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
    if (Object.keys(changes).some((change) => change.includes('sources'))) {
        const sources = await db.sources.read()
        Urls.read(sources.map((source) => source.id))
            .then(db.urls.import)
    }
})
