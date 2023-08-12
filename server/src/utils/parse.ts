
export function getHost (url) {
    const host = url.replace(/https?:\/\//, '').split('/')[0]?.split('.').slice(-2).join('.')

    if (host === 'asura.gg' || host === 'nacm.xyz') {
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
