export function getUrlKey (url: Partial<Url>, sourceId) {
    const { chapter, host } = url

    return `${host}--${sourceId}--${String(chapter ?? '').replace(/[\s()]*/g, '')}`
}
