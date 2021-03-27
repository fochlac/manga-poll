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
