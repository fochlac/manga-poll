export const BOOKMARKS = 'BOOKMARKS'
export const URL_LIST = 'URLS'
export const SETTINGS = 'SETTINGS'
export const IMPRESSUM = 'IMPRESSUM'

export const routes = {
    [BOOKMARKS]: '/stories',
    [URL_LIST]: '/feed',
    [SETTINGS]: '/settings',
    [IMPRESSUM]: '/impressum'
}

export const routeList = Object.keys(routes).map((key) => [routes[key], key])
