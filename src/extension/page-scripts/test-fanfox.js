export function testFanFox () {
    const url = window.location.pathname.match(/^\/manga\/[^/]*\//)?.[0]
    const name = document.querySelector('.reader-header-title-1 a:first-child')?.innerText ||
        document.querySelector('.detail-info-right-title-font')?.innerText
    const chapter = /Ch\.0*(\d)$/.exec(document.querySelector('.reader-header-title-2')?.innerText || '')?.[1]

    return {
        type: 'fanfox',
        id: url ? url.split('/')[2] : null,
        title: name,
        url: url ? `${window.location.origin}${url}` : null,
        chapter
    }
}
