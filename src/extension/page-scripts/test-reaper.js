export function testReaper () {
    const title = document.querySelector('main h2, main .container h1')?.innerText?.trim()
    const url = window.location.pathname.match(/^\/comics\/[^/]*/)?.[0]
    const chapter = /(\d+)/.exec(document.querySelector('main .fixed h1')?.innerText || '')?.[1]

    return {
        type: 'reaper',
        id: url ? url.split('/')[2] : null,
        title,
        url: url ? `${window.location.origin}${url}` : null,
        chapter
    }
}
