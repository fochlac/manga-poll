import cheerio from 'cheerio'
import { getUrls } from './url-controller'

const warned = {}

const dateMonthFirst = /^[^\d]*(1[012]|0\d|\d)[^\d](3[0,1]|[012]\d|\d)[^\d](\d{2}|\d{4})[^\d]*$/
const dateDayFirst = /^[^\d]*(3[0,1]|[012]\d|\d)[^\d](1[012]|0\d|\d)[^\d](\d{2}|\d{4})[^\d]*$/
const monthWritten = /^[^\d]*[A-Za-z]{2,10}.{1,2}(3[0,1]|[012]\d|\d)[^\d]{1,3}\d{2}|\d{4}[^\d]*$/

function getDateType (urlList) {
    const types = urlList.reduce((types, url) => {
        if (dateMonthFirst.test(url?.date || '') || dateDayFirst.test(url?.date || '')) {
            if (dateMonthFirst.test(url?.date || '')) {
                types.dateMonthFirst = Object.prototype.hasOwnProperty.call(types, 'dateMonthFirst') ? types.dateMonthFirst + 1 : 1
            }
            if (dateDayFirst.test(url?.date || '')) {
                types.dateDayFirst = Object.prototype.hasOwnProperty.call(types, 'dateDayFirst') ? types.dateDayFirst + 1 : 1
            }
        }
        else if (monthWritten.test(url?.date || '')) {
            types.monthWritten = Object.prototype.hasOwnProperty.call(types, 'monthWritten') ? types.monthWritten + 1 : 1
        }
        else {
            types.unparsable = Object.prototype.hasOwnProperty.call(types, 'unparsable') ? types.unparsable + 1 : 1
        }
        return types
    }, {})

    return Object.keys(types).reduce((type1, type2) => types[type1] > types[type2] ? type1 : type2, 'unparsable')
}

function parseDates (urlList) {
    const type = getDateType(urlList)

    return urlList.map((url) => {
        let created = new Date()
        created.setHours(0, 0, 0, 0)
        created = created.getTime()
        const { date } = url

        if (type === 'monthWritten' && typeof date === 'string' && date.trim().length && new Date(date.trim()).toJSON()) {
            created = new Date(date.trim()).getTime()
        }
        else if (typeof date === 'string' && date.length && type === 'dateDayFirst') {
            const [_full, day, month, year] = date.trim().match(dateDayFirst) || []
            if (month && day && year) {
                const date = new Date()
                date.setFullYear(Number(year.length === 2 ? `20${year}` : year), Number(month) - 1, Number(day))
                date.setHours(0, 0, 0, 0)
                created = date.getTime()
            }
        }
        else if (typeof date === 'string' && date.length && type === 'dateMonthFirst') {
            const [_full, month, day, year] = date.trim().match(dateMonthFirst) || []
            if (month && day && year) {
                const date = new Date()
                date.setFullYear(Number(year.length === 2 ? `20${year}` : year), Number(month) - 1, Number(day))
                date.setHours(0, 0, 0, 0)
                created = date.getTime()
            }
        }

        return {
            ...url,
            created,
            type: typeof date === 'string' && date.length && type || 'unparsable'
        }
    })
}

export function parseMadaro (source, body) {
    const $ = cheerio.load(body)
    const urlList = $('li.wp-manga-chapter > a').toArray().map((elem) => {
        return {
            url: $(elem).attr('href'),
            date: $(elem).closest('.wp-manga-chapter').find('.chapter-release-date').text()
        }
    })

    const newUrls = urlList.filter(({ url }) => {
        const isValid = /^https?:\/\/.*\/[^/]*hapter[^/\d]*(\d*)[^\d/]*[^/]*\//.test(url)
        if (!warned[url] >= 3) {
            console.log(`Invalid url found for ${source.title}: ${url}`)
            warned[url] = typeof warned[url] === 'number' ? warned[url] + 1 : 0
        }

        return isValid && !getUrls()[url]
    })

    return parseDates(newUrls)
}

