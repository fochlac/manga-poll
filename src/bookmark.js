import { addSource, readSources } from "./db";

let currentSource = null

const bookmark = document.getElementById("bookmark");
const bookmarkTrack = document.getElementById("bookmark-track");
const bookmarkHide = document.getElementById("bookmark-hide");
const bookmarkTitle = document.getElementById("bookmark-title");
const title = document.getElementById("title");
const url = document.getElementById("url");
const mangaId = document.getElementById("mangaId");

bookmarkHide.addEventListener("click", () => {
    bookmark.style.display = 'none'
    bookmarkTitle.innerText = ''
    currentSource = null
});

bookmarkTrack.addEventListener("click", () => {
    bookmark.style.display = 'none'
    bookmarkTitle.innerText = ''
    addSource(currentSource)
    currentSource = null
});


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

function test() {
    function parse(string, fallback) {
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
        document.getElementById('manga-reading-nav-head')?.dataset?.['id'],
        document.getElementById('manga-reading-nav-foot')?.dataset?.['id'],
        document.querySelector('link[rel=shortlink]')?.href?.split('?p=')[1]
    ]
        .filter((title) => title)
        .reduce((map, id) => {
            map[id] = typeof map[id] === 'number' ? map[id] + 1 : 1
            return map
        }, {})
    const id = Object.keys(ids).sort((id1, id2) => ids[id1] - ids[id2])[0]

    const titles = [
        Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
            .map(script => parse(script.innerText)?.headline).find(h => h),
        document.getElementById('chapter-heading')?.innerText?.split(' - ')[0],
        document.querySelector('.post-title h1')?.innerText,
        document.querySelector('.rate-title')?.title
    ]
        .filter((title) => title)
        .reduce((map, title) => {
            map[title] = typeof map[title] === 'number' ? map[title] + 1 : 1
            return map
        }, {})
    const title = Object.keys(titles).sort((title1, title2) => titles[title1] - titles[title2])[0]

    chrome.runtime.sendMessage({ id, title, url: document?.location?.origin ? `${document.location.origin}/wp-admin/admin-ajax.php` : null })
}

chrome.runtime.onMessage.addListener(async (request) => {
    if (request.id && request.title && request.url) {
        const sources = await readSources()

        if (!sources.some((source) => source.url === request.url && String(source.mangaId) === String(request.id))) {
            bookmark.style.display = 'flex'
            bookmarkTitle.innerText = `Do you want to start tracking "${request.title}"?`
            currentSource = {
                mangaId: request.id,
                title: request.title,
                url: request.url
            }
            title.value = currentSource.title;
            url.value = currentSource.url;
            mangaId.value = currentSource.mangaId;
            return
        }
    }

    title.value = "";
    url.value = "";
    mangaId.value = "";
    bookmark.style.display = 'none'
    bookmarkTitle.innerText = ''
    currentSource = null
})