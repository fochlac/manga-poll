import { parse, randomId } from './utils'

const NAMESPACES = {
    SYNC: 'sync',
    LOCAL: 'local'
}

export function createDB (storage) {
    const { read, write } = storage

    async function readSources () {
        const { sources } = await read(NAMESPACES.LOCAL, { sources: null })
        return sources || []
    }

    function writeSources (sources) {
        return write(NAMESPACES.LOCAL, { sources })
    }

    async function addSource (source) {
        const sources = await readSources()
        if (!sources.some(({ url, mangaId }) => source.url === url && mangaId === source.mangaId)) {
            sources.push(source)
            await writeSources(sources)
        }
        return sources
    }

    async function deleteSource (sourceId) {
        const sources = await readSources()
        const newSources = sources.filter((source) => source?.id !== sourceId)
        await writeSources(newSources)

        return newSources
    }

    async function isDirty () {
        const { urls, sources } = await read(NAMESPACES.LOCAL, ['urls', 'sources'])

        return !!urls || !!sources
    }

    async function getFilteredSortedUrls () {
        const { hide } = await read(NAMESPACES.SYNC, { hide: 0 })
        const { urls } = await read(NAMESPACES.LOCAL, { urls: '[]' })

        const hiddenChapters = await readHiddenChapters()
        const urlList = parse(urls, [])

        const checkOld = (chapter) => {
            if (hide && chapter.created < hide || hiddenChapters[chapter.id]) {
                return true
            }
            return false
        }

        const [oldUrls, newUrls] = Object.values(urlList)
            .sort((url1, url2) => {
                const diff = url2.created - url1.created
                if (Math.abs(diff) < 500) {
                    return String(url2.chapter).localeCompare(url1.chapter)
                }
                return diff
            })
            .reduce(([oldUrls, newUrls], url) => {
                if (checkOld(url)) {
                    oldUrls.push(url)
                }
                else {
                    newUrls.push(url)
                }
                return [oldUrls, newUrls]
            }, [[], []])

        return {
            oldUrls,
            newUrls
        }
    }

    async function readHiddenChapters () {
        const { hiddenRegistry } = await read(NAMESPACES.LOCAL, { hiddenRegistry: '["hiddenChapters"]' })
        const registry = await parse(hiddenRegistry, ['hiddenChapters'])
        const list = Array.isArray(registry) ? registry : registry.list
        const storeDefaultMap = list.reduce((storeDefaultMap, store) => {
            storeDefaultMap[store] = '{}'
            return storeDefaultMap
        }, {})

        const result = await read(NAMESPACES.LOCAL, storeDefaultMap)
        const hiddenChapters = Object.values(result).reduce((hiddenChapters, store) => {
            return {
                ...hiddenChapters,
                ...parse(store, {})
            }
        }, {})
        return hiddenChapters
    }

    async function writeHiddenChapters (hiddenChapters) {
        const stores = [{length: 0}]
        Object.keys(hiddenChapters).forEach((chapter) => {
            const currentStore = stores[stores.length - 1]
            currentStore[chapter] = true
            currentStore.length += chapter.length
            if (currentStore.length > 1500) {
                delete currentStore.length
                stores.push({ length: 0 })
            }
        })
        delete stores[stores.length - 1].length
        const writeObject = stores.reduce((writeObject, store, index) => {
            const name = `hiddenChapters_${index}`
            writeObject.hiddenRegistry.list.push(name)
            writeObject[name] = JSON.stringify(store)
            return writeObject
        }, {hiddenRegistry: {update: Date.now(), list: []}})
        writeObject.hiddenRegistry = JSON.stringify(writeObject.hiddenRegistry)
        console.log(writeObject, ...Object.values(writeObject).map((entry) => entry.length))
        return write(NAMESPACES.LOCAL, writeObject)
    }

    async function hideUrl (id) {
        const hiddenChapters = await readHiddenChapters()
        hiddenChapters[id] = true
        return writeHiddenChapters(hiddenChapters)
    }

    async function hideAllUrls (timestamp) {
        writeHiddenChapters({})
        return write(NAMESPACES.SYNC, { hide: timestamp })
    }

    function writeUrls (urls) {
        return write(NAMESPACES.LOCAL, { urls: JSON.stringify(urls) })
    }

    async function init () {
        const { hide, uid } = await read(NAMESPACES.SYNC, { hide: false, uid: false })
        if (!hide) {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            write(NAMESPACES.SYNC, { hide: today.getTime() })
        }
        if (!uid || uid === 'anon_') {
            let newUid
            const link = await getLink()
            if (link?.key) {
                newUid = link.key
            }
            else {
                newUid = `anon_${randomId()}`
            }
            write(NAMESPACES.SYNC, { uid: newUid })
        }
    }

    async function setMaxOld (maxOld) {
        await write(NAMESPACES.LOCAL, { maxOld })
    }

    async function getMaxOld () {
        const { maxOld } = await read(NAMESPACES.LOCAL, { maxOld: 25 })
        return maxOld
    }

    async function setLink (link) {
        const update = { link }
        if (link) {
            const { key, lastModified } = link
            update.link = {key, lastModified}
        }
        else {
            update.uid = null
        }

        await write(NAMESPACES.SYNC, update)
    }

    async function getLink () {
        const { link } = await read(NAMESPACES.SYNC, ['link'])
        return link
    }

    async function getHide () {
        const { hide } = await read(NAMESPACES.SYNC, { hide: 0 })
        return hide
    }

    async function writeLocalSettings (settings) {
        return write(NAMESPACES.LOCAL, { localSettings: JSON.stringify(settings) })
    }

    async function getLocalSettings () {
        const { localSettings } = await read(NAMESPACES.LOCAL, { localSettings: '{}' })
        return parse(localSettings, {})
    }

    async function getLinkData () {
        const sources = await readSources()
        const { hide } = await read(NAMESPACES.SYNC, { hide: 0 })
        const hiddenChapters = await readHiddenChapters()

        return {
            sources: sources.map((source) => source.id),
            hiddenChapters,
            hide: Number(hide)
        }
    }

    async function setLinkData ({ sources, hiddenChapters, hide, key }) {
        const storedSources = (await readSources()).reduce((ss, source) => source ? ({ ...ss, [source.id]: source }) : ss, {})
        const hasChangedSources = Object.keys(storedSources).length !== sources.length ||
            sources.some(({id, ...linkSource}) => {
                const source = storedSources[id]
                return !source || Object.keys(linkSource).some((attr) => linkSource[attr] !== source[attr])
            })
        const promises = [Promise.resolve()]
        if (hasChangedSources) {
            promises.push(writeSources(sources))
        }
        const settings = await read(NAMESPACES.SYNC, { hide: 0, uid: '' })
        const currentHiddenChapters = await readHiddenChapters()
        if (
            JSON.stringify(currentHiddenChapters) !== JSON.stringify(hiddenChapters) ||
            String(settings.hide) !== String(hide) ||
            String(settings.uid) !== String(key)
        ) {
            promises.push(write(NAMESPACES.SYNC, {
                hide,
                uid: key
            }), writeHiddenChapters(hiddenChapters))
        }

        await Promise.all(promises)
    }

    async function readUid () {
        const { uid } = await read(NAMESPACES.SYNC, { uid: '' })
        return uid
    }

    async function writeUid (newUid) {
        await write(NAMESPACES.SYNC, { uid: newUid })
        return newUid
    }

    init()

    return {
        sources: {
            read: readSources,
            import: writeSources,
            add: addSource,
            delete: deleteSource
        },
        settings: {
            local: {
                read: getLocalSettings,
                set: writeLocalSettings
            },
            uid: {
                read: readUid,
                write: writeUid
            }
        },
        isDirty,
        urls: {
            read: getFilteredSortedUrls,
            hide: hideUrl,
            hideAll: hideAllUrls,
            import: writeUrls,
            setMaxOld,
            getMaxOld,
            getHide
        },
        onChange: storage.addListener,
        link: {
            set: setLink,
            read: getLink,
            local: getLinkData,
            setLocal: setLinkData
        }
    }
}
