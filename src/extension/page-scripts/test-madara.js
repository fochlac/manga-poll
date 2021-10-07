import { decodeHTMLEntities, extractMostFrequentValue } from './utils'

export function testMadara () {
    function parse (string, fallback) {
        try {
            return JSON.parse(string)
        }
        catch (e) {
            return fallback
        }
    }

    const ids = [
        window?.manga?.manga_id,
        document.querySelector('.rating-post-id')?.value,
        document.querySelector('.wp-manga-action-button')?.dataset?.['post'],
        document.querySelector('.chapter-selection')?.dataset?.['manga'],
        document.getElementById('manga-chapters-holder')?.dataset?.['id'],
        document.querySelector('.bookmark')?.dataset?.['id'],
        document.getElementById('manga-reading-nav-head')?.dataset?.['id'],
        document.getElementById('manga-reading-nav-foot')?.dataset?.['id']
    ]
        .filter((title) => title)
        .reduce((map, id) => {
            map[id] = typeof map[id] === 'number' ? map[id] + 1 : 1
            return map
        }, {})
    const id = Object.keys(ids).sort((id1, id2) => ids[id1] - ids[id2])[0]

    const header = document.querySelector('.post-title h1') || document.querySelector('h1.entry-title')
    const titles = [
        Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
            .map((script) => parse(script.innerText)?.headline).find((h) => h),
        document.getElementById('chapter-heading')?.innerText?.split(' - ')[0],
        header && Array.from(header.childNodes).reduce((title, node) => title + (node.nodeType === 3 ? node.textContent : ''), ''),
        document.querySelector('.rate-title')?.title
    ]
        .filter((title) => title)
        .reduce((map, title) => {
            const clean = decodeHTMLEntities(title).trim()
            map[clean] = typeof map[clean] === 'number' ? map[clean] + 1 : 1
            return map
        }, {})
    let title = Object.keys(titles).sort((title1, title2) => titles[title1] - titles[title2])[0]

    let url = null
    if (document?.location?.href) {
        url = document.location.href.match(/https?:\/\/[^/]*\/[^/]*\/[^/]*\//)?.[0]
    }
    if (document.location.href.includes('reaperscans.com')) {
        url = document.location.href.match(/http.*\/series\/[^/]*\//)?.[0]
        title = title.split(' – ')[0]
    }

    const chapterNumberList = Array.from(document.querySelectorAll('[data-chapter]:not([data-action="bookmark"])'))
        .map((elem) => elem.dataset.chapter.match(/[\d.]+/)[0])
    const chapter = extractMostFrequentValue(chapterNumberList)

    return {
        type: 'madara',
        id,
        title,
        url,
        chapter
    }
}
