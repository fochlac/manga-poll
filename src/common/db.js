import { parse } from './utils'

const NAMESPACES = {
    SYNC: 'sync',
    LOCAL: 'local'
}

export function createDB (storage) {
    const { read, write } = storage

    async function readSources () {
        const { registry } = await read(NAMESPACES.SYNC, { registry: '["sources-1"]' })
        return parse(registry, ['sources-1'])
            .reduce((sources, key) => {
                return Promise.all([sources, read(NAMESPACES.SYNC, { [key]: '[]' })])
                    .then(([sources, source]) => sources.concat(parse(source[key], [])))
            }, Promise.resolve([]))
    }

    function writeSources (sources) {
        const registry = []
        const updates = {}
        for (let x = 1; x <= Math.max(1, Math.ceil(sources.length / 20)); x++) {
            const key = `sources-${x}`
            registry.push(key)
            updates[key] = JSON.stringify(sources.slice((x - 1) * 20, x * 20))
        }
        updates.registry = JSON.stringify(registry)
        return write(NAMESPACES.SYNC, updates)
    }

    async function addSource (source) {
        const sources = await readSources()
        if (!sources.some(({url, mangaId}) => source.url === url && mangaId === source.mangaId)) {
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
        const { hiddenChapters: hiddenChaptersString, hide } = await read(NAMESPACES.SYNC, { hiddenChapters: '{}', hide: 0 })
        const { urls } = await read(NAMESPACES.LOCAL, { urls: '[]' })

        const hiddenChapters = parse(hiddenChaptersString, {})
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
                    return String(url1).localeCompare(url2)
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

    async function hideUrl (id) {
        const result = await read(NAMESPACES.SYNC, { hiddenChapters: '{}' })
        const hiddenChapters = parse(result.hiddenChapters, {})
        hiddenChapters[id] = true
        return write(NAMESPACES.SYNC, { hiddenChapters: JSON.stringify(hiddenChapters) })
    }

    async function hideAllUrls (timestamp) {
        return write(NAMESPACES.SYNC, { hiddenChapters: '{}', hide: timestamp })
    }

    function writeUrls (urls) {
        return write(NAMESPACES.LOCAL, { urls: JSON.stringify(urls) })
    }

    async function init () {
        const { hide } = await read(NAMESPACES.SYNC, { hide: false })
        if (!hide) {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            await write(NAMESPACES.SYNC, { hide: today.getTime()})
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
        await write(NAMESPACES.SYNC, { link })
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
        const { hiddenChapters: hiddenChaptersString, hide } = await read(NAMESPACES.SYNC, { hiddenChapters: '{}', hide: 0 })
        const hiddenChapters = parse(hiddenChaptersString, {})

        return {
            sources: sources.map((source) => source.id),
            hiddenChapters,
            hide: Number(hide)
        }
    }

    async function setLinkData ({sources, hiddenChapters, hide}) {
        await Promise.all([
            writeSources(sources),
            write(NAMESPACES.SYNC, {
                hiddenChapters: JSON.stringify(hiddenChapters),
                hide
            })
        ])
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
