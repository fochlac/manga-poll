import cheerio from 'cheerio'
import FormData from 'form-data'
import fetch from 'node-fetch'
import { registerParser } from '../parser'
import { logWarning } from '../stats'
import { getUrlKey, getUrls, updateUrl } from '../url-storage'
import fs from 'fs'
import path from 'path'

const TYPE = 'madara'

const headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "dnt": "1",
    "sec-ch-ua": '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
}

const dateMonthFirst = /^[^\d]*(1[012]|0\d|\d)[^\d](3[0,1]|[012]\d|\d)[^\d](\d{2}|\d{4})[^\d]*$/
const dateDayFirst = /^[^\d]*(3[0,1]|[012]\d|\d)[^\d](1[012]|0\d|\d)[^\d](\d{2}|\d{4})[^\d]*$/
const monthWritten = /^[^\d]*[A-Za-z]{2,10}.{1,2}(3[0,1]|[012]\d|\d)[^\d]{1,3}\d{2}|\d{4}[^\d]*$/

function getDateType(urlList) {
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

function parseDates(urlList, type) {
    return urlList.map((url) => {
        const baseDate = new Date()
        baseDate.setHours(0, 0, 0, 0)
        let created = baseDate.getTime()
        const { date } = url

        if (type === 'monthWritten' && typeof date === 'string' && date.trim().length && new Date(date.trim()).toJSON()) {
            created = new Date(date.trim()).getTime()
        }
        else if (typeof date === 'string' && date.length && type === 'dateDayFirst') {
            const [_full, day, month, year]: string[] = date.trim().match(dateDayFirst) || []
            if (month && day && year) {
                const date = new Date()
                date.setFullYear(Number(year.length === 2 ? `20${year}` : year), Number(month) - 1, Number(day))
                date.setHours(0, 0, 0, 0)
                created = date.getTime()
            }
        }
        else if (typeof date === 'string' && date.length && type === 'dateMonthFirst') {
            const [_full, month, day, year]: string[] = date.trim().match(dateMonthFirst) || []
            if (month && day && year) {
                const date = new Date()
                date.setFullYear(Number(year.length === 2 ? `20${year}` : year), Number(month) - 1, Number(day))
                date.setHours(0, 0, 0, 0)
                created = date.getTime()
            }
        }

        return {
            ...url,
            created
        }
    })
}

function parseMadara(source: Source, body) {
    const $ = cheerio.load(body)
    const host = source.url.split('/')[2].split('.').slice(-2).join('.')

    const urlList = $('li.wp-manga-chapter > a').toArray().map((elem) => {
        const url = $(elem).attr('href')
        const result = String(url).match(/^https?:\/\/([^/]*)\/.*\/([^/]*hapter[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/) || []
        return {
            host,
            chapter: result[3],
            url,
            date: $(elem).closest('.wp-manga-chapter').find('.chapter-release-date').text()
        }
    })

    if (!urlList?.length) {
        logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0)
        return []
    }

    const newUrls = urlList.filter((url) => {
        const isValid = /^https?:\/\/.*\/([^/]*hapter[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/.test(url.url)
        const key = getUrlKey(url, source.id)
        const stored = getUrls()[key]

        if (!isValid && !stored) {
            logWarning(key, `Invalid url found for ${source.title}: ${JSON.stringify(url)}`)
        }
        if (isValid && stored) {
            updateUrl(source, url)
        }

        return isValid && !stored
    })

    const type = getDateType(urlList)
    return parseDates(newUrls, type)
}

function parse(string, fallback = undefined) {
    try {
        return JSON.parse(string)
    }
    catch (e) {
        return fallback
    }
}

const idRegex = /["']?manga_id["']?:\s?["']?(\d{2,10})["']?/g

function decodeHTMLEntities(str) {
    if (str && typeof str === 'string') {
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
        const $ = cheerio.load(`<div>${str}</div>`)
        return $('div').text()
    }
    return str
}

async function parseMadaraPage(rawUrl: string) {
    const sourcehtml: string = await fetch(rawUrl, { headers }).then(res => res.text())
    const $ = cheerio.load(sourcehtml)

    const ids = [
        ...(sourcehtml.match(idRegex) || []).map((str) => idRegex.exec(str)?.[1]),
        $('.rating-post-id').val(),
        $('.wp-manga-action-button[data-post]').first().data('post'),
        $('.chapter-selection[data-manga]').first().data('manga'),
        $('#manga-chapters-holder').data('id'),
        $('#manga-reading-nav-head').data('id'),
        $('#manga-reading-nav-foot').data('id')
    ]
        .filter((id) => !!id && String(id).length)
        .reduce((map, id) => {
            map[id] = typeof map[id] === 'number' ? map[id] + 1 : 1
            return map
        }, {})

    const mangaId = Object.keys(ids).sort((id1, id2) => ids[id1] - ids[id2])[0]

    const titles = [
        Array.from($('script[type="application/ld+json"]'))
            .map((script) => parse($(script).text())?.headline).find((h) => h),
        $('#chapter-heading').text().split(' - ')[0],
        $('.post-title h1').contents().filter((index, el) => el.nodeType === 3).text(),
        $('.rate-title').attr('title')
    ]
        .filter((title) => !!title && String(title).length)
        .reduce((map, title) => {
            const clean = decodeHTMLEntities(title).trim()
            map[clean] = typeof map[clean] === 'number' ? map[clean] + 1 : 1
            return map
        }, {})
    const title = Object.keys(titles).sort((title1, title2) => titles[title1] - titles[title2])[0]

    let url = null
    if (rawUrl.includes('leviatanscans.com')) {
        url = rawUrl.split('/').slice(0, 6).join('/')
    }
    else {
        url = rawUrl.match(/https?:\/\/[^/]*\/[^/]*\/[^/]*\//)?.[0]
    }

    return {
        type: TYPE,
        mangaId,
        title,
        url
    }
}

async function fetchMadara(source: Source) {
    let body
    try {
        if (source.url.includes('leviatanscans.com')) {
            body = await fetch(source.url.slice(0, 10) + (source.url.slice(10) + '/ajax/chapters').replace(/\/\//g, '/'), { method: 'post', headers }).then((res) => res.text())
            return parseMadara(source, body)
        }
        const formData = new FormData()
        formData.append('action', 'manga_get_chapters')
        formData.append('manga', source.mangaId)
        const baseurl = source.url.match(/https?:\/\/[^/]*\//)?.[0]
        
        body = await fetch(`${baseurl}wp-admin/admin-ajax.php`, { method: 'post', body: formData, headers }).then((res) => res.text())

        if (body.includes('Access denied') && body.includes('Cloudflare')) {
            throw Error('Cloudflare-blockage detected.')
        }

        if (body.length < 1000) {
            body = await fetch(source.url, { headers }).then((res) => res.text())
        }

        return parseMadara(source, body)
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.')
        logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${err?.message || 'Unknown Error.'}`, 0)
        return []
    }
}

const madara = {
    fetchFunction: fetchMadara,
    type: TYPE,
    parseLink: parseMadaraPage,
    parseCondition: () => false
}

export const MADARA = TYPE
registerParser(madara)