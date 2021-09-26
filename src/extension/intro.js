export function initIntro () {
    const runtime = chrome?.runtime || browser?.runtime
    const bookmarkImage = document.getElementById('intro-bookmark')
    bookmarkImage.src = runtime.getURL('images/bookmark-sample.png')
}
