import 'regenerator-runtime/runtime.js'
import firebase from 'firebase/app'
import 'firebase/messaging'
import platform from 'platform'

import { addImportHandlers } from '../../common/import'
import { urlRenderer } from '../../common/urls'
import { sourceRenderer } from '../../common/sources'
import { addBookmarkListener } from './bookmark'
import { createSchedule } from '../../common/schedule'
import { markRefreshed, resisterProgressHandler, updateProgress } from '../../common/progress-bar'
import { registerNotificationHandlers } from './notification-settings'
import { getMessagingToken } from '../sw/sw-helper'
import { registerMenuListeners } from '../../common/menu'
import { db } from '../storage'
import { API } from '../../common/api'
import { addSettingsHandlers, getLinkHelpers } from '../../common/settings'
import { fetchUrls } from '../fetch'
import { addImpressumListeners } from './impressum'
import { renderHostList } from '../../common/hosts'

const Api = API('', db)
const Links = getLinkHelpers(db, Api)

firebase.initializeApp({
    apiKey: 'AIzaSyBe2mv85Y9-oQJhDFeqzCLrTaetRp_Cm50',
    authDomain: 'manga-poll.firebaseapp.com',
    projectId: 'manga-poll',
    messagingSenderId: '246007842230',
    appId: '1:246007842230:web:46d93150bc98eaecb0ed17'
})

db.sources.read()
    .then((sources) => {
        let link
        if (platform.name === 'Chrome') {
            link = `
                <a href="https://chrome.google.com/webstore/detail/fdmboijadaabmpkdfikffbgpmibholfo/">
                    Chrome Extension
                </a>
            `
        }
        if (platform.name === 'Firefox') {
            link = `
                <a href="https://addons.mozilla.org/de/firefox/addon/manga-scout/">
                    Firefox Extension
                </a>
            `
        }
        if (
            link && sources.length &&
            sessionStorage.getItem('hasMangaScout') !== '1' &&
            Date.now() - Number(localStorage.getItem('hideExtensionNote') || 0) >= 1000 * 60 * 60 * 24 * 90
        ) {
            document.getElementById('extension').classList.remove('hidden')
            document.getElementById('extension').innerHTML = `
                <span>Get the ${link} for easier tracking.</span>
                <span class="action">Hide</span>
            `
            document.getElementById('extension').addEventListener('click', (e) => {
                if (e.target.classList.contains('action')) {
                    localStorage.setItem('hideExtensionNote', Date.now())
                    document.getElementById('extension').classList.add('hidden')
                }
            })
        }
        if (link) {
            document.getElementById('extension-footer').innerHTML = link
        }
    })

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
}

db.urls.setMaxOld(100)

const urls = urlRenderer(db)
const sources = sourceRenderer(db)

const interval = createSchedule({
    callback: async () => {
        await fetchUrls()
        markRefreshed()
    },
    interval: 60 * 1000,
    isActive: true,
    updater: updateProgress
})

db.onChange(async (changes) => {
    await Links.pushLinkUpdate(changes)
    if (['hide', 'hiddenRegistry'].some(Object.prototype.hasOwnProperty.bind(changes))) {
        navigator.serviceWorker.controller.postMessage('CLEAR_MESSAGES')
    }
    if (['hide', 'hiddenRegistry', 'urls'].some(Object.prototype.hasOwnProperty.bind(changes))) {
        urls.render()
    }
    if (Object.keys(changes).some((change) => change.includes('sources'))) {
        sources.render()
        const settings = await db.settings.local.read()

        if (settings.notifications) {
            const sources = await db.sources.read()
            Api.Subscription.subscribe(sources.map((source) => source.id), await getMessagingToken())
        }
        interval.triggerInstantly()
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'maxOld')) {
        interval.triggerInstantly()
        urls.render()
    }
})

addImportHandlers(db)
addSettingsHandlers(db, Api)
renderHostList(db, Api)
addBookmarkListener(db, Api)
registerMenuListeners(db, Api)
registerNotificationHandlers(db, Api)
resisterProgressHandler(() => interval.triggerInstantly())
addImpressumListeners()

urls.render()
sources.render()
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        navigator.serviceWorker.controller.postMessage('CLEAR_MESSAGES')
    }
})

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        interval.setInterval(60 * 1000)
    }
    else {
        interval.setInterval(15 * 60 * 1000)
    }
})

