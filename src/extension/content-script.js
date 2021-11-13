import { renderBookmark } from './page-scripts/bookmark-banner'
import { extractSource } from './page-scripts/extract-source'
import { trackProgress } from './page-scripts/track-reading-progress'

const controller = chrome || browser

function test () {
    const result = extractSource()

    if (result) {
        controller.runtime.sendMessage({
            action: 'PAGE_MATCH',
            source: result
        }, (response) => {
            if (response?.action === 'SHOW_BOOKMARK' && localStorage.getItem(result.url) !== 'hidden') {
                renderBookmark(result)
            }
            else if (response?.action === 'TRACK_PROGRESS') {
                trackProgress(response.url, response.source)
            }
        })
    }
}

if (window?.sessionStorage) {
    sessionStorage.setItem('hasMangaScout', 1)
}

if (location.href.includes('manga.fochlac.com') || location.href.includes('localhost:43214')) {
    chrome.storage.sync.get('link', ({link}) => {
        sessionStorage.setItem('MangaScoutLinkKey', link?.key || 'unlinked')
    })
}

test()
