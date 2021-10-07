import { renderBookmark } from './page-scripts/bookmark-banner'
import { extractSource } from './page-scripts/extract-source'
import { trackProgress } from './page-scripts/track-reading-progress'

const controller = chrome || browser

function test () {
    const result = extractSource()

    if (result && localStorage.getItem(result.url) !== 'hidden') {
        controller.runtime.sendMessage({
            action: 'PAGE_MATCH',
            source: result
        }, (response) => {
            if (response?.action === 'SHOW_BOOKMARK') {
                renderBookmark(result)
            }
            else if (response?.action === 'TRACK_PROGRESS') {
                trackProgress(response.url, response.source)
            }
        })
    }
}

test()
