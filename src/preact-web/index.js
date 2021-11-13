import 'preact/debug'
import 'regenerator-runtime/runtime.js'
import firebase from 'firebase/app'
import 'firebase/messaging'
import { render } from 'preact'
import { atom } from './store/atom'
import { Provider } from './utils/atom'
import { Router } from './components/molecules/Router'
import { Header } from './components/molecules/Header'
import { TabBar } from './components/molecules/TabBar'
import { db } from './storage'
import { Footer } from './components/molecules/Footer'

firebase.initializeApp({
    apiKey: 'AIzaSyBe2mv85Y9-oQJhDFeqzCLrTaetRp_Cm50',
    authDomain: 'manga-poll.firebaseapp.com',
    projectId: 'manga-poll',
    messagingSenderId: '246007842230',
    appId: '1:246007842230:web:46d93150bc98eaecb0ed17'
})

db.urls.setMaxOld(100)

function App () {
    return (
        <Provider atom={atom}>
            <Header />
            <TabBar />
            <Router />
            <Footer />
        </Provider>
    )
}

render(<App />, document.body)
