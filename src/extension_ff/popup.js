import 'regenerator-runtime/runtime.js'
import { testBookmark } from '../extension/bookmark'
import { addImportHandlers } from '../common/import'
import { db } from '../extension/storage'
import { urlRenderer } from '../common/urls'
import { sourceRenderer } from '../common/sources'
import { markRefreshed, resisterProgressHandler, updateProgress } from '../common/progress-bar'
import { createSchedule } from '../common/schedule'
import { registerMenuListeners } from '../common/menu'
import { addSettingsHandlers, getLinkHelpers } from '../common/settings'
import { API } from '../common/api'
import { API_ADDRESS } from '../extension/constants'
import { initIntro } from '../extension/intro'
import { renderHostList } from '../common/hosts'

const api = API(API_ADDRESS)

const Links = getLinkHelpers(db, api)

async function fetchUrls () {
    await Links.fetchLinkUpdate()
    const maxOld = await db.urls.getMaxOld()
    const hide = await db.urls.getHide()
    const sources = await db.sources.read()
    await api.Urls.read(sources.map((source) => source.id), maxOld, hide)
        .then(db.urls.import)
}

db.urls.setMaxOld(100)

const Urls = urlRenderer(db)
const Sources = sourceRenderer(db)

db.onChange((changes) => {
    if (['hide', 'hiddenChapters', 'urls'].some(changes.hasOwnProperty.bind(changes))) {
        Urls.render()
    }
    if (Object.keys(changes).some((change) => change.includes('sources')) || Object.prototype.hasOwnProperty.call(changes, 'maxOld')) {
        Sources.render()
    }
})

fetchUrls()
markRefreshed()

const interval = createSchedule({
    callback: () => {
        fetchUrls()
        markRefreshed()
    },
    interval: 60 * 1000,
    isActive: true,
    updater: updateProgress
})

initIntro()
resisterProgressHandler(() => interval.triggerInstantly())
addImportHandlers(db)
addSettingsHandlers(db, api)
registerMenuListeners(db, api)
renderHostList(db, api)

Urls.render()
Sources.render()
    .then(testBookmark)
