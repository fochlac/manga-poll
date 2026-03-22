import { parseNAgoDateString } from '../utils/parse'
import { createParser } from './generic-parser'

const TYPE = 'asura'
const BASEURL = 'https://asurascans.com'

export const asura = createParser({
    TYPE,
    normalizeTitle: (title) => title.slice(0, 30).replace(/[\W_]+/g, ''),
    selectSeriesEntries: ($) => $('a.font-bold[href^="/comics/"]').filter((_index, elem) => {
        const href = $(elem).attr('href')
        if (!/^\/comics\/[^/]+\/?$/.test(href)) {
            return false
        }

        return $(elem).closest('div.grid.grid-cols-12').find('a[href*="/chapter/"]').length > 0
    }),
    getSeriesUrl: ($, elem) => BASEURL + $(elem).attr('href').replace(/-([a-z0-9]{8})$/, '-'),
    getSeriesTitle: ($, elem) => $(elem).text(),
    getMangaId: ({ url }) => url?.split('/').filter((str) => str.trim().length).slice(-1)[0].replace(/-([a-z0-9]{8})$/, '-'),
    getChapters: ({$, elem, host}) => {
        const chapters = $(elem).closest('div.grid.grid-cols-12').find('a[href*="/chapter/"]').toArray()
        return chapters.map((link) => {
            const path = $(link).attr('href')
            const url = BASEURL + path
            const rawDate = parseNAgoDateString($(link).find('time').text())

            return {
                url,
                chapter: String(path).match(/\/chapter\/([\d.]+)/)?.[1],
                host,
                created: rawDate
            }
        })
    }
})
