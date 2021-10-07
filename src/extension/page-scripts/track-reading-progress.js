const controller = chrome || browser

export function trackProgress (chapter, source) {
    if (chapter && source?.id) {
        setTimeout(() => {
            controller.runtime.sendMessage({
                action: 'MARK_READ',
                source,
                chapter
            })
        }, 1000 * 120)
    }
}
