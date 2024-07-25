
import { parseNAgoDateString } from '../utils/parse'
import { createParser } from './generic-parser'

const TYPE = 'mangagalaxy'

export const mangagalaxy = createParser({
    // debug: true,
    TYPE,
    selectSeriesEntries: ($) => $('h1:contains(\'Latest Update\')').parent().parent().find('div.grid > div'),
    getSeriesUrl: ($, elem) => $(elem).find('a:has(img)').attr('href'),
    getSeriesTitle: ($, elem) => $(elem).find('div > img').attr('alt').trim().replace('Cover of ', ''),
    getMangaId: ({ url }) => url?.split('/').filter((str) => str.trim().length).slice(-1)[0],
    getChapters: ({$, elem, host}) => {
        const chapters = $(elem).find('a[href*="chapter"]').toArray()
        return chapters.map((link) => {
            const url = $(link).attr('href')
            const rawChapter = $(link).find('.chapterName').text()
            let rawDate = new Date().setHours(0, 0, 0, 0)
            try {
                rawDate = parseNAgoDateString($(link).find('time').text())
            }
            catch (e) { /** */ }

            return {
                url,
                chapter: String(rawChapter).trim().match(/^Chapter ([\d.]+)/)?.[1],
                host,
                created: rawDate
            }
        })
    }
})
