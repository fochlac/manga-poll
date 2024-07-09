import { getLinkHelpers } from '../../common/settings'

export async function checkSources (db, Api) {
    const sources = await db.sources.read()
    try {
        await Api.Source.checkSources(sources)
            .then((data) => {
                if (data.isValid && data.payload.hasChanges) {
                    // db.sources.import(data?.sources)
                    console.log(data?.sources)
                }
            })
    }
    catch (e) {
        console.error('Error syncronizing sources.', e)
    }
}

export async function fetchUrls (db, Api) {
    await getLinkHelpers(db, Api).fetchLinkUpdate()
    const maxOld = await db.urls.getMaxOld()
    const hide = await db.urls.getHide()
    const sources = await db.sources.read()
    await Api.Urls.read(sources.map((source) => source.id), maxOld, hide)
        .then(db.urls.import)
}
