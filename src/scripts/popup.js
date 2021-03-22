let urlDataList = []
let currentSource = null
const hide = document.getElementById("hide");
const bookmark = document.getElementById("bookmark");
const bookmarkTrack = document.getElementById("bookmark-track");
const bookmarkHide = document.getElementById("bookmark-hide");
const bookmarkTitle = document.getElementById("bookmark-title");
const popupTitle = document.getElementById("popupTitle");
const add = document.getElementById("add");
const hideAddSource = document.getElementById("hideAddSource");
const addSection = document.getElementById("addSection");
const urls = document.getElementById("urls");
const title = document.getElementById("title");
const url = document.getElementById("url");
const mangaId = document.getElementById("mangaId");
const submitSource = document.getElementById("submitSource");
const sources = document.getElementById("sources");

const selectorDefaultValue = "li.wp-manga-chapter > a";
let currentUrls = ''
let maxOld = 25
let activeTab

function parse(string, fallback) {
    try {
        return JSON.parse(string)
    }
    catch (e) {
        return fallback
    }
}

function hideChapter(id) {
    return new Promise(resolve => {
        chrome.storage.sync.get(['hiddenChapters'], (result) => {
            hiddenChapters = parse(result.hiddenChapters, {})
            hiddenChapters[id] = true
            chrome.storage.sync.set({ hiddenChapters: JSON.stringify(hiddenChapters) })
            resolve()
        })
    })
}

function deleteSource(id) {
    fetch(`https://manga.fochlac.com/api/sources/${id}`, { method: 'delete' })
        .then((res) => res.json())
        .catch((e) => e)
        .then(() => {
            writeSources()
        })
}

hide.addEventListener("click", () => {
    chrome.storage.sync.set({
        hide: Date.now(),
        hiddenChapters: '{}'
    })
});

bookmarkHide.addEventListener("click", () => {
    bookmark.style.display = 'none'
    bookmarkTitle.innerText = ''
    currentSource = null
});

bookmarkTrack.addEventListener("click", () => {
    bookmark.style.display = 'none'
    bookmarkTitle.innerText = ''
    postSource(currentSource)
    currentSource = null
});

urls.addEventListener("click", async (event) => {
    const closestHide = event.target.closest('.row .hide')
    if (closestHide && closestHide.dataset["id"] && urls.contains(closestHide)) {
        hideChapter(closestHide.dataset["id"])
    }
    const closestLink = event.target.closest('.row.new .link')
    if (closestLink && closestLink.dataset["id"] && urls.contains(closestLink)) {
        event.preventDefault()
        await hideChapter(closestLink.dataset["id"])
        window.open(closestLink.href, '_blank')
    }
    const closestMore = event.target.closest('.action.load-more')
    if (closestMore && urls.contains(closestMore)) {
        maxOld += maxOld
        writeUrls()
    }
});

sources.addEventListener("click", (event) => {
    const closest = event.target.closest('.row .action.delete')
    if (closest && closest.dataset["id"] && sources.contains(closest)) {
        deleteSource(closest.dataset["id"])
        closest.classList.remove('action')
    }
});

add.addEventListener("click", () => {
    if (addSection.style.display !== 'flex') {
        addSection.style.display = 'flex'
        sources.style.display = 'block'
        urls.style.display = 'none'
        hide.style.display = 'none'
        popupTitle.innerText = 'Manga Settings'
        add.innerText = 'Chapters'
        sources.innerHTML = '<li class="row" style="text-align: center;">...loading</li>'
        writeSources()
    }
    else {
        addSection.style.display = 'none'
        sources.style.display = 'none'
        urls.style.display = ''
        add.innerText = 'Manga Settings'
        hide.style.display = ''
        popupTitle.innerText = 'Chapters'
    }
});

function postSource(source) {
    return fetch("https://manga.fochlac.com/api/sources", {
            method: "post",
            body: JSON.stringify(source),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((e) => e)
            .then((body) => {
                writeSources()
                return body
            });
}

submitSource.addEventListener("click", () => {
    if (title.value && url.value && mangaId.value) {
        submitSource.disabled = true;

        postSource({
            title: title.value,
            selector: selectorDefaultValue,
            url: url.value,
            mangaId: mangaId.value,
        })
            .then(() => {
                title.value = "";
                url.value = "";
                mangaId.value = "";
                submitSource.disabled = false;
            });
    }
});

function createOldCheck(hide, hiddenChapters) {
    return (chapter) => {
        if (hide && chapter.created < hide || hiddenChapters[chapter.id]) {
            return true;
        }
        return false;
    }
}

function writeSources() {
    return fetch("https://manga.fochlac.com/api/sources")
        .then((res) => res.json())
        .then((data) => {
            if (data.payload) {
                chrome.storage.local.set({ sources: JSON.stringify(data.payload) })

                const rows = data.payload
                    .sort((source1, source2) => String(source1.title).localeCompare(source2?.title))
                    .map((source) => (
                        `<li class="row source">
                            <div class="data">
                                <span class="title">${source.title}</span>
                                <span class="url" title="${source.url}"><b>Url</b>: ${source.url}</span>
                                <span class="selector"><b>Selector</b>: "${source.selector}"</span>
                                <span class="manga-id"><b>Manga-Id</b>: "${source.mangaId}"</span>
                            </div>
                            <span class="delete action" data-id="${source.id}">Delete</span>
                        </li>`
                    ));

                sources.innerHTML = rows.join('\n')
            }
        })

}

function pad(no) {
    return ('00' + no).slice(-2)
}

function writeUrls() {
    chrome.storage.sync.get(['hiddenChapters', 'hide'], (sync) => {
        chrome.storage.local.get(['urlList'], (local) => {
            const hide = sync.hide || 0
            const hiddenChapters = parse(sync.hiddenChapters, {})
            const urlList = parse(local.urlList, [])

            const checkOld = createOldCheck(hide, hiddenChapters)

            const rows = urlList
                .sort((url1, url2) => {
                    const diff = url2.created - url1.created;
                    if (Math.abs(diff) < 500) {
                        return String(url1).localeCompare(url2);
                    }
                    return diff;
                })
                .map((chapter) => {
                    const date = new Date(chapter.created);
                    const result = String(chapter.url).match(/\/[^\/]*hapter[^\/\d]*(\d*)[^\d\/]*[^\/]*\//) || []
                    const timeString = `${pad(date.getHours())}:${pad(date.getMinutes())}`
                    const dateString = `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${String(date.getFullYear()).slice(-2)}`
                    const fullDate = date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0] ? timeString : dateString
                    const isOld = checkOld(chapter)

                    return {
                        isOld,
                        row: `
                        <li class="row${isOld ? ' old' : ' new'}">
                            <a class="link" href="${chapter.url}" target="_blank" rel="noopener" data-id="${chapter.id}">
                                ${chapter.title} - Chapter ${result[1]}
                            </a>
                            <span class="date-wrapper">
                            <span class="date">${fullDate}</span>
                            <span class="hide" data-id="${chapter.id}">Hide</span>
                            </span>
                        </li>`
                    };
                });

            const [oldRows, newRows] = rows.reduce(([oldRows, newRows], row) => {
                if (row.isOld) {
                    oldRows.push(row.row)
                }
                else {
                    newRows.push(row.row)
                }
                return [oldRows, newRows]
            }, [[], []])

            if (rows.length) {
                urls.innerHTML = newRows
                    .concat(`<li class="old-chapters">Old Chapters</li>`)
                    .concat(oldRows.slice(0, maxOld))
                    .concat(oldRows.length > maxOld ? [
                        `<li class="action load-more">Load ${Math.min(maxOld, oldRows.length - maxOld)} more old chapters...</li>`
                    ] : [])
                    .join("\n");
                document.title = newRows.length ? `(${newRows.length}) Manga Poll` : "Manga Poll";
            } else {
                urls.innerHTML = '<li class="row">No Chapters available.</li>';
                document.title = "Manga Poll";
            }
        })
    })
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'sync' && ['hide', 'hiddenChapters', 'urls'].some(changes.hasOwnProperty.bind(changes))) {
        writeUrls()
    }
});

function isSaveable() {

}

writeUrls()
writeSources()
    .then(() => {
        chrome.tabs.query(
            { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
            (tabs) => chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, function: test })
        )
    })

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
        const sources = await new Promise((resolve) => {
            chrome.storage.local.get(['sources'], (local) => {
                resolve(parse(local.sources, []))
            })
        })

        if (!sources.some((source) => source.url === request.url && String(source.mangaId) === String(request.id))) {
            bookmark.style.display = 'flex'
            bookmarkTitle.innerText = `Do you want to start tracking "${request.title}"?`
            currentSource = {
                mangaId: request.id,
                title: request.title,
                url: request.url,
                selector: selectorDefaultValue
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