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

messaging.onBackgroundMessage(async (payload) => {
    const sources = await db.sources.read()
    Urls.read(sources.map((source) => source.id))
        .then(db.urls.import)
})
