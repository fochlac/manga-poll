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

export function getHost (url) {
    return url.replace(/https?:\/\//, '').split('/')[0]?.split('.').slice(-2).join('.')
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
