const progress = document.querySelector('#scheduler > .scheduler-bar')

export const updateProgress = (lastPing, nextPing) => {
    const diff = nextPing - lastPing
    const remaining = Date.now() - lastPing

    const percentage = Math.round(remaining / diff * 1000) / 10

    progress.style.width = `${percentage}%`
}
