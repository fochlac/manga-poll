export function registerMenuListeners () {
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

    const openChapters = () => {
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

    chapters.addEventListener('click', openChapters)

    bookmarks.addEventListener('click', () => {
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

    settings.addEventListener('click', () => {
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
    })

    openChapters()
}
