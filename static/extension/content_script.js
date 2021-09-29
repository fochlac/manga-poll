/* eslint-disable max-lines */
/* global chrome, browser, document, window, URLSearchParams, location, localStorage */
const controller = chrome || browser

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

function testWebtoons () {
    const url = window.location.href.split('/').slice(0, 6).join('/')
    const id = new URLSearchParams(window.location.search).get('title_no')
    const title = document.querySelector('#container .info .subj')?.innerText

    return {
        type: 'webtoon',
        id,
        title,
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
function test () {
    if (window.location.host === 'fanfox.net') {
        result = testFanFox()
    }
    else if (window.location.host.includes('webtoons.com')) {
        result = testWebtoons()
    }
    else if (document.documentElement.innerHTML.includes('Powered by Genkan.')) {
        result = testGenkan()
    }
    else if (document.documentElement.innerHTML.includes('ts-breadcrumb bixbox')) {
        result = testMangastream()
    }
    else if (window.location.host.includes('leviatanscans.com') || window.location.host.includes('immortalupdates.com')) {
        result = testLeviathan()
    }
    else if (window.location.host === 'mangadex.org') {
        result = testMangadex()
    }
    else {
        result = testMadara()
    }

    if (result && result.title && result.url && result.id && result.type && localStorage.getItem(result.url) !== 'hidden') {
        controller.runtime.sendMessage({
            action: 'PAGE_MATCH',
            source: result
        }, (response) => {
            if (response?.action === 'SHOW_BOOKMARK') {
                renderBookmark()
            }
        })
    }
}

function randomID () {
    return String(Math.random() * Date.now()).slice(0, 12).split('').map((no) => 'abcdefghik'.charAt(Number(no))).join('')
}

function renderBookmark () {
    const div = document.createElement('div')
    const id = randomID()
    const id2 = randomID()
    const id3 = randomID()
    const id4 = randomID()
    const id5 = randomID()
    const id6 = randomID()
    div.innerHTML = `
    <style>
        .${id} {
            position: sticky;
            top: 0;
            width: 100%;
            z-index: 1000000000;
            font-family: system-ui;
            color: #000c21;
        }
        .${id} .${id5} {
            display: flex;
            flex-wrap: wrap;
            justify-content: end;
        }
        .${id} .${id2} {
            margin: 0;
            font-size: 16px;
            line-height: 22px;
            background: #ffff8d;
            padding: 4px max(8px, calc(15vw - 60px));
            display: flex;
            justify-content: space-between;
            font-family: system-ui;
        }
        .${id} .${id4} {
            margin-left: auto;
            font-weight: 600;
            color: cornflowerblue;
            cursor: pointer;
            margin-left: 8px;
        }
        .${id} .${id4}:hover {
            color: royalblue;
        }
        .${id} .${id3} {
            font-weight: 500;
            font-style: italic;
        }
        .${id6} .${id2}::before {
            position: absolute;
            content: "";
            width: 14px;
            height: 14px;
            background: #c5c4c4;
            border-radius: 50%;
            top: calc(50% - 7px);
            left: calc(50% + 7px);
            animation: loading2 2s infinite linear;
          }
          
          @keyframes loading {
                0% {
                    left: calc(50% - 14px);
                }
                30% {
                    left: calc(50% + 7px);
                }
                60% {
                    left: calc(50% + 7px);
                }
                90% {
                    left: calc(50% - 14px);
                }
                100% {
                    left: calc(50% - 14px);
                }
            }
            
            @keyframes loading2 {
                0% {
                    left: calc(50% + 7px);
                }
                30% {
                    left: calc(50% + 7px);
                }
                60% {
                    left: calc(50% - 14px);
                }
                90% {
                    left: calc(50% + 7px);
                }
                100% {
                    left: calc(50% + 7px);
                }
            }
  
          .${id6} .${id2}::after {
            position: absolute;
            content: "";
            width: 14px;
            height: 14px;
            background: #4e4e4e;
            border-radius: 50%;
            top: calc(50% - 7px);
            left: calc(50% - 14px);
            animation: loading 2s infinite linear;
          }
          
          .${id6} .${id2} > * {
            visibility: hidden;
          }
        </style>
      <p class="${id2}">
        <span id="bookmark-title">You can bookmark "<span class="${id3}">${result.title}</span>" with Manga-Scout.</span>
        <span class="${id5}">
            <span class="${id4} submit">Bookmark</span>
            <span class="${id4} hide">Hide</span>
        </span>
        </p>
        `
    div.className = id
    div.addEventListener('click', (e) => {
        const closestSubmit = e.target.closest('.submit')
        const closestHide = e.target.closest('.hide')
        if (closestSubmit) {
            div.classList.add(id6)

            controller.runtime.sendMessage({
                action: 'SAVE_BOOKMARK',
                source: {
                    url: result.url,
                    type: result.type,
                    mangaId: result.id,
                    title: result.title
                }
            }, (result) => {
                if (result?.action === 'SAVE_BOOKMARK_SUCCESS') {
                    div.style.display = 'none'
                }
                else if (result?.action === 'SAVE_BOOKMARK_ERROR') {
                    div.classList.remove(id6)
                    closestSubmit.innerText = 'Retry'
                    div.querySelector('#bookmark-title').innerText =
                        'Unable to create bookmark, please retry later and if it keeps failing,' +
                        ' send an email with the time + url to "info@fochlac.com".'
                }
            })
        }
        else if (closestHide) {
            div.style.display = 'none'
            localStorage.setItem(result.url, 'hidden')
        }
    })
    document.body.prepend(div)
}

test()
