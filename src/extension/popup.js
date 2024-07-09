import 'regenerator-runtime/runtime.js'

import { render } from 'preact'
import { Provider } from '../web/utils/atom'
import { Router } from '../web/components/molecules/Router'
import { Header } from '../web/components/molecules/Header'
import { TabBar } from '../web/components/molecules/TabBar'
import { Footer } from '../web/components/molecules/Footer'
import { Theme } from '../web/components/atoms/CssVariables'
import { LinkDetector } from '../web/components/molecules/LinkDetector'
import { Cover } from '../web/components/atoms/Cover'
import { createAtom } from '../web/store/atom'
import { db } from './storage'
import { BookmarkBanner } from './popup/bookmark-banner'
import { API_ADDRESS } from './constants'

export function Intro () {
    return (
        <div id="intro">
            <h5>How to get started</h5>
            <div class="intro-row">
                <div>1.</div>
                <p>
            Go to the page of the manga you want to track.
                    <span style="white-space: nowrap;">
              (i.e. https://fanfox.net/manga/tower_of_god/)
                    </span>
                </p>
            </div>
            <div class="intro-row">
                <div>2.</div>
                <p>
            Click the button to open this chrome extension. If the page is
            supported by this addon and you are not yet tracking this manga you
            will see this yellow bar:
                </p>
            </div>
            <img src="./images/bookmark-sample.png" id="intro-bookmark" />
            <div class="intro-row">
                <div>3.</div>
                <p>
            Finally click the "Bookmark"-button to start tracking the desired manga.
                </p>
            </div>
            <div class="intro-row">
                <p>You can check out all supported pages on the settings page.</p>
            </div>
        </div>
    )
}

const atom = createAtom(db, API_ADDRESS)

function App () {
    return (
        <Provider atom={atom}>
            <Theme />
            <Cover>
                <Header small />
                <LinkDetector />
                <TabBar small />
                <BookmarkBanner />
                <Router isExtension />
                <Footer small />
            </Cover>
        </Provider>
    )
}

render(<App />, document.body)
