import { pad } from './utils'

export function urlRenderer (db) {
    const urls = document.getElementById('urls')
    const intro = document.getElementById('intro')

    async function hide (id) {
        const { newUrls, oldUrls } = await db.urls.read()
        if (newUrls.length <= 1 && (!newUrls[0] || newUrls[0].id === id)) {
            const latestChapterDate = oldUrls.concat(newUrls)
                .reduce((lcd, url) => url.created > lcd ? url.created : lcd, 0)

            db.urls.hideAll(latestChapterDate + 1)
        }
        else {
            db.urls.hide(id)
        }
    }

    urls.addEventListener('click', async (event) => {
        const closestHide = event.target.closest('.row .hide')

        if (closestHide && closestHide.dataset['id'] && urls.contains(closestHide)) {
            await hide(closestHide.dataset['id'])
        }
        const closestLink = event.target.closest('.row.new .link')
        if (closestLink && closestLink.dataset['id'] && urls.contains(closestLink)) {
            await hide(closestLink.dataset['id'])
            window.open(closestLink.href, '_blank')
        }
        const closestMore = event.target.closest('.action.load-more')
        if (closestMore && urls.contains(closestMore)) {
            const maxOld = await db.urls.getMaxOld()
            await db.urls.setMaxOld(maxOld + 100)
        }
        const hideAll = event.target.closest('.hide-all')
        if (hideAll && urls.contains(hideAll)) {
            await db.urls.hideAll(Date.now())
        }
        const top = event.target.closest('.top')
        if (top && urls.contains(top)) {
            urls.scrollTo({ top: 0, behavior: 'smooth' })
        }
    })

    let maxScroll = 0
    urls.addEventListener('scroll', async () => {
        const scrollHeight = urls.offsetHeight + urls.scrollTop
        if (urls.scrollHeight - scrollHeight <= 50 && maxScroll !== urls.scrollHeight) {
            maxScroll = urls.scrollHeight
            const maxOld = await db.urls.getMaxOld()
            db.urls.setMaxOld(maxOld + 100)
        }
        checkTopButton()
    })

    function checkTopButton () {
        if (urls.scrollTop > 0 && urls.getBoundingClientRect().top === urls.querySelector('.old-chapters').getBoundingClientRect().top) {
            urls.querySelector('.old-chapters .top').style.display = 'inline'
        }
        else {
            urls.querySelector('.old-chapters .top').style.display = 'none'
        }
    }

    function createUrlRenderer (isOld) {
        return (chapter) => {
            const date = new Date(chapter.created)
            const timeString = `${pad(date.getHours())}:${pad(date.getMinutes())}`
            const dateString = `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${String(date.getFullYear()).slice(-2)}`
            const fullDate = date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0] ? timeString : dateString

            return `
                <li class="row${isOld ? ' old' : ' new'}">
                    <a class="link" href="${chapter.url}" target="_blank" rel="noopener" data-id="${chapter.id}">
                        ${chapter.title} - Chapter ${chapter.chapter}
                    </a>
                    <span class="date-wrapper">
                        <span class="date" title="${`${dateString} ${timeString}`}">${fullDate}</span>
                        <span class="hide" data-id="${chapter.id}">Hide</span>
                    </span>
                </li>`
        }
    }

    async function renderUrls () {
        const maxOld = await db.urls.getMaxOld()
        const sources = await db.sources.read()
        const { newUrls, oldUrls } = await db.urls.read()
        const newRows = newUrls.map(createUrlRenderer(false))
        const oldRows = oldUrls.map(createUrlRenderer(true))

        if (!sources.length) {
            urls.innerHTML = ''
            intro.style.display = 'flex'
        }
        else if (newRows.length || oldRows.length) {
            intro.style.display = 'none'
            urls.innerHTML = []
                .concat(newRows.length ? '<li class="new-chapters">New Chapters <span class="action hide-all">Hide all</span></li>' : [])
                .concat(newRows)
                .concat('<li class="old-chapters">Old Chapters <span class="action top">Top &#8593;</span></li>')
                .concat(oldRows.slice(0, maxOld))
                .concat(oldRows.length >= maxOld ? ['<li class="action load-more">Load up to 100 more old chapters...</li>'] : [])
                .join('\n')
            document.title = newRows.length ? `(${newRows.length}) Manga Poll` : 'Manga Poll'
            checkTopButton()
        }
        else {
            intro.style.display = 'none'
            urls.innerHTML = '<li class="row">No Chapters available.</li>'
            document.title = 'Manga Poll'
        }
    }

    return {
        render: () => renderUrls()
    }
}
