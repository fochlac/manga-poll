import { parseNAgoDateString } from '../utils/parse'
import { createParser } from './generic-parser'

const TYPE = 'asura'
const BASEURL = 'https://asuracomic.net'

export const asura = createParser({
    TYPE,
    normalizeTitle: (title) => title.slice(0, 30).replace(/[\W_]+/g, ''),
    selectSeriesEntries: ($) => $('a[href*="/series/"]').filter((_index, elem) => {
        if (!/^\/series\/[^/]+\/?$/.test($(elem).attr('href')) || $(elem).html().includes('<img')) {
            return false
        }
        return true
    }),
    getSeriesUrl: ($, elem) => BASEURL + $(elem).attr('href'),
    getSeriesTitle: ($, elem) => $(elem).text(),
    getMangaId: ({ url }) => url?.split('/').filter((str) => str.trim().length).slice(-1)[0],
    getChapters: ({$, elem, host}) => {
        const chapters = $(elem).parent().parent().find('a:has(svg)').toArray()
        return chapters.map((link) => {
            const url = BASEURL + $(link).attr('href')
            const rawChapter = $(link).find('svg').closest('div').text()
            const rawDate = parseNAgoDateString($(link).find('p').text())

            return {
                url,
                chapter: String(rawChapter).trim().match(/^Chapter ([\d.]+)/)?.[1],
                host,
                created: rawDate
            }
        })
    }
})
