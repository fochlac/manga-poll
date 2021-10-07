import { API } from '../../common/api'
import { getHost } from '../../common/utils'
import { API_ADDRESS } from '../shared/constants'
import { db } from '../shared/storage'

const controller = chrome || browser

let currentSource = null

const bookmark = document.getElementById('bookmark')
const bookmarkTrack = document.getElementById('bookmark-track')
const bookmarkTitle = document.getElementById('bookmark-title')

const { Source } = API(API_ADDRESS, db)

bookmarkTrack.addEventListener('click', () => {
    bookmark.classList.remove('error')
    bookmark.classList.add('progress')
    Source.insert(currentSource)
        .then((source) => source && db.sources.add(source))
        .then(() => {
            bookmark.style.display = 'none'
            bookmarkTitle.innerText = ''
            currentSource = null
        })
        .catch(() => {
            bookmark.classList.add('error')
            bookmark.classList.remove('progress')
            bookmarkTrack.innerText = 'Retry'
            bookmarkTitle.innerText = 'Unable to create bookmark, please retry later and if it keeps failing, send an email with the time + url to "info@fochlac.com".'
        })
})

controller.runtime.onMessage.addListener(async (request) => {
    if (request.id && request.title && request.url) {
        const sources = await db.sources.read()

        if (!sources.some((source) => getHost(source.url) === getHost(request.url) && String(source.mangaId) === String(request.id))) {
            bookmark.style.display = 'flex'
            bookmarkTitle.innerText = `Do you want to start tracking "${request.title}"?`
            currentSource = {
                type: request.type,
                mangaId: request.id,
                title: request.title,
                url: request.url
            }
            return
        }
    }

    bookmark.style.display = 'none'
    bookmarkTitle.innerText = ''
    currentSource = null
})

export function testBookmark () {
    controller.tabs.query(
        { active: true, windowId: controller.windows.WINDOW_ID_CURRENT },
        (tabs) => {
            if (tabs[0].url.includes('http://') || tabs[0].url.includes('https://')) {
                if (controller.scripting) {
                    controller.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        files: ['./test-bookmark.js']
                    })
                }
                else if (controller.tabs?.executeScript) {
                    controller.tabs.executeScript(tabs[0].id, {
                        file: './test-bookmark.js'
                    })
                }
            }
        }
    )
}

window.triggerTest = () => testBookmark()
