
import { db } from './storage'

import { API } from '../common/api'

import { getLinkHelpers } from '../common/settings'

const Api = API('', db)

const Links = getLinkHelpers(db, Api)

export async function fetchUrls () {
    await Links.fetchLinkUpdate()

    const maxOld = await db.urls.getMaxOld()
    const hide = await db.urls.getHide()
    const sources = await db.sources.read()
    await Api.Urls.read(sources.map((source) => source.id), maxOld, hide)
        .then(db.urls.import)
}
