import { pad } from './utils'

export function urlRenderer (db) {
    const urls = document.getElementById('urls')
    const hideAll = document.getElementById('hide')

    hideAll.addEventListener('click', () => {
        db.urls.hideAll(Date.now())
    })

    async function hide (id) {
        const { newUrls } = await db.urls.read()
        if (newUrls.length <= 1 && (!newUrls[0] || newUrls[0].id === id)) {
            db.urls.hideAll(Date.now())
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
            event.preventDefault()
            await hide(closestLink.dataset['id'])
            window.open(closestLink.href, '_blank')
        }
        const closestMore = event.target.closest('.action.load-more')
        if (closestMore && urls.contains(closestMore)) {
            const maxOld = await db.urls.getMaxOld()
            await db.urls.setMaxOld(maxOld + 100)
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
    })

    function createUrlRenderer (isOld) {
        return (chapter) => {
            const date = new Date(chapter.created)
            const result = String(chapter.url).match(/^https?:\/\/.*\/([^/]*hapter[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/) || []
            const timeString = `${pad(date.getHours())}:${pad(date.getMinutes())}`
            const dateString = `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${String(date.getFullYear()).slice(-2)}`
            const fullDate = date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0] ? timeString : dateString

            return `
                <li class="row${isOld ? ' old' : ' new'}">
                    <a class="link" href="${chapter.url}" target="_blank" rel="noopener" data-id="${chapter.id}">
                        ${chapter.title} - Chapter ${result[2]}
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
        const { newUrls, oldUrls } = await db.urls.read()
        const newRows = newUrls.map(createUrlRenderer(false))
        const oldRows = oldUrls.map(createUrlRenderer(true))

        if (newRows.length || oldRows.length) {
            urls.innerHTML = newRows
                .concat('<li class="old-chapters">Old Chapters</li>')
                .concat(oldRows.slice(0, maxOld))
                .concat(oldRows.length >= maxOld ? ['<li class="action load-more">Load up to 100 more old chapters...</li>'] : [])
                .join('\n')
            document.title = newRows.length ? `(${newRows.length}) Manga Poll` : 'Manga Poll'
        }
        else {
            urls.innerHTML = '<li class="row">No Chapters available.</li>'
            document.title = 'Manga Poll'
        }
    }

    return {
        render: () => renderUrls()
    }
}
