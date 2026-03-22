const ASURA_HOSTS = ['asura.gg', 'nacm.xyz', 'asuratoon.com', 'asuracomics.gg', 'asuracomic.net', 'asurascans.com']

export function isAsuraHost (host = '') {
    return ASURA_HOSTS.includes(String(host).replace(/^www\./, ''))
}

export function normalizeAsuraUrl (url?: string) {
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

export function normalizeAsuraMangaId (mangaId?: string) {
    if (!mangaId) {
        return mangaId
    }

    return String(mangaId).replace(/-([a-z0-9]{8})$/, '-')
}

export function getHost (url) {
    const host = url.replace(/https?:\/\//, '').split('/')[0]?.split('.').slice(-2).join('.')

    if (isAsuraHost(host)) {
        return 'asurascans.com'
    }
    return host
}

export function parseNAgoDateString (dateString) {
    const baseDate = new Date()
    baseDate.setHours(0, 0, 0, 0)
    const amount = Number(dateString.match(/\d+/)?.[0])
    if (isNaN(amount)) {
        return baseDate.getTime()
    }
    if (dateString.includes('econd')) {
        return Date.now() - amount * 1000
    }
    if (dateString.includes('inut')) {
        return Date.now() - amount * 60 * 1000
    }
    if (dateString.includes('hour')) {
        return Date.now() - amount * 60 * 60 * 1000
    }
    if (dateString.includes('day')) {
        return Date.now() - amount * 24 * 60 * 60 * 1000
    }
    if (dateString.includes('week')) {
        return Date.now() - amount * 7 * 24 * 60 * 60 * 1000
    }
    const date = new Date()
    if (dateString.includes('onth')) {
        date.setMonth(date.getMonth() - amount)
        return date.getTime()
    }
    if (dateString.includes('ear')) {
        date.setFullYear(date.getFullYear() - amount)
        return date.getTime()
    }

    return baseDate.getTime()
}

export function createAttributeEqualityChecker (obj1, obj2) {
    return (key) => {
        return obj1[key] === obj2[key]
    }
}
