/* global clients */
import 'regenerator-runtime/runtime.js'
import firebase from 'firebase/app'
import 'firebase/messaging'
import { db } from './storage'
import { fetchUrls } from './fetch'

firebase.initializeApp({
    apiKey: 'AIzaSyBe2mv85Y9-oQJhDFeqzCLrTaetRp_Cm50',
    authDomain: 'manga-poll.firebaseapp.com',
    projectId: 'manga-poll',
    storageBucket: 'manga-poll.appspot.com',
    messagingSenderId: '246007842230',
    appId: '1:246007842230:web:46d93150bc98eaecb0ed17'
})

function hasVisibleClients () {
    return clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((wc) => wc.some((c) => c.url.includes(self.origin) && c.focused))
}

let fetchPromise
async function handleMessage () {
    if (!fetchPromise) {
        fetchPromise = fetchUrls()
    }
    await fetchPromise
    fetchPromise = undefined

    const { newUrls } = await db.urls.read()

    await self.registration.getNotifications().then((nl) => nl.forEach((n) => n.close()))

    const isFocused = await hasVisibleClients()

    if (newUrls.length > 0 && !isFocused) {
        self.registration.showNotification(`${newUrls.length} new Chapters available!`, {
            body: 'Click to open the reader.',
            icon: '/android-chrome-144x144.png',
            requireInteraction: true,
            silent: true
        })
    }
}

self.addEventListener('push', (e) => {
    const payload = e?.data?.json()
    if (payload?.data?.type === 'UPDATE_CHAPTER') {
        e.waitUntil(handleMessage())
    }
})

self.addEventListener('notificationclick', (e) => {
    return e.waitUntil(
        Promise.all([
            self.registration.getNotifications().then((nl) => nl.forEach((n) => n.close())),
            clients.matchAll({ includeUncontrolled: true, type: 'window' }).then((windowClients) => {
                const client = windowClients.find((client) => client.url.includes(self.origin) && 'focus' in client)
                if (client) {
                    client.focus()
                }
                if (clients.openWindow) {
                    return clients.openWindow(self.origin)
                }
            })
        ])
    )
})

self.addEventListener('install', () => self.skipWaiting())
