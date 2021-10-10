import { decodeHTMLEntities, extractMostFrequentValue } from './utils'

export function testMadara () {
    const id = extractMostFrequentValue([
        window?.manga?.manga_id,
        document.querySelector('.rating-post-id')?.value,
        document.querySelector('.wp-manga-action-button')?.dataset?.['post'],
        document.querySelector('.chapter-selection')?.dataset?.['manga'],
        document.getElementById('manga-chapters-holder')?.dataset?.['id'],
        document.querySelector('.bookmark')?.dataset?.['id'],
        document.getElementById('manga-reading-nav-head')?.dataset?.['id'],
        document.getElementById('manga-reading-nav-foot')?.dataset?.['id']
    ])

    const header = document.querySelector('.post-title h1') || document.querySelector('h1.entry-title')
    let title = extractMostFrequentValue([
        document.querySelector('ol.breadcrumb > li:nth-child(2)')?.innerText,
        Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
            .map((script) => /"headline":\s*"([^"]*)"/.exec(script.innerText)?.[1]).find((h) => h),
        document.getElementById('chapter-heading')?.innerText?.split(' - ')[0],
        header && Array.from(header.childNodes).reduce((title, node) => title + (node.nodeType === 3 ? node.textContent : ''), ''),
        document.querySelector('.rate-title')?.title
    ].map((title) => typeof title === 'string' && decodeHTMLEntities(title).trim()))

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
