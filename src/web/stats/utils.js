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
