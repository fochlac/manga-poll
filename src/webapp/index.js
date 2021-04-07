import 'regenerator-runtime/runtime.js'
import firebase from 'firebase/app'
import 'firebase/messaging'
import { addImportHandlers } from '../common/import'
import { db } from './storage'
import { urlRenderer } from '../common/urls'
import { sourceRenderer } from '../common/sources'
import { requestPermission, getMessagingToken } from './sw-helper'
import { addBookmarkListener } from './bookmark'
import { API } from '../common/api'
import { createSchedule } from './schedule'

const { Urls } = API('')

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

db.onChange((changes) => {
    if (['hide', 'hiddenChapters', 'urls'].some(changes.hasOwnProperty.bind(changes))) {
        urls.render()
    }
    if (Object.keys(changes).some((change) => change.includes('sources'))) {
        sources.render()
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'maxOld')) {
        fetchUrls()
        urls.render()
    }
})

addImportHandlers(db)
addBookmarkListener()

urls.render()
sources.render()

if (Notification.permission !== 'granted') {
    requestPermission()
}

getMessagingToken()

const messaging = firebase.messaging()

messaging.onMessage(fetchUrls)

async function fetchUrls () {
    const sources = await db.sources.read()
    Urls.read(sources.map((source) => source.id))
        .then(db.urls.import)
}

const interval = createSchedule({
    callback: fetchUrls,
    interval: 5 * 60 * 1000,
    isActive: true
})

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        interval.setInterval(5 * 60 * 1000)
    }
    else {
        interval.setInterval(60 * 60 * 1000)
    }
})

