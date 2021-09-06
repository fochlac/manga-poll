const progress = document.querySelector('#progress')

let locked = false

export const resisterProgressHandler = (updateNow) => {
    progress.addEventListener('click', () => {
        updateNow()
        markRefreshed()
    })
}

export const markRefreshed = () => {
    progress.innerHTML = '(Refreshed!)'
    progress.dataset.before = '(Refreshed!)'
    locked = true
    setTimeout(() => {
        locked = false
        progress.dataset.before = '(Refresh now!)'
    }, 1500)
}

export const updateProgress = (_lastPing, nextPing) => {
    if (!locked) {
        const remaining = nextPing - Date.now()

        const seconds = Math.max(Math.round(remaining / 1000), 0)

        progress.innerHTML = `(Next refresh: ${seconds}s)`
    }
}
