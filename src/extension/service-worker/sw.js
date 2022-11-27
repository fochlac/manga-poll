import 'regenerator-runtime/runtime.js'
import { API } from '../../common/api'
import { getLinkHelpers } from '../../common/settings'
import { API_ADDRESS } from '../shared/constants'
import { fetchUrls } from '../shared/fetch-urls'
import { db } from '../shared/storage'
import { initMessageHandler } from './message-handler'

const Api = API(API_ADDRESS, db)

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

    if (['hide', 'hiddenRegistry', 'urls'].some((key) => Object.prototype.hasOwnProperty.call(changes, key))) {
        refreshBadge()
    }
    if (Object.keys(changes).some((change) => change.includes('sources')) || Object.prototype.hasOwnProperty.call(changes, 'maxOld')) {
        await fetchUrls(db, Api)
    }
})

initMessageHandler(db, Api)
refreshBadge()
