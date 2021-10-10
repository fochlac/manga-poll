
import { parse, decodeHTMLEntities, extractMostFrequentValue } from '../../common/utils'

export function testLeviathan () {
    const header = document.querySelector('.post-title h1')
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
    const title = Object.keys(titles).sort((title1, title2) => titles[title1] - titles[title2])[0]

    const baseUrl = document.location.href.split('/manga/')[0] + '/manga/'
    const id = document.location.href.replace(baseUrl, '').split('/')[0]
    const url = `${baseUrl}${id}`

    const chapterNumberList = Array.from(document.querySelectorAll('[data-chapter]:not([data-action="bookmark"])'))
        .map((elem) => elem.dataset.chapter.match(/[\d.]+/)[0])
    const chapter = extractMostFrequentValue(chapterNumberList)

    return {
        type: 'leviathan',
        id,
        title,
        url,
        chapter
    }
}
