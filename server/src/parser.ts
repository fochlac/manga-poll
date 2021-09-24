import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { logWarning } from './stats'
import { getUrlKey, getUrls, updateUrl } from './url-storage'

declare global {
    interface Parser {
        type: string;
        fetchFunction: (source: Source) => Promise<Partial<Url>[]>;
        parseLink: (body: string) => Promise<Partial<Source>>;
        parseCondition: (body: string) => boolean|Promise<boolean>;
    }
}

const defaultType = 'madara'
const parserMap = {}
const linkParserList = []
let defaultLinkParser

export function registerParser({ type, fetchFunction, parseLink, parseCondition }: Parser) {
    parserMap[type] = fetchFunction
    linkParserList.push({ parseLink, parseCondition })
    if (type === defaultType) {
        defaultLinkParser = parseLink
    }
}

export function fetchChapterList(source: Source) {
    const type = source.type || defaultType
    const fetchFunction = parserMap[source.type]
    if (!fetchFunction) {
        throw Error(`No fetch function for parser type ${type}.`)
    }
    return fetchFunction(source)
}

export async function parseSourceLink(link) {
    let parser
    for (const possibleParser of linkParserList) {
        if (await possibleParser.parseCondition(link)) {
            parser = possibleParser
            break
        }
    }

    if (!parser) {
        console.log(`Could not find parser for url "${link}", using default parser.`)
    }

    return parser ? parser.parseLink(link) : defaultLinkParser(link)
}

export function checkSourceType(type) {
    return !!parserMap[type]
}

export async function getResponseBody(response) {
    const body = await response.text()

    if (body.includes('Access denied') && body.includes('Cloudflare')) {
        throw Error('Cloudflare-blockage detected.')
    }
    if (body.includes('id="cf-bubbles"')) {
        throw Error('(Temporary) Cloudflare-blockage detected.')
    }
    if (response.status >= 300) {
        throw Error(`Unable to get chapter page with response code "${response.status}".`)
    }

    return body
}

export const headers = {
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


export function parse(string, fallback = undefined) {
    try {
        return JSON.parse(string)
    }
    catch (e) {
        return fallback
    }
}


export function decodeHTMLEntities(str) {
    if (str && typeof str === 'string') {
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
        const $ = cheerio.load(`<div>${str}</div>`)
        return $('div').text()
    }
    return str
}

export function createSource(type: string, mangaId: string, title: string, url: string) {
    const missingFields = []
    if (!title) {
        missingFields.push('title')
    }
    if (!url) {
        missingFields.push('url')
    }
    if (!mangaId) {
        missingFields.push('mangaId')
    }
    if (!type) {
        missingFields.push('type')
    }
    if (missingFields.length) {
        throw Error(`Parsing source failed - following fields are empty ${missingFields.join(', ')}.`)
    }
    return {
        type,
        mangaId,
        title,
        url
    }
}

export function createUrlFilter(source, validateUrl?: (url: string) => boolean) {
    return (url: Url) => {
        const isValid = url.url && (typeof validateUrl !== 'function' || validateUrl(url.url)) &&
            /^[\d\.-]*$/.test(String(url.chapter)) && url.host && url.host.length > 0
        const key = getUrlKey(url, source.id)
        const stored = getUrls()[key]

        if (!isValid && !stored) {
            logWarning(key, `Invalid url found for ${source.title}: ${JSON.stringify(url)}`)
        }
        if (isValid && stored) {
            updateUrl(source, url)
        }

        return isValid && !stored
    }
}

let warned = {}
setTimeout(() => {
    warned = {}
}, 1000 * 3600)
export async function checkNewUrlAvailability (source: Source, newUrls: Partial<Url>[], validateBody: (body: string) => boolean) {
    const invalidIndexes = [] 
    if (newUrls.length < 5) {
        await newUrls.reduce((promise, url: Url, index) => {
            return promise.then(async () => {              
                const resp = await fetch(url.url, { headers })
                const body = await getResponseBody(resp)

                if (!validateBody(body)) {
                    invalidIndexes.push(index)
                }
            })
        }, Promise.resolve())

        if (invalidIndexes.length) {
            invalidIndexes.forEach((index) => {
                const url = newUrls[index]
                if (!warned[url.url]) {
                    logWarning(getUrlKey(url, source.id), `Found url for "${source.title} - Chapter ${url.chapter}" but link doesnt lead to chapter: ${url.url}`, 0)
                    warned[url.url] = true
                    warned[source.id] = true
                }
            })
            newUrls = newUrls.filter((url, index) => !invalidIndexes.includes(index))
        }
    }
    if (warned[source.id]) {
        newUrls.forEach((url) => {
            if (warned[url.url]) {
                delete warned[url.url]
                console.log(`Previously invalid url for "${source.title} - Chapter ${url.chapter}"`)
            }
        })
    }
    return newUrls
}