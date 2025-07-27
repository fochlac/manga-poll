export function testAsura () {
    const title = document.querySelector('a[href="/"]+svg+h3,a[href="/series"]+a>h3').innerText
    const url = window.location.pathname.match(/^\/series\/[^/]*/)?.[0].replace(/-([a-z0-9]{8})$/, '-')
    const [chapter, nr] = window.location.pathname.split('/').slice(-2)

    return {
        type: 'asura',
        id: url ? url.split('/')[2] : null,
        title,
        url: url ? `${window.location.origin}${url}` : null,
        chapter: chapter === 'chapter' ? nr : undefined
    }
}
