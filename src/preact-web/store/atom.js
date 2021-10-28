import createAtom from 'tiny-atom'
import { API } from '../../common/api'
import { createSchedule } from '../../common/schedule'
import { getLinkHelpers } from '../../common/settings'
import { hideChapter } from '../../common/urls'
import { getMessagingToken } from '../../web/sw/sw-helper'
import { URL_LIST } from '../constants/routes'
import { db } from '../storage'

const api = API('', db)
const Links = getLinkHelpers(db, api)

export const atom = createAtom({
    isLoading: true,
    route: { key: URL_LIST, params: null }
}, {
    async init ({set, swap, get}) {
        try {
            await Links.fetchLinkUpdate()
        }
        catch (e) {}

        const maxOld = await db.urls.getMaxOld()
        const hide = await db.urls.getHide()
        const sourceList = await db.sources.read()
        const urls = await db.urls.read()
        const link = await db.link.read()
        const settings = await db.settings.local.read()

        swap({
            isLoading: false,
            maxOld,
            hide,
            sources: sourceList.reduce((map, source) => ({...map, [source.id]: source}), {}),
            urls,
            link,
            settings,
            route: get().route
        })

        await api.Urls.read(sourceList.map((source) => source.id), maxOld, hide)
            .then(db.urls.import)

        set({
            urls: await db.urls.read()
        })
    },
    navigate ({ set }, key, params, query) {
        set({
            route: { key, params, query }
        })
    },
    triggerFetch () {
        interval.triggerInstantly()
    },
    async deleteSource ({ set }, id) {
        await db.sources.delete(id)
        set({ sources: await db.sources.read() })
    },
    async hideChapter ({ set }, id) {
        await hideChapter(db, id)
    },
    async incrementMaxOld ({ set }) {
        const maxOld = await db.urls.getMaxOld()
        db.urls.setMaxOld(maxOld + 100)
        set({ maxOld: maxOld + 100 })
    }
})

atom.observe((atom) => {
    console.log('changed', atom.get())
})

atom.dispatch('init')

const interval = createSchedule({
    callback: async () => {
        await Links.fetchLinkUpdate()

        const maxOld = await db.urls.getMaxOld()
        const hide = await db.urls.getHide()
        const sources = await db.sources.read()
        await api.Urls.read(sources.map((source) => source.id), maxOld, hide)
            .then(db.urls.import)
    },
    interval: 60 * 1000,
    isActive: true,
    updater: (lastPing, nextPing) => {
        const { fetchTime } = atom.get()
        if (!fetchTime?.lastPing || fetchTime.lastPing !== lastPing || fetchTime.nextPing !== nextPing) {
            atom.set({
                fetchTime: { lastPing, nextPing }
            })
        }
    }
})

db.onChange(async (changes) => {
    await Links.pushLinkUpdate(changes)
    if (['hide', 'hiddenChapters'].some(Object.prototype.hasOwnProperty.bind(changes))) {
        navigator.serviceWorker.controller.postMessage('CLEAR_MESSAGES')
    }
    if (['hide', 'hiddenChapters', 'urls'].some(Object.prototype.hasOwnProperty.bind(changes))) {
        atom.set({ urls: await db.urls.read() })
    }
    if (Object.keys(changes).some((change) => change.includes('sources'))) {
        const settings = await db.settings.local.read()

        if (settings.notifications) {
            const sources = await db.sources.read()
            api.Subscription.subscribe(sources.map((source) => source.id), await getMessagingToken())
        }
        const sourceList = await db.sources.read()
        atom.set({ sources: sourceList.reduce((map, source) => ({...map, [source.id]: source}), {}) })
        interval.triggerInstantly()
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'maxOld')) {
        atom.set({ maxOld: changes.maxOld })
        interval.triggerInstantly()
    }
})
