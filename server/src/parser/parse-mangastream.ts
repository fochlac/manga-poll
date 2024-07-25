import { parseNAgoDateString } from '../utils/parse'
import { createParser } from './generic-parser'

const TYPE = 'mangastream'

export const mangastream = createParser({
    TYPE,
    selectSeriesEntries: ($) => $('a.series:has(h4)'),
    getSeriesUrl: ($, elem) => $(elem).attr('href'),
    getSeriesTitle: ($, elem) => $(elem).attr('title'),
    getMangaId: ({ url }) => url?.split('/').filter((str) => str.trim().length).slice(-1)[0],
    getChapters: ({$, elem, host}) => {
        const chapters = $(elem).parent().find('li').toArray()
        return chapters.map((li) => {
            const link = $(li).find('a')
            const url = link.attr('href')
            const rawChapter = link.text()
            const rawDate = parseNAgoDateString($(li).find('span').text())

            return {
                url,
                chapter: String(rawChapter).trim().match(/^Chapter ([\d.]+)/)?.[1],
                host,
                created: rawDate
            }
        })
    }
})
