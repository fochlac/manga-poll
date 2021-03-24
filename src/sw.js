import regeneratorRuntime from "regenerator-runtime"
import { Urls } from "./api";
import { getFilteredSortedUrls, isDirty, readSources, writeUrls } from "./db";

const ALARMS = {
    URLS: 'urls'
}

chrome.alarms.create(ALARMS.URLS, { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === ALARMS.URLS) {
        const sources = await readSources()
        Urls.read(sources.map(source => source.id))
            .then(writeUrls)
    }
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
    if (Object.keys(changes).some(change => change.includes('sources'))) {
        refreshUrls()
    }
});
