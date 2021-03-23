import regeneratorRuntime from "regenerator-runtime"
import { getFilteredSortedUrls } from "./db";
import { fetchAllUrls } from "./fetch-urls";
chrome.alarms.create('refresh', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
    fetchAllUrls()
});

async function refreshBadge() {
    const { newUrls } = await getFilteredSortedUrls()
    chrome.action.setBadgeText(
        newUrls.length
            ? { text: newUrls.length >= 100 ? '99+' : String(newUrls.length) }
            : { text: '' }
    )
    chrome.action.setTitle({
        title: newUrls.length
            ? `${newUrls.length} chapters available.`
            : 'No new chapters available.'
    })
}

chrome.storage.onChanged.addListener(function (changes) {
    if (['hide', 'hiddenChapters', 'urls'].some(changes.hasOwnProperty.bind(changes))) {
        refreshBadge()
    }
});

fetchAllUrls()
refreshBadge()

