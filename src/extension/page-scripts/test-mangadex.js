export function testMangadex () {
    if (/title\/[\d-\w]*(\/[\d-\w]*|)$/.test(window.location.pathname)) {
        const id = window.location.pathname.split('/')?.[2]
        const name = document.querySelector('.manga-container .title p')?.innerText?.trim()

        return {
            type: 'mangadex',
            id,
            title: name,
            url: id ? `https://api.mangadex.org/manga/${id}` : null
        }
    }
    else if (/chapter\/[\d-\w]*\/\d*/.test(window.location.pathname)) {
        const link = document.querySelector('a.text-primary[href*="/title/"]')
        const name = link?.innerText?.trim()
        const id = link?.href.split('/')?.[4]
        const chapter = document.querySelector('.menu').innerText.match(/Ch. (\d+)/)?.[1]

        return {
            type: 'mangadex',
            id,
            title: name,
            url: id ? `https://api.mangadex.org/manga/${id}` : null,
            chapter
        }
    }
}
