export function testMangastream () {
    const breadcrumpLink = document.querySelector('ol[itemtype="http://schema.org/BreadcrumbList"] meta[itemprop="position"][content="2"]')
        ?.closest('li')
        ?.querySelector('a')

    if (!breadcrumpLink) {
        return null
    }
    const url = breadcrumpLink.href
    const name = breadcrumpLink.querySelector('span')?.innerText
    const chapter = window.location.href.split('/')
        .filter((v) => v?.length)
        .pop()
        .toLocaleLowerCase()
        .replace(name.replace(/\s/, '-').toLocaleLowerCase(), '')
        .match(/\d+/)?.[0]

    return {
        type: 'mangastream',
        id: url?.split('/')[4],
        title: name,
        url,
        chapter
    }
}
