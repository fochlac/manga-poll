
import { parseNAgoDateString } from '../utils/parse'
import { createParser } from './generic-parser'

const TYPE = 'flame'

export const flame = createParser({
    TYPE,
    selectSeriesEntries: ($) => $('.info a[href*="/series/"]'),
    getSeriesUrl: ($, elem) => $(elem).attr('href'),
    getSeriesTitle: ($, elem) => $(elem).attr('title'),
    getMangaId: ({ url }) => url?.split('/').filter((str) => str.trim().length).slice(-1)[0],
    getChapters: ({$, elem, host}) => {
        const chapters = $(elem).parent().parent().find('.chapter-list a').toArray()
        return chapters.map((link) => {
            const url = $(link).attr('href')
            const rawChapter = $(link).find('.epxs').text()
            const rawDate = parseNAgoDateString($(link).find('.epxdate').text())

            return {
                url,
                chapter: String(rawChapter).trim().match(/^Chapter ([\d.]+)/)?.[1],
                host,
                created: rawDate
            }
        })
    }
})
