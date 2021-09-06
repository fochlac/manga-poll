export function initIntro () {
    const bookmarkImage = document.getElementById('intro-bookmark')
    bookmarkImage.src = chrome.runtime.getURL('images/bookmark-sample.png')
}
