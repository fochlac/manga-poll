export function decodeHTMLEntities (str) {
    if (str && typeof str === 'string') {
        const element = document.createElement('div')
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
        element.innerHTML = str
        return element.textContent
    }
    return str
}

export function parse (string, fallback) {
    try {
        return JSON.parse(string)
    }
    catch (e) {
        return fallback
    }
}

export function randomID () {
    return String(Math.random() * Date.now()).slice(0, 12).split('').map((no) => 'abcdefghik'.charAt(Number(no))).join('')
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
        .sort((v1, v2) => valueMap[v1] - valueMap[v2])[0]
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
