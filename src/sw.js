chrome.alarms.create('refresh', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
    fetchData()
});

function refreshBadge() {
    chrome.storage.sync.get(['hiddenChapters', 'hide'], (sync) => {
        chrome.storage.local.get(['urlList'], (local) => {
            const hide = sync.hide || 0
            const hiddenChapters = parse(sync.hiddenChapters, {})
            const urlList = parse(local.urlList, [])
            const currentUrls = urlList.filter((chapter) => {
                if (hide && chapter.created < hide || hiddenChapters[chapter.id]) {
                    return false;
                }
                return true;
            })
            chrome.action.setBadgeText(
                currentUrls.length
                    ? { text: currentUrls.length >= 100 ? '99+' : String(currentUrls.length) }
                    : { text: '' }
            )
            chrome.action.setTitle({
                title: currentUrls.length
                    ? `${currentUrls.length} chapters available.`
                    : 'No new chapters available.'
            })
        })
    })
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'sync' && ['hide', 'hiddenChapters', 'urls'].some(changes.hasOwnProperty.bind(changes))) {
        refreshBadge()
    }
});

function parse(string, fallback) {
    try {
        return JSON.parse(string)
    }
    catch (e) {
        return fallback
    }
}

function fetchData() {
    fetch("https://manga.fochlac.com/api/urls")
        .then((res) => res.json())
        .then((data) => {
            if (data.payload) {
                chrome.storage.local.get(['urlList'], (local) => {
                    const oldUrlList = parse(local.urlList, [])

                    const urlList = JSON.stringify(data.payload)
                    if (urlList !== oldUrlList) {
                        chrome.storage.local.set({ urlList })
                    }
                })
            }
        })
}

fetchData()
refreshBadge()

