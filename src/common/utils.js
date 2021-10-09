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

export function randomId (length = 20) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const cutoff = Math.floor(Math.random() * length * 9 + 1)
    return Array(length * 10).fill(0)
        .map(() => Math.floor(Math.random() * alphabet.length + 1))
        .slice(cutoff, cutoff + 20)
        .map((ind) => alphabet.charAt(ind))
        .join('')
}
