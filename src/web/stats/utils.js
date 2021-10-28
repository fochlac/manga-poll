const warningIcon = document.querySelector('.warning')

export function date (date) {
    const dateRaw = new Date(date).toISOString().split('T')[0]
    const [y, m, d] = dateRaw.split('-')
    return `${d}.${m}.${y.slice(-2)}`
}

export function time (date) {
    const dateRaw = new Date(date).toTimeString()
    const [h, m] = dateRaw.split(':')
    return `${h}:${m}`
}

export function getIcon (classes = []) {
    const icon = warningIcon.cloneNode(true)
    classes = Array.isArray(classes) ? classes : [classes]
    classes.forEach((className) => className && icon.classList.add(className))
    return icon.outerHTML
}

export function mergeWarnings (w1 = {count: 0, warnings: []}, w2 = {count: 0, warnings: []}) {
    return {
        count: (w1.count || 0) + (w2.count || 0),
        warnings: (w1.warnings || []).reduce((warnings, warning) => {
            if (!warnings.includes(warning)) {
                warnings.push(warning)
            }
            return warnings
        }, [...w2.warnings] || [])
    }
}

export function mergeWarningCollections (wc1 = {}, wc2 = {}) {
    return Object.keys(wc1).reduce((combi, date) => {
        if (combi[date]) {
            combi[date] = mergeWarnings(wc1[date], combi[date])
        }
        else {
            combi[date] = wc1[date]
        }
        return combi
    }, {...wc2})
}
