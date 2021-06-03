/* global clients */
import 'regenerator-runtime/runtime.js'
import firebase from 'firebase/app'
import 'firebase/messaging'
import { db } from './storage'
import { API } from '../common/api'

const { Urls } = API('')

firebase.initializeApp({
    apiKey: 'AIzaSyBe2mv85Y9-oQJhDFeqzCLrTaetRp_Cm50',
    authDomain: 'manga-poll.firebaseapp.com',
    projectId: 'manga-poll',
    storageBucket: 'manga-poll.appspot.com',
    messagingSenderId: '246007842230',
    appId: '1:246007842230:web:46d93150bc98eaecb0ed17'
})

const messaging = firebase.messaging()

let notification
let timer
messaging.onBackgroundMessage((payload) => {
    clearTimeout(timer)
    timer = setTimeout(async () => {
        const sources = await db.sources.read()
        await Urls.read(sources.map((source) => source.id))
            .then(db.urls.import)

        const { newUrls } = await db.urls.read()
        if (notification) {
            notification.close()
        }
        if (newUrls.length > 0) {
            await self.registration.getNotifications().then((notifications) => {
                notifications.forEach((notification) => notification.close())
            })
            self.registration.showNotification(`${newUrls.length} new Chapters available!`, {
                body: 'Click here to open the reader.',
                requireInteraction: true,
                silent: true
            })
        }
    }, 200)
})

self.addEventListener('notificationclick', (e) => {
    return e.waitUntil(
        Promise.all([
            self.registration.getNotifications()
                .then((notifications) => notifications.forEach((notification) => notification.close())),
            clients.matchAll({type: 'window'}).then((windowClients) => {
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
