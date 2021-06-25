import 'regenerator-runtime/runtime.js'
import firebase from 'firebase/app'
import 'firebase/messaging'
import { addImportHandlers } from '../common/import'
import { db } from './storage'
import { urlRenderer } from '../common/urls'
import { sourceRenderer } from '../common/sources'
import { addBookmarkListener } from './bookmark'
import { API } from '../common/api'
import { createSchedule } from '../common/schedule'
import { resisterProgressHandler, updateProgress } from '../common/progress-bar'
import { registerNotificationHandlers } from './notification-settings'
import { getMessagingToken } from './sw-helper'
import { registerMenuListeners } from '../common/menu'
import { addSettingsHandlers, getLinkHelpers } from '../common/settings'

const Api = API('')

const Links = getLinkHelpers(db, Api)

async function fetchUrls () {
    const maxOld = await db.urls.getMaxOld()
    const hide = await db.urls.getHide()
    const sources = await db.sources.read()
    Api.Urls.read(sources.map((source) => source.id), maxOld, hide)
        .then(db.urls.import)

    Links.fetchLinkUpdate()
}

firebase.initializeApp({
    apiKey: 'AIzaSyBe2mv85Y9-oQJhDFeqzCLrTaetRp_Cm50',
    authDomain: 'manga-poll.firebaseapp.com',
    projectId: 'manga-poll',
    messagingSenderId: '246007842230',
    appId: '1:246007842230:web:46d93150bc98eaecb0ed17'
})

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
}
db.urls.setMaxOld(100)

const urls = urlRenderer(db)
const sources = sourceRenderer(db)

db.onChange(async (changes) => {
    if (['hide', 'hiddenChapters', 'urls'].some(changes.hasOwnProperty.bind(changes))) {
        urls.render()
    }
    if (Object.keys(changes).some((change) => change.includes('sources'))) {
        sources.render()
        const settings = await db.settings.local.read()

        if (settings.notifications) {
            const sources = await db.sources.read()
            Api.Subscription.subscribe(sources.map((source) => source.id), await getMessagingToken())
        }
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'maxOld')) {
        fetchUrls()
        urls.render()
    }
    Links.pushLinkUpdate(changes)
})

const interval = createSchedule({
    callback: fetchUrls,
    interval: 5 * 60 * 1000,
    isActive: true,
    updater: updateProgress
})

addImportHandlers(db)
addSettingsHandlers(db, Api)
addBookmarkListener()
registerMenuListeners()
registerNotificationHandlers()
resisterProgressHandler(() => interval.triggerInstantly())

urls.render()
sources.render()

firebase.messaging().onMessage((message) => {
    fetchUrls()
    console.log('message', message)
})

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        interval.setInterval(5 * 60 * 1000)
    }
    else {
        interval.setInterval(60 * 60 * 1000)
    }
})

