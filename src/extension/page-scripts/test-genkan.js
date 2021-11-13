export function testGenkan () {
    const result = location.href.match(/https?:\/\/.*\/comics\/(\d*)-[-\w\d]*/) || []
    const url = result[0]
    const id = result[1]

    if (!url || !id) {
        return null
    }

    if (/^\d+$/.test(location.href.split('/').slice(-2).join('').replace('.', '').trim())) {
        const title = document.querySelector('.heading h6').textContent.trim()
        const chapter = location.href.split('/').slice(-1)[0]

        return {
            type: 'genkan',
            id,
            title,
            url,
            chapter
        }
    }

    const title = document.querySelector('meta[property*="title"]').content.trim()

    return {
        type: 'genkan',
        id,
        title,
        url
    }
}
