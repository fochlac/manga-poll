export function sourceRenderer (db) {
    const hideAll = document.getElementById('hide')
    const addSection = document.getElementById('addSection')
    const importSection = document.querySelector('div.import')
    const popupTitle = document.getElementById('popupTitle')
    const bookmarks = document.getElementById('add')
    const urls = document.getElementById('urls')
    const sources = document.getElementById('sources')

    sources.addEventListener('click', (event) => {
        const closest = event.target.closest('.row .action.delete')
        if (closest && closest.dataset['id'] && sources.contains(closest)) {
            db.sources.delete(closest.dataset['id'])
            closest.classList.remove('action')
        }
    })

    bookmarks.addEventListener('click', () => {
        if (sources.style.display !== 'block') {
            sources.style.display = 'block'
            importSection.style.display = 'flex'
            addSection.style.display = 'flex'
            urls.style.display = 'none'
            hideAll.style.display = 'none'
            popupTitle.innerText = 'Bookmarks'
            bookmarks.innerText = 'Chapters'
        }
        else {
            sources.style.display = 'none'
            importSection.style.display = 'none'
            addSection.style.display = 'none'
            urls.style.display = ''
            bookmarks.innerText = 'Bookmarks'
            hideAll.style.display = ''
            popupTitle.innerText = 'Chapters'
        }
    })

    async function renderSources () {
        const data = await db.sources.read()

        sources.innerHTML = data
            .sort((source1, source2) => String(source1.title).localeCompare(source2?.title))
            .map((source) => {
                if (!source) {
                    return ''
                }
                const url = String(source.url).replace('/wp-admin/admin-ajax.php', '').replace(/https?:\/\//, '')
                return (
                    `<li class="row source">
                        <div class="data" title="${`${source.title} (${url})`}">
                            <span class="title">${source.title}</span>
                            <span class="manga-id">(${url})</span>
                        </div>
                        <span class="delete action" data-id="${source.id}">Delete</span>
                    </li>`
                )
            })
            .join('\n')
    }

    return {
        render: () => renderSources()
    }
}
