import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { getUrlKey } from './utils/keys'

declare global {
    interface ChapterResult {
        urls: Partial<Url>[];
        oldUrls?: Partial<Url>[];
        sourceInfo?: {
            imageUrl?: string;
            description?: string;
            update?: Partial<Source>;
        },
        warnings?: (string|number)[][];
        warning?: never;
    }

    interface Parser {
        type: string;
        fetchFunction: (source: Source, urls: Record<string, Url>) => Promise<ChapterResult>;
        parseLink: (body: string) => Promise<Partial<Source>>;
        parseCondition: (body: string) => boolean|Promise<boolean>;
    }
}

const defaultType = 'madara'
const parserMap: Record<string, Parser['fetchFunction']> = {}
const linkParserList: Partial<Parser>[] = []
let defaultLinkParser: Parser['parseLink']

export function registerParser({ type, fetchFunction, parseLink, parseCondition }: Parser) {
    parserMap[type] = fetchFunction
    linkParserList.push({ parseLink, parseCondition, type })
    if (type === defaultType) {
        defaultLinkParser = parseLink
    }
}

export function fetchChapterList(source: Source, urls: Record<string, Url>): Promise<ChapterResult> {
    const type = source.type || defaultType
    const fetchFunction = parserMap[source.type]
    if (!fetchFunction) {
        throw Error(`No fetch function for parser type ${type}.`)
    }
    return fetchFunction(source, urls)
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
    else {
        console.log(`Parsing with parser "${parser.type}".`)
    }

    return parser ? parser.parseLink(link) : defaultLinkParser(link)
}

export function checkSourceType(type) {
    return !!parserMap[type]
}

export async function getResponseBody(response): Promise<string> {
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

export function joinUrl(...str) {
    const raw = str.join('/') + '/'
    const [protocol, ...urlSegments] = raw.split(/\/+/g)

    return `${protocol}//${urlSegments.filter((seg) => seg?.length).join('/')}`
}

export function createSource(type: string, mangaId: string, title: string, url: string, imageUrl?: string, description?: string) {
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
        url,
        imageUrl,
        description
    }
}


interface RemoteUrlCategorizationResult {
    oldUrls: Partial<Url>[], 
    newUrls: Partial<Url>[], 
    warnings: ((string | number)[])[]
}
export function categorizeRemoteUrls(urlList: Partial<Url>[], source: Source, urls:Record<string, Url>, validateUrl?: (url: string) => boolean): RemoteUrlCategorizationResult {
    const collection: RemoteUrlCategorizationResult = {oldUrls: [], newUrls: [], warnings: []}
    return urlList.reduce((collector: {newUrls: Partial<Url>[], oldUrls: Partial<Url>[], warnings: (string | number)[][]}, url: Partial<Url>) => {
        const isValid = url.url && (typeof validateUrl !== 'function' || validateUrl(url.url)) &&
            /^[\d\.-]+$/.test(String(url.chapter)) && url.host && url.host.length > 0
        const key = getUrlKey(url, source.id)
        const stored = urls[key]

        if (isValid && !stored) {
            collector.newUrls.push(url)
        }
        else if (isValid && stored && (stored.url !== url.url || !stored.chapter && url.chapter)) {
            collector.oldUrls.push(url)
        }
        else {
            collector.warnings.push([key, `Invalid url found for ${source.title}: ${JSON.stringify(url)}`, -1])
        }

        return collector
    }, collection)
}

let warnedRaw = {}
export async function checkNewUrlAvailability (source: Source, newUrls: Partial<Url>[], validateBody: (body: string) => boolean) {
    const invalidIndexes = []
    const warnings = []
    const hour = Math.floor(Date.now() / (60 * 60 * 1000))
    if (!warnedRaw[hour]) {
        warnedRaw = {
            [hour]: {}
        }
    }
    const warned = warnedRaw[hour]
    if (newUrls.length < 5) {
        await newUrls.reduce((promise, url: Url, index) => 
            promise
                .then(() => new Promise(resolve => setTimeout(() => resolve(null), 5000)))
                .then(async () => {              
                    const resp = await fetch(url.url, { headers })
                    const body = await getResponseBody(resp)

                    if (!validateBody(body)) {
                        invalidIndexes.push(index)
                    }
                })
        , Promise.resolve())

        if (invalidIndexes.length) {
            invalidIndexes.forEach((index) => {
                const url = newUrls[index]
                if (!warned[url.url]) {
                    warnings.push([getUrlKey(url, source.id), `Found url for "${source.title} - Chapter ${url.chapter}" but link doesnt lead to chapter: ${url.url}`, 0])
                    warned[url.url] = true
                    warned[source.id] = true
                }

            })
            const pl = invalidIndexes.length !== 1
            const invalidChapters = invalidIndexes.map((index) => newUrls[index].chapter).join(', ')
            warnings.push([newUrls[0].host, `Found url${pl ? 's': ''} for chapter${pl ? 's': ''} "${invalidChapters}" but ${pl ? 'those urls are': 'that url is'} not published.`, -1])
            newUrls = newUrls.filter((url, index) => !invalidIndexes.includes(index))
        }
    }
    if (warned[source.id]) {
        newUrls.forEach((url) => {
            if (warned[url.url]) {
                delete warned[url.url]
                warnings.push([null, `Previously invalid url for "${source.title} - Chapter ${url.chapter}" is now available.`])
            }
        })
    }
    return { newUrls, warnings }
}