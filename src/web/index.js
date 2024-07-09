import 'regenerator-runtime/runtime.js'
import firebase from 'firebase/app'
import 'firebase/messaging'
import { render } from 'preact'
import { Provider } from './utils/atom'
import { Router } from './components/molecules/Router'
import { Header } from './components/molecules/Header'
import { TabBar } from './components/molecules/TabBar'
import { Footer } from './components/molecules/Footer'
import { Theme } from './components/atoms/CssVariables'
import { LinkDetector } from './components/molecules/LinkDetector'
import { useEffect } from 'preact/hooks'
import { Cover } from './components/atoms/Cover'
import { createAtom } from './store/atom'
import { db } from './storage'

firebase.initializeApp({
    apiKey: 'AIzaSyBe2mv85Y9-oQJhDFeqzCLrTaetRp_Cm50',
    authDomain: 'manga-poll.firebaseapp.com',
    projectId: 'manga-poll',
    messagingSenderId: '246007842230',
    appId: '1:246007842230:web:46d93150bc98eaecb0ed17'
})

const atom = createAtom(db, '')

function App () {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
        }
    }, [])

    return (
        <Provider atom={atom}>
            <Theme />
            <Cover>
                <Header />
                <LinkDetector />
                <TabBar />
                <Router />
                <Footer />
            </Cover>
        </Provider>
    )
}

render(<App />, document.body)
