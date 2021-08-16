const progress = document.querySelector('#progress')

let locked = false

export const resisterProgressHandler = (updateNow) => {
    progress.addEventListener('click', () => {
        updateNow()
        progress.innerHTML = '(refreshed!)'
        locked = true
        setTimeout(() => {
            locked = false
        }, 1500)
    })
}

export const updateProgress = (_lastPing, nextPing) => {
    if (!locked) {
        const remaining = nextPing - Date.now()

        const seconds = Math.max(Math.round(remaining / 1000), 0)

        progress.innerHTML = `(next refresh: ${seconds}s)`
    }
}
