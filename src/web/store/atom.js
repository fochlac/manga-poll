import makeAtom from 'tiny-atom'
import { API } from '../../common/api'
import { createSchedule } from '../../common/schedule'
import { getLinkHelpers } from '../../common/settings'
import { hideChapter } from '../../common/urls'
import { getMessagingToken } from '../utils/sw'
import { routeList, URL_LIST, routes, IMPRESSUM } from '../constants/routes'

export const createAtom = (db, baseUrl = 'https://manga.fochlac.com') => {
    const api = API(baseUrl, db)
    const Links = getLinkHelpers(db, api)

    const getCurrentLocation = () => {
        const match = routeList.find(([url]) => String(location.pathname).toLowerCase() === url)
        if (match) {
            return match[1]
        }
        return URL_LIST
    }
    const overlay = location.search.includes('impressum') ? IMPRESSUM : null
    const initialKey = getCurrentLocation()
    history.replaceState(null, '', routes[initialKey])

    const atom = makeAtom(
        {
            isLoading: true,
            route: { key: initialKey, params: null, overlay }
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
                routes[key] && history.pushState(null, '', routes[key])
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
            async reset () {
                await db.link.set(null)
                await db.urls.import([])
                await db.sources.import([])
                await db.settings.local.set({})
                await db.settings.uid.set()
            },
            async resetAndDeleteAccount () {
                const link = await db.link.read()
                if (link) {
                    await api.Link.delete(link.key)
                }
                await db.link.set(null)
                await db.urls.import([])
                await db.sources.import([])
                await db.settings.local.set({})
                await db.settings.uid.write()
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
            async setTheme (_atom, dark) {
                const settings = await db.settings.local.read()

                db.settings.local.set({ ...settings, dark })
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
            async hideAll (_atom) {
                const { newUrls, oldUrls } = await db.urls.read()
                const lastCreated = (newUrls[0]?.created ?? 0) > (oldUrls[0]?.created ?? 0) ? (newUrls[0]?.created ?? 0) : (oldUrls[0]?.created ?? 0)
                await db.urls.hideAll(lastCreated + 1)
            },
            async incrementMaxOld ({ set }) {
                const maxOld = await db.urls.getMaxOld()
                db.urls.setMaxOld(maxOld + 100)
                set({ maxOld: maxOld + 100 })
            }
        }
    )

    const eventPopstate = 'popstate'
    const eventPushState = 'pushState'
    const eventReplaceState = 'replaceState'
    const eventHashchange = 'hashchange'
    const events = [
        eventPopstate,
        eventPushState,
        eventReplaceState,
        eventHashchange
    ]

    function handleLocationUpdate () {
        atom.set({
            route: { key: getCurrentLocation() }
        })
    }
    for (const event of events) {
        addEventListener(event, handleLocationUpdate)
    }

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

    return atom
}
