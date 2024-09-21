import { parseNAgoDateString } from '../utils/parse'
import { createParser } from './generic-parser'

const TYPE = 'reaper'

export const reaper = createParser({
    TYPE,
    selectSeriesEntries: ($) =>
        $('h1:contains(\'Latest updates on comics\')').parent().find('.grid > .flex a[href*="/series/"]:has(h5)'),
    getSeriesUrl: ($, elem) => `https://reaperscans.com${$(elem).attr('href')}`,
    getSeriesTitle: ($, elem) => $(elem).text().trim(),
    getBaseUrl: (sources) => `${sources[0].url.split('/').slice(0, 3).join('/')}/latest/comics`,
    getMangaId: ({ url }) =>
        url
            ?.split('/')
            .filter((str) => str.trim().length)
            .slice(-1)[0],
    getChapters: ({ $, elem, host, url }) => {
        const chapters = $(elem)
            .parent()
            .find(`a[href*="/series/${url.split('/series/')[1]}/chapter"]`)
            .toArray()
        return chapters.map((linkEl) => {
            const link = $(linkEl)
            const url = link.attr('href')
            const [rawChapter, rawDate] = Array.from(link.find('span'))

            return {
                url,
                chapter: String($(rawChapter).text())
                    .trim()
                    .match(/^Chapter ([\d.]+)/)?.[1],
                host,
                created: parseNAgoDateString($(rawDate).text())
            }
        })
    }
})
