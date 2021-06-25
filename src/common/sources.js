export function sourceRenderer (db) {
    const sources = document.getElementById('sources')

    sources.addEventListener('click', (event) => {
        const closest = event.target.closest('.row .action.delete')
        if (closest && closest.dataset['id'] && sources.contains(closest)) {
            db.sources.delete(closest.dataset['id'])
            closest.classList.remove('action')
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
