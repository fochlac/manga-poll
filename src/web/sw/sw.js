/* global clients, __SWVERSION__ */
import 'regenerator-runtime/runtime.js'
import firebase from 'firebase/app'
import 'firebase/messaging'
import { db } from '../storage'
import { fetchUrls } from '../fetch'

const version = __SWVERSION__ || 0

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

    if (!isFocused) {
        return self.registration.showNotification(`${newUrls.length} new Chapters available!`, {
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
        const notificationPromise = handleMessage()
        e.waitUntil(notificationPromise)
        notificationPromise
            .then(() => db.urls.read())
            .then(({newUrls}) => {
                if (newUrls.length <= 0) {
                    self.registration.getNotifications().then((nl) => nl.forEach((n) => n.close()))
                }
            })
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

self.addEventListener('message', (event) => {
    if (event.data === 'CLEAR_MESSAGES') {
        event.waitUntil(self.registration.getNotifications().then((nl) => nl.forEach((n) => n.close())))
    }
})

function handleFetch (event) {
    if (
        event.request.url.includes('localhost') ||
        event.request.url.includes('/api/') ||
      // Ensure that chrome-extension:// requests don't trigger the default route.
      event.request.url.indexOf('http') !== 0 ||
      event.request.method.toLowerCase() !== 'get'
    ) {
        return
    }
    const req = event.request

    event.respondWith(
        caches
            .open(version)
            .then((cache) => cache.match(req))
            .then((res) => {
                if (res) {
                    return res
                }
                return Promise.all([fetch(req.clone()), caches.open(version)])
                    .then(([res, cache]) => {
                        cache.put(req.clone(), res.clone())
                        return res
                    })
            })
            .catch((err) => console.warn(err))
    )
}

self.addEventListener('fetch', handleFetch)
