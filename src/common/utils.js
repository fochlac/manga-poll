export function parse (string, fallback) {
    try {
        return JSON.parse(string)
    }
    catch (e) {
        return fallback
    }
}

export function pad (no, length = 2) {
    if (String(no).length > length) {
        return String(no)
    }
    const zeros = Array(length).fill('0').join('')
    return (zeros + no).slice(-length)
}

const ASURA_HOSTS = ['asura.gg', 'nacm.xyz', 'asuratoon.com', 'asuracomics.gg', 'asuracomic.net', 'asurascans.com']

export function isAsuraHost (host = '') {
    return ASURA_HOSTS.includes(String(host).replace(/^www\./, ''))
}

export function getHost (url) {
    const host = url.replace(/https?:\/\//, '').split('/')[0]?.split('.').slice(-2).join('.')

    if (isAsuraHost(host)) {
        return 'asurascans.com'
    }
    return host
}

export function normalizeAsuraUrl (url) {
    if (!url) {
        return url
    }

    let normalizedUrl = String(url).trim()
        .replace(
            /https?:\/\/(?:www\.)?(?:asura\.gg|nacm\.xyz|asuratoon\.com|asuracomics\.gg|asuracomic\.net|asurascans\.com)/i,
            'https://asurascans.com'
        )
        .replace(/\/series\//i, '/comics/')

    normalizedUrl = normalizedUrl.replace(
        /(https?:\/\/asurascans\.com\/comics\/[^/?#]+)-([a-z0-9]{8})(?=(?:\/)?(?:[?#].*)?$)/i,
        '$1-'
    )

    return normalizedUrl
}

export function normalizeAsuraMangaId (mangaId) {
    if (!mangaId) {
        return mangaId
    }

    return String(mangaId).replace(/-([a-z0-9]{8})$/, '-')
}

export function normalizeAsuraChapter (url, chapter) {
    const chapterFromUrl = String(url || '').match(/\/chapter\/([\d.]+)/)?.[1]
    return chapterFromUrl || chapter
}

export function createUrlId (url) {
    return `${url.host}--${url.sourceId}--${String(url.chapter ?? '').replace(/[\s()]*/g, '')}`
}

export function normalizeSource (source) {
    if (!source || source.type !== 'asura') {
        return source
    }

    return {
        ...source,
        url: normalizeAsuraUrl(source.url),
        mangaId: normalizeAsuraMangaId(source.mangaId)
    }
}

export function normalizeUrl (url) {
    if (!url) {
        return url
    }

    const shouldNormalize = isAsuraHost(url.host) || isAsuraHost(getHost(url.url || ''))
    if (!shouldNormalize) {
        return url
    }

    const normalizedChapter = normalizeAsuraChapter(url.url, url.chapter)
    return {
        ...url,
        url: normalizeAsuraUrl(url.url),
        host: 'asurascans.com',
        chapter: normalizedChapter,
        id: url.sourceId ? createUrlId({
            ...url,
            host: 'asurascans.com',
            chapter: normalizedChapter
        }) : url.id
    }
}

export function randomId (length = 20) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const cutoff = Math.floor(Math.random() * length * 9 + 1)
    return Array(length * 12).fill(0)
        .map(() => alphabet.charAt(Math.floor(Math.random() * alphabet.length)))
        .slice(cutoff, cutoff + length)
        .join('')
}

export function extractMostFrequentValue (valueList) {
    const valueMap = valueList
        .reduce((valueMap, value) => {
            if (!value?.length) {
                return valueMap
            }
            if (!valueMap[value]) {
                valueMap[value] = 0
            }
            valueMap[value]++

            return valueMap
        }, {})

    return Object.keys(valueMap)
        .sort((v1, v2) => valueMap[v2] - valueMap[v1])[0]
}

export function executeOnce (cb) {
    let marked = false
    return () => {
        if (!marked) {
            marked = true
            return cb()
        }
    }
}

export function decodeHTMLEntities (str) {
    if (str && typeof str === 'string') {
        const element = document.createElement('div')
        str = str.replace(/<script[^>]*>([\S\s]*?)(<\/[^>]*>|$)/gmi, '')
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
        element.innerHTML = str
        return element.textContent
    }
    return str
}
