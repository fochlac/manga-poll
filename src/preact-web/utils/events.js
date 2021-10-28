export function preventDefault (fn) {
    return (e) => {
        e.preventDefault()
        e.stopPropagation()
        typeof fn === 'function' && fn(e)
    }
}
