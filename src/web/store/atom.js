import createAtom from 'tiny-atom'
import { API } from '../../common/api'
import { createSchedule } from '../../common/schedule'
import { getLinkHelpers } from '../../common/settings'
import { hideChapter } from '../../common/urls'
import { getMessagingToken } from '../utils/sw'
import { URL_LIST } from '../constants/routes'
import { db } from '../storage'

const api = API('', db)
const Links = getLinkHelpers(db, api)

export const atom = createAtom(
    {
        isLoading: true,
        route: { key: URL_LIST, params: null }
    },
    {
        async init ({ dispatch }) {
            await dispatch('initStore')

            try {
                await Links.fetchLinkUpdate()
            }
            catch (e) {}
        },
        async initStore ({swap, get}) {
            const hide = await db.urls.getHide()
            const sourceList = await db.sources.read()
            const urls = await db.urls.read()
            const settings = await db.settings.local.read()
            const link = await db.link.read()

            swap({
                isLoading: false,
                maxOld: 150,
                hide,
                sources: sourceList.reduce((map, source) => ({ ...map, [source.id]: source }), {}),
                urls,
                link,
                settings,
                route: get().route
            })
        },
        navigate ({ set }, key, params, query) {
            set({
                route: { key, params, query }
            })
        },
        overlay ({ set, get }, overlay) {
            set({
                route: { ...get().route, overlay }
            })
        },
        triggerFetch () {
            interval.triggerInstantly()
        },
        async connectToLink ({dispatch}, linkId) {
            const linkResult = await api.Link.read(linkId)
            if (linkResult?.valid) {
                await db.link.set(linkResult.payload)
                await db.link.setLocal(linkResult.payload)
                await dispatch('initStore')
            }
            else {
                throw new Error('Invalid link-id.')
            }
        },
        async createNewLink (_atom) {
            const link = await db.link.read()
            if (!link) {
                const linkData = await db.link.local()
                const newLinkResult = await api.Link.insert(linkData)
                if (newLinkResult?.valid) {
                    const link = newLinkResult.payload
                    await db.link.set(link)
                }
            }
        },
        async fetchHosts ({set}) {
            const hosts = await api.Hosts.read()
            set({
                hosts: hosts.payload
            })
        },
        async unlinkAccount () {
            await db.link.set(null)
        },
        async fetchSourceChapters (_atom, sourceId) {
            const sourceUrls = await api.Urls.read(
                [sourceId], undefined, undefined, 10000
            )
            const { newUrls, oldUrls } = await db.urls.read()
            const merged = [...newUrls, ...oldUrls, ...sourceUrls].reduce((map, url) => {
                map[url.id] = url
                return map
            }, {})
            return db.urls.import(Object.values(merged))
        },
        async subscribeNotifications ({ get }, messagingToken) {
            const settings = await db.settings.local.read()
            const sourceKeyList = Object.keys(get().sources)

            db.settings.local.set({
                ...settings,
                notifications: true
            })
            await api.Subscription.subscribe(
                sourceKeyList,
                messagingToken
            )
        },
        async unsubscribeNotifications ({ get }, messagingToken) {
            const settings = await db.settings.local.read()
            const sourceKeyList = Object.keys(get().sources)

            db.settings.local.set({
                ...settings,
                notifications: false
            })
            await api.Subscription.unsubscribe(
                sourceKeyList,
                messagingToken
            )
        },
        async deleteSource ({ set }, id) {
            await db.sources.delete(id)
        },
        async hideChapter (_atom, id) {
            await hideChapter(db, id)
        },
        async incrementMaxOld ({ set }) {
            const maxOld = await db.urls.getMaxOld()
            db.urls.setMaxOld(maxOld + 100)
            set({ maxOld: maxOld + 100 })
        }
    }
)

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
        const freshUrls = await api.Urls.read(
            sources.map((source) => source.id),
            maxOld,
            hide,
            2
        )
        const { newUrls, oldUrls } = await db.urls.read()
        const merged = [...newUrls, ...oldUrls, ...freshUrls].reduce((map, url) => {
            map[url.id] = url
            return map
        }, {})
        return db.urls.import(Object.values(merged))
    },
    interval: 60 * 1000,
    isActive: true,
    updater: (lastPing, nextPing) => {
        const { fetchTime } = atom.get()
        if (!fetchTime?.lastPing || fetchTime?.lastPing !== lastPing || fetchTime?.nextPing !== nextPing) {
            atom.set({
                fetchTime: { lastPing, nextPing }
            })
        }
    }
})

db.onChange(async (changes) => {
    await Links.pushLinkUpdate(changes)
    if (['hide', 'hiddenRegistry'].some(Object.prototype.hasOwnProperty.bind(changes))) {
        navigator.serviceWorker.controller.postMessage('CLEAR_MESSAGES')
    }
    if (['hide', 'hiddenRegistry', 'urls'].some(Object.prototype.hasOwnProperty.bind(changes))) {
        atom.set({ urls: await db.urls.read() })
    }
    if (Object.keys(changes).some((change) => change.includes('sources'))) {
        const settings = await db.settings.local.read()

        if (settings.notifications) {
            const sources = await db.sources.read()
            api.Subscription.subscribe(
                sources.map((source) => source.id),
                await getMessagingToken()
            )
        }
        const sourceList = await db.sources.read()
        atom.set({ sources: sourceList.reduce((map, source) => ({ ...map, [source.id]: source }), {}) })
        interval.triggerInstantly()
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'maxOld')) {
        atom.set({ maxOld: changes.maxOld })
        interval.triggerInstantly()
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'localSettings')) {
        atom.set({ settings: await db.settings.local.read() })
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'link')) {
        atom.set({ link: await db.link.read() })
    }
})
