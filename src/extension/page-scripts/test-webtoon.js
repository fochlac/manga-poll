export function testWebtoons () {
    const url = window.location.href.split('/').slice(0, 6).join('/')
    const id = new URLSearchParams(window.location.search).get('title_no')
    const chapter = new URLSearchParams(window.location.search).get('episode_no')
    const title = document.querySelector('#container .info .subj')?.innerText

    return {
        type: 'webtoon',
        id,
        title,
        url,
        chapter
    }
}
