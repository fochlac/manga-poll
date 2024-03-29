import { getLinkQuery, linkIfUnlinked } from './settings'

export function registerMenuListeners (db, Api) {
    const importSection = document.querySelector('div.import')
    const popupTitle = document.getElementById('popupTitle')
    const bookmarks = document.getElementById('add')
    const urls = document.getElementById('urls')
    const chapters = document.getElementById('chapters')
    const addSection = document.getElementById('addSection')
    const sources = document.getElementById('sources')
    const settings = document.getElementById('settings')
    const settingsSection = document.querySelector('.settings')
    const progress = document.querySelector('#progress')
    const intro = document.getElementById('intro')

    const openChapters = () => {
        db.sources.read()
            .then((sources) => {
                intro.style.display = sources.length ? 'none' : 'flex'
            })
        sources.style.display = 'none'
        importSection.style.display = 'none'
        addSection.style.display = 'none'
        settingsSection.style.display = 'none'
        urls.style.display = ''
        progress.style.display = ''
        chapters.style.display = 'none'
        settings.style.display = ''
        bookmarks.style.display = ''
        popupTitle.innerText = 'Chapters'
    }

    const openSettings = () => {
        intro.style.display = 'none'
        sources.style.display = 'none'
        importSection.style.display = 'none'
        addSection.style.display = 'none'
        progress.style.display = 'none'
        settingsSection.style.display = ''
        urls.style.display = 'none'
        popupTitle.innerText = 'Settings'
        bookmarks.style.display = ''
        chapters.style.display = ''
        settings.style.display = 'none'
    }

    chapters.addEventListener('click', openChapters)

    bookmarks.addEventListener('click', () => {
        intro.style.display = 'none'
        sources.style.display = 'block'
        importSection.style.display = 'flex'
        addSection.style.display = 'flex'
        settingsSection.style.display = 'none'
        progress.style.display = 'none'
        urls.style.display = 'none'
        popupTitle.innerText = 'Bookmarks'
        bookmarks.style.display = 'none'
        chapters.style.display = ''
        settings.style.display = ''
    })

    settings.addEventListener('click', openSettings)

    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('pages')) {
        openSettings()
        setTimeout(() => document.getElementById('hosts').scrollIntoView(true), 200)
    }
    else if (getLinkQuery()) {
        openSettings()
        linkIfUnlinked(db, Api)
    }
    else {
        openChapters()
    }
}
