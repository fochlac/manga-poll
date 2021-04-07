import 'regenerator-runtime/runtime.js'
import { testBookmark } from './bookmark'
import { addImportHandlers } from '../common/import'
import { db } from './storage'
import { urlRenderer } from '../common/urls'
import { sourceRenderer } from '../common/sources'

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

addImportHandlers(db)

Urls.render()
Sources.render()
    .then(testBookmark)
