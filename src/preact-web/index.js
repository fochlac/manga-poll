import 'preact/debug'
import 'regenerator-runtime/runtime.js'
import { render } from 'preact'
import { atom } from './store/atom'
import { Provider } from './utils/atom'
import { Router } from './components/molecules/Router'
import { Header } from './components/molecules/Header'

function App () {
    return (
        <Provider atom={atom}>
            <Header />
            <Router />
        </Provider>
    )
}

render(<App />, document.body)
