import { API } from '../common/api'
import { API_ADDRESS } from './constants'
import { db } from './storage'

let currentSource = null

const bookmark = document.getElementById('bookmark')
const bookmarkTrack = document.getElementById('bookmark-track')
const bookmarkTitle = document.getElementById('bookmark-title')

const { Source } = API(API_ADDRESS)

bookmarkTrack.addEventListener('click', () => {
    bookmark.style.display = 'none'
    bookmarkTitle.innerText = ''
    Source.insert(currentSource)
        .then((source) => source && db.sources.add(source))
    currentSource = null
})

chrome.runtime.onMessage.addListener(async (request) => {
    if (request.id && request.title && request.url) {
        const sources = await db.sources.read()

        if (!sources.some((source) => source.url.split('/')[2] === request.url.split('/')[2] && String(source.mangaId) === String(request.id))) {
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
    chrome.tabs.query(
        { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
        (tabs) => {
            if (!tabs[0].url.includes('chrome://')) {
                chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, function: test })
            }
        }
    )
}

function test () {
    function decodeHTMLEntities (str) {
        if (str && typeof str === 'string') {
            const element = document.createElement('div')
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
            element.innerHTML = str
            return element.textContent
        }
        return str
    }
    function parse (string, fallback) {
        try {
            return JSON.parse(string)
        }
        catch (e) {
            return fallback
        }
    }

    function testFanFox () {
        const url = window.location.pathname.match(/^\/manga\/[^/]*\//)?.[0]
        const name = document.querySelector('.reader-header-title-1 a:first-child')?.innerText ||
            document.querySelector('.detail-info-right-title-font')?.innerText

        return {
            type: 'fanfox',
            id: url ? url.split('/')[2] : null,
            title: name,
            url: url ? `${window.location.origin}${url}` : null
        }
    }

    function testMangastream () {
        const breadcrumpLink = document.querySelector('ol[itemtype="http://schema.org/BreadcrumbList"] meta[itemprop="position"][content="2"]')
            ?.closest('li')
            ?.querySelector('a')

        if (!breadcrumpLink) {
            return null
        }
        const url = breadcrumpLink.href
        const name = breadcrumpLink.querySelector('span')?.innerText

        return {
            type: 'mangastream',
            id: url?.split('/')[4],
            title: name,
            url
        }
    }

    function testMangadex () {
        if (/title\/[\d-\w]*\/[\d-\w]*/.test(window.location.pathname)) {
            const id = window.location.pathname.split('/')?.[2]
            const name = document.querySelector('.manga-container .title p')?.innerText

            return {
                type: 'mangadex',
                id,
                title: name,
                url: id ? `https://api.mangadex.org/manga/${id}` : null
            }
        }
        else if (/chapter\/[\d-\w]*\/\d*/.test(window.location.pathname)) {
            const link = document.querySelector('a.text-primary[href*="/title/"]')
            const name = link?.innerText
            const id = link?.href.split('/')?.[4]

            return {
                type: 'mangadex',
                id,
                title: name,
                url: id ? `https://api.mangadex.org/manga/${id}` : null
            }
        }
    }

    function testGenkan () {
        const result = location.href.match(/https?:\/\/[^/]*\/comics\/(\d*)-[-\w\d]*/) || []
        const url = result[0]
        const id = result[1]

        if (!url || !id) {
            return null
        }

        if (/^\d+$/.test(location.href.split('/').slice(-2).join('').replace('.', '').trim())) {
            const title = document.querySelector('.heading h6').textContent.trim()
            return {
                type: 'genkan',
                id,
                title,
                url
            }
        }
        else {
            const title = document.querySelector('meta[property*="title"]').content.trim()
            return {
                type: 'genkan',
                id,
                title,
                url
            }
        }
    }

    function testLeviathan () {
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

        return {
            type: 'leviathan',
            id,
            title,
            url
        }
    }

    function testMadara () {
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

        return {
            type: 'madara',
            id,
            title,
            url
        }
    }

    let result

    if (window.location.host === 'fanfox.net') {
        console.log('fanfox')
        result = testFanFox()
    }
    else if (document.documentElement.innerHTML.includes('Powered by Genkan.')) {
        console.log('genkan')
        result = testGenkan()
    }
    else if (document.documentElement.innerHTML.includes('ts-breadcrumb bixbox')) {
        console.log('mangastream')
        result = testMangastream()
    }
    else if (window.location.host.includes('leviatanscans.com') || window.location.host.includes('immortalupdates.com')) {
        console.log('leviathan')
        result = testLeviathan()
    }
    else if (window.location.host === 'mangadex.org') {
        console.log('mangadex')
        result = testMangadex()
    }
    else {
        console.log('madara')
        result = testMadara()
    }

    console.log(result)

    if (result) {
        chrome.runtime.sendMessage(result)
    }
}

window.triggerTest = () => testBookmark()
