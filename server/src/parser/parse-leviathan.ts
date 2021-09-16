import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { registerParser } from '../parser'
import { logWarning } from '../stats'
import { getUrlKey, getUrls, updateUrl } from '../url-storage'

const TYPE = 'leviathan'

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

function parseLeviathan(source: Source, body, url) {
    const $ = cheerio.load(body)
    const host = source.url.split('/')[2].split('.').slice(-2).join('.')
    const baseDate = new Date()
    baseDate.setHours(0, 0, 0, 0)

    const urlList = $('li.wp-manga-chapter > a').toArray().map((elem) => {
        const url = $(elem).attr('href')
        const result = String(url).match(/^https?:\/\/([^/]*)\/.*\/([^/]*hapter[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/) || []
        const date = $(elem).closest('.wp-manga-chapter').find('.chapter-release-date').text()
        const created = typeof date === 'string' && date.trim().length && new Date(date.trim()).toJSON() 
            ? new Date(date.trim()).getTime()
            : baseDate.getTime()
        
        return {
            host,
            chapter: result[3],
            url,
            created
        }
    })

    if (!urlList?.length) {
        logWarning(host, `Invalid chapterlist found for ${source.title} from ${url}: Recieved empty URL-List`, 0)
        return []
    }

    const newUrls = urlList.filter((url) => {
        const isValid = /^https?:\/\/leviatanscans.com\/.*\/([^/]*hapter[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/.test(url.url)
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

    return newUrls
}

function parse(string, fallback = undefined) {
    try {
        return JSON.parse(string)
    }
    catch (e) {
        return fallback
    }
}


function decodeHTMLEntities(str) {
    if (str && typeof str === 'string') {
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
        const $ = cheerio.load(`<div>${str}</div>`)
        return $('div').text()
    }
    return str
}

async function parseLeviathanPage(rawUrl: string) {
    const sourcehtml: string = await fetch(rawUrl, { headers }).then(res => res.text())
    const $ = cheerio.load(sourcehtml)

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

    let url = rawUrl.split('/').slice(0, 6).join('/')
    return {
        type: TYPE,
        mangaId: rawUrl.split('/')[5],
        title,
        url
    }
}

async function fetchLeviathan(source: Source) {
    let body
    let url
    try {
        const baseUrl = await fetch('https://leviatanscans.com/', { headers }).then((res) => res.url)
        url = `${baseUrl}/manga/${source.url.split('/manga/')[1]}/ajax/chapters`
        url = url.slice(0, 10) + url.slice(10).replace(/\/\//g, '/')
        body = await fetch(url, { method: 'post', headers }).then((res) => res.text())
        return parseLeviathan(source, body, url)
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.')
        logWarning(host, `Error fetching chapterlist for ${source.title} from ${url}: ${err?.message || 'Unknown Error.'}`, 0)
        return []
    }
}

const leviathan = {
    fetchFunction: fetchLeviathan,
    type: TYPE,
    parseLink: parseLeviathanPage,
    parseCondition: () => false
}

registerParser(leviathan)