import 'regenerator-runtime/runtime.js'
import { testBookmark } from './bookmark'
import { addImportHandlers } from '../common/import'
import { db } from './storage'
import { urlRenderer } from '../common/urls'
import { sourceRenderer } from '../common/sources'
import { updateProgress } from '../common/progress-bar'
import { createSchedule } from '../common/schedule'

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

navigator.serviceWorker.controller.postMessage('FETCH_CHAPTERS')

createSchedule({
    callback: () => navigator.serviceWorker.controller.postMessage('FETCH_CHAPTERS'),
    interval: 30 * 1000,
    isActive: true,
    updater: updateProgress
})

addImportHandlers(db)

Urls.render()
Sources.render()
    .then(testBookmark)
