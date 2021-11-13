
export function fetchOnce (func) {
    let result
    return async (...args) => {
        if (!result) {
            result = func(...args)
        }
        return result
    }
}
