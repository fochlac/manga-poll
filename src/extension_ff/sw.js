import 'regenerator-runtime/runtime.js'
import { API } from '../common/api'
import { getLinkHelpers } from '../common/settings'
import { API_ADDRESS } from '../extension/constants'
import { db } from '../extension/storage'

const Api = API(API_ADDRESS)

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

const alarms = chrome?.alarms || browser?.alarms

alarms.create(ALARMS.URLS, { periodInMinutes: 5 })

alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === ALARMS.URLS) {
        fetchUrls()
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
        await fetchUrls()
    }
})