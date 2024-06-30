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

    // if (
    //     document.documentElement.innerHTML.includes('ts-breadcrumb bixbox') ||
    //     document.querySelector('.readingnavtop .backseries a, .headpost .allc a, #content .hentry .thumb img')
    // ) {
    //     controller.runtime.sendMessage({
    //         action: 'SOURCES'
    //     }, (response) => {

    //     })
    // }
    // else if (window.location.host.includes('reaperscans.com')) {

    // }
}

if (window?.sessionStorage) {
    sessionStorage.setItem('hasMangaScout', 1)
}

if (location.href.includes('manga.fochlac.com') || location.href.includes('localhost:43214')) {
    chrome.storage.sync.get('link', ({link}) => {
        sessionStorage.setItem('MangaScoutLinkKey', link?.key || 'unlinked')
    })
}

function runOnce (fn) {
    let hasRun = false
    return (...args) => {
        if (!hasRun) {
            hasRun = true
            fn(...args)
        }
    }
}

const startup = runOnce(test)

document.addEventListener('DOMContentLoaded', () => startup())
setTimeout(() => startup(), 1500)
