
export function getHost (url) {
    return url.replace(/https?:\/\//, '').split('/')[0]?.split('.').slice(-2).join('.')
}
