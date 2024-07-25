import { parseNAgoDateString } from '../utils/parse'
import { createParser } from './generic-parser'

const TYPE = 'reaper'

export const reaper = createParser({
    TYPE,
    selectSeriesEntries: ($) => $('h2:contains(\'Latest Comics\')').parent().find('p > a[href*="/comics/"]'),
    getSeriesUrl: ($, elem) => $(elem).attr('href'),
    getSeriesTitle: ($, elem) => $(elem).text().trim(),
    getBaseUrl: (sources) => `${sources[0].url.split('/').slice(0, 3).join('/')}/latest/comics?page=2`,
    getMangaId: ({ url }) => url?.split('/').filter((str) => str.trim().length).slice(-1)[0],
    getChapters: ({$, elem, host}) => {
        const chapters = $(elem).parent().parent().find('a[href*="/chapters/"]').toArray()
        return chapters.map((linkEl) => {
            const link = $(linkEl)
            const url = link.attr('href')
            const rawChapter = link.contents().not(link.children()).text().trim()
            const rawDate = parseNAgoDateString(link.find('p').text())

            return {
                url,
                chapter: String(rawChapter).trim().match(/^Chapter ([\d.]+)/)?.[1],
                host,
                created: rawDate
            }
        })
    }
})
