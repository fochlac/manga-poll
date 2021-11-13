export function preventDefault (fn) {
    return (e) => {
        e.preventDefault()
        e.stopPropagation()
        typeof fn === 'function' && fn(e)
    }
}

export function stopPropagation (fn) {
    return (e) => {
        e.stopPropagation()
        typeof fn === 'function' && fn(e)
    }
}

