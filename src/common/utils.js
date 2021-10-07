export function parse (string, fallback) {
    try {
        return JSON.parse(string)
    }
    catch (e) {
        return fallback
    }
}

export function pad (no) {
    return ('00' + no).slice(-2)
}

export function getHost (url) {
    return url.replace(/https?:\/\//, '').split('/')[0]?.split('.').slice(-2).join('.')
}
