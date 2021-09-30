import 'regenerator-runtime/runtime.js'
import { testBookmark } from './bookmark'
import { addImportHandlers } from '../common/import'
import { db } from './storage'
import { urlRenderer } from '../common/urls'
import { sourceRenderer } from '../common/sources'
import { markRefreshed, resisterProgressHandler, updateProgress } from '../common/progress-bar'
import { createSchedule } from '../common/schedule'
import { registerMenuListeners } from '../common/menu'
import { addSettingsHandlers } from '../common/settings'
import { API } from '../common/api'
import { API_ADDRESS } from './constants'
import { initIntro } from './intro'
import { renderHostList } from '../common/hosts'
import { fetchUrls } from './fetch-urls'

const Api = API(API_ADDRESS, db)

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

fetchUrls(db, Api)
markRefreshed()

const interval = createSchedule({
    callback: () => {
        fetchUrls(db, Api)
        markRefreshed()
    },
    interval: 60 * 1000,
    isActive: true,
    updater: updateProgress
})

initIntro()
resisterProgressHandler(() => interval.triggerInstantly())
addImportHandlers(db)
addSettingsHandlers(db, Api)
registerMenuListeners(db, Api)
renderHostList(db, Api)

Urls.render()
Sources.render()
    .then(testBookmark)
