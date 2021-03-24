import regeneratorRuntime from "regenerator-runtime"
import { pad } from './utils'
import * as db from './db'
import { testBookmark } from "./bookmark"
import './import'

const hideAll = document.getElementById("hide");
const popupTitle = document.getElementById("popupTitle");
const bookmarks = document.getElementById("add");
const urls = document.getElementById("urls");
const sources = document.getElementById("sources");

let maxOld = 25

hideAll.addEventListener("click", () => {
    chrome.storage.sync.set({
        hide: Date.now(),
        hiddenChapters: '{}'
    })
});

urls.addEventListener("click", async (event) => {
    const closestHide = event.target.closest('.row .hide')
    if (closestHide && closestHide.dataset["id"] && urls.contains(closestHide)) {
        db.addHiddenChapter(closestHide.dataset["id"])
    }
    const closestLink = event.target.closest('.row.new .link')
    if (closestLink && closestLink.dataset["id"] && urls.contains(closestLink)) {
        event.preventDefault()
        await db.addHiddenChapter(closestLink.dataset["id"])
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
        db.deleteSource(closest.dataset["id"])
        closest.classList.remove('action')
    }
});

bookmarks.addEventListener("click", () => {
    if (sources.style.display !== 'block') {
        sources.style.display = 'block'
        urls.style.display = 'none'
        hideAll.style.display = 'none'
        popupTitle.innerText = 'Bookmarks'
        bookmarks.innerText = 'Chapters'
    }
    else {
        sources.style.display = 'none'
        urls.style.display = ''
        bookmarks.innerText = 'Bookmarks'
        hideAll.style.display = ''
        popupTitle.innerText = 'Chapters'
    }
});

async function writeSources() {
    const data = await db.readSources()

    sources.innerHTML = data
        .sort((source1, source2) => String(source1.title).localeCompare(source2?.title))
        .map((source) => source && (
            `<li class="row source">
                <div class="data">
                    <span class="title">${source.title}</span>
                    <span class="manga-id">(${String(source.url).replace('/wp-admin/admin-ajax.php', '').replace(/https?:\/\//, '')})</span>
                </div>
                <span class="delete action" data-id="${source.id}">Delete</span>
            </li>`
        ))
        .join('\n')
}

function createUrlRenderer(isOld) {
    return (chapter) => {
        const date = new Date(chapter.created);
        const result = String(chapter.url).match(/\/[^\/]*hapter[^\/\d]*(\d*)[^\d\/]*[^\/]*\//) || []
        const timeString = `${pad(date.getHours())}:${pad(date.getMinutes())}`
        const dateString = `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${String(date.getFullYear()).slice(-2)}`
        const fullDate = date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0] ? timeString : dateString

        return `
            <li class="row${isOld ? ' old' : ' new'}">
                <a class="link" href="${chapter.url}" target="_blank" rel="noopener" data-id="${chapter.id}">
                    ${chapter.title} - Chapter ${result[1]}
                </a>
                <span class="date-wrapper">
                <span class="date">${fullDate}</span>
                <span class="hide" data-id="${chapter.id}">Hide</span>
                </span>
            </li>`
    }
}

async function writeUrls() {
    const { newUrls, oldUrls } = await db.getFilteredSortedUrls()
    const newRows = newUrls.map(createUrlRenderer(false))
    const oldRows = oldUrls.map(createUrlRenderer(true))

    if (newRows.length || oldRows.length) {
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
}

chrome.storage.onChanged.addListener(function (changes) {
    if (['hide', 'hiddenChapters', 'urls'].some(changes.hasOwnProperty.bind(changes))) {
        writeUrls()
    }
    if (Object.keys(changes).some(change => change.includes('sources'))) {
        writeSources()
    }
});

writeUrls()
writeSources()
    .then(testBookmark)
