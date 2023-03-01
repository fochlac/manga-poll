export function testMangastream () {
    const breadcrumpLink = document.querySelector('ol[itemtype="http://schema.org/BreadcrumbList"] meta[itemprop="position"][content="2"]')
        ?.closest('li')
        ?.querySelector('a')

    const thumbnail = document.querySelector('#content .hentry .thumb img')
    const url = document.querySelector('.readingnavtop .backseries a')?.href || breadcrumpLink?.href
    const id = url?.split('/').filter((str) => str.trim().length).slice(-1)[0]

    if (!breadcrumpLink && thumbnail) {
        return {
            type: 'mangastream',
            url: window.location.href,
            id,
            title: thumbnail.title
        }
    }

    const name = document.querySelector('.headpost .allc a')?.innerText ||
        document.querySelector('.headpost [itemprop="name"]')?.innerText?.split(/( –|\s+chapter)/i)?.[0] ||
        breadcrumpLink.querySelector('span')?.innerText
    const chapter = document.querySelector('.readingnavtop .chpnw, .headpost [itemprop="name"]')?.innerText?.match(/\d+/)?.[0] ||
        window.location.href.split('/')
            .filter((v) => v?.length).pop().toLocaleLowerCase().replace(name.replace(/\s/, '-').toLocaleLowerCase(), '')
            .match(/\d+/)?.[0]

    if (name && url) {
        return {
            type: 'mangastream',
            id,
            title: name,
            url,
            chapter
        }
    }
}
