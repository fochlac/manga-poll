/* eslint-disable max-lines */
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

import { getUrlKey } from './utils/keys'

puppeteer.use(StealthPlugin())

declare global {
    interface ChapterResult {
        urls: Partial<Url>[]
        oldUrls?: Partial<Url>[]
        sourceInfo?: {
            imageUrl?: string
            description?: string
            update?: Partial<Source>
        }
        warnings?: (string | number)[][]
        warning?: never,
        source?: Source
    }

    interface Parser {
        type: string
        fetchFunction: (source: Source, urls: Record<string, Url>) => Promise<ChapterResult>
        fetchFrontPageFunction?: (sources: Source[], urls: Record<string, Url>) => Promise<ChapterResult[]>
        parseLink: (body: string) => Promise<Partial<Source>>
        parseCondition: (body: string) => boolean | Promise<boolean>
    }
}

const defaultType = 'madara'
const parserMap: Record<string, Parser['fetchFunction']> = {}
const parserMapFront: Record<string, Parser['fetchFrontPageFunction']> = {}
const linkParserList: Partial<Parser>[] = []
let defaultLinkParser: Parser['parseLink']

export function registerParser ({ type, fetchFunction, parseLink, parseCondition, fetchFrontPageFunction }: Parser) {
    if (typeof fetchFunction !== 'function') {
        console.log(`Error registering parser for type '${type}': invalid fetch function.`)
    }
    parserMap[type] = fetchFunction
    if (typeof fetchFrontPageFunction === 'function') {
        parserMapFront[type] = fetchFrontPageFunction
    }
    linkParserList.push({ parseLink, parseCondition, type })
    if (type === defaultType) {
        defaultLinkParser = parseLink
    }
    console.log(`Registered parser for type '${type}'.`)
}

export function fetchChapterList (source: Source, urls: Record<string, Url>): Promise<ChapterResult> {
    const type = source.type || defaultType
    const fetchFunction = parserMap[source.type]
    if (!fetchFunction) {
        throw Error(`No fetch function for parser type '${type}'.`)
    }
    return fetchFunction(source, urls)
}

export function fetchFrontPage (type: string, sources: Source[], urls: Record<string, Url>): Promise<ChapterResult[]> {
    const fetchFunction = parserMapFront[type || defaultType]
    if (!fetchFunction) {
        throw Error(`No fetch function for parser type '${type}'.`)
    }
    return fetchFunction(sources, urls)
}

export async function parseSourceLink (link) {
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

export function checkSourceType (type) {
    return !!parserMap[type]
}

export function isFrontPageFetchSupported (type) {
    return !!parserMapFront[type || defaultType]
}

export const testForCloudFlare = (text, status) => {
    if (
        text.includes('id="challenge-form"') ||
        text.includes('<title>Please Wait... | Cloudflare</title>') ||
        (status > 400 && text.toLowerCase().includes('cloudflare') && text.includes('form id="challenge-form"'))
    ) {
        throw new Error('Cloudflare-JS-Challenge detected.')
    }

    if (
        text.includes('<title>Attention Required! | Cloudflare</title>') ||
        (text.includes('Access denied') && text.includes('Cloudflare')) ||
        text.includes('id="cf-bubbles"')
    ) {
        throw new Error('Cloudflare-Captcha detected.')
    }
}

export async function getResponseBody (response): Promise<string> {
    const body = await response.text()
    testForCloudFlare(body, response.status)

    if (response.status >= 300) {
        throw new Error(`Unable to get chapter page with response code "${response.status}".`)
    }

    return body
}

let puppeteerInstance
export async function startPuppeteer () {
    if (!puppeteerInstance) {
        puppeteerInstance = puppeteer.launch({ args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu'
        ], headless: true })
    }
    await puppeteerInstance
}
export async function closePuppeteer () {
    if (puppeteerInstance) {
        const browser = await puppeteerInstance
        await browser.close()
        puppeteerInstance = undefined
    }
}

let queue = Promise.resolve()
export function queuePuppeteerFetch (url) {
    if (!puppeteerInstance) {
        console.log(`Cloudflare detected for ${url}.`)
        return ''
    }
    console.log(`Cloudflare detected for ${url}. Queueing fetch via puppeteer.`)
    const promise = queue
        .then(() => fetchWithPuppeteer(url))
    queue = promise.then((str) => {
        if (str?.length) {
            console.log(`Fetched ${url} via puppeteer.`)
        }
        else {
            console.log(`Error fetching ${url} via puppeteer.`)
        }
    }).catch((e) => console.log(e))
    return promise
}

export async function fetchWithPuppeteer (url): Promise<string> {
    if (!puppeteerInstance) {
        console.log('Puppeteer inactive, skipping request for ' + url)
        return ''
    }

    const browser = await puppeteerInstance
    const page = await browser.newPage()
    try {
        await page.goto(url)
        await page.waitForFunction(
            () => {
                // eslint-disable-next-line no-undef
                const text = document.body.innerHTML
                if (
                    text.includes('<title>Please Wait... | Cloudflare</title>') ||
                    (text.toLowerCase().includes('cloudflare') && text.includes('form id="challenge-form"'))
                ) {
                    return false
                }
                else if (
                    text.includes('<title>Attention Required! | Cloudflare</title>') ||
                    (text.includes('Access denied') && text.includes('Cloudflare')) ||
                    text.includes('id="cf-bubbles"')
                ) {
                    return false
                }
                return true
            },
            { timeout: 10000 }
        )
        // eslint-disable-next-line no-undef
        const body = await page.evaluate(() => document.body.innerHTML)
        await page.close()
        return body
    }
    catch (e) {
        await page.close()
        return ''
    }
}
export const headers = {
    accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    dnt: '1',
    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

export function parse (string, fallback = undefined) {
    try {
        return JSON.parse(string)
    }
    catch (e) {
        return fallback
    }
}

export function decodeHTMLEntities (str) {
    if (str && typeof str === 'string') {
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
        const $ = cheerio.load(`<div>${str}</div>`)
        return $('div').text()
    }
    return str
}

export function joinUrl (...str) {
    const raw = str.join('/') + '/'
    const [protocol, ...urlSegments] = raw.split(/\/+/g)

    return `${protocol}//${urlSegments.filter((seg) => seg?.length).join('/')}`
}

export function createSource (
    type: string,
    mangaId: string,
    title: string,
    url: string,
    imageUrl?: string,
    description?: string
) {
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
    oldUrls: Partial<Url>[]
    newUrls: Partial<Url>[]
    warnings: (string | number)[][]
}
const invalidUrls = {}
export function categorizeRemoteUrls (
    urlList: Partial<Url>[],
    source: Source,
    urls: Record<string, Url>,
    validateUrl?: (url: string) => boolean
): RemoteUrlCategorizationResult {
    const collection: RemoteUrlCategorizationResult = { oldUrls: [], newUrls: [], warnings: [] }
    return urlList.reduce(
        (
            collector: { newUrls: Partial<Url>[]; oldUrls: Partial<Url>[]; warnings: (string | number)[][] },
            url: Partial<Url>
        ) => {
            const isValid =
                url.url &&
                (typeof validateUrl !== 'function' || validateUrl(url.url)) &&
                /^[\d.-]+(\s\(Vol.\s\d+\))?$/.test(String(url.chapter)) &&
                url.host &&
                url.host.length > 0
            const key = getUrlKey(url, source.id)
            const stored = urls[key]

            if (isValid && !stored) {
                collector.newUrls.push(url)
            }
            else if (
                isValid &&
                stored &&
                (stored.url !== url.url || (!stored.chapter && url.chapter)) &&
                stored.created < url.created
            ) {
                collector.oldUrls.push(url)
            }
            else if (!stored || !isValid) {
                invalidUrls[url.url] = invalidUrls[url.url] ? invalidUrls[url.url] + 1 : 1
                if (invalidUrls[url.url] < 3 || !(invalidUrls[url.url] % 5)) {
                    collector.warnings.push([
                        key,
                        `Invalid url found for ${source.title}: ${JSON.stringify({ ...url, created: undefined })}`,
                        -1
                    ])
                }
            }

            return collector
        },
        collection
    )
}

let warnedRaw = {}
export async function checkNewUrlAvailability (
    source: Source,
    newUrls: Partial<Url>[],
    validateBody: (body: string) => boolean
) {
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
        await newUrls.reduce(
            (promise, url: Url, index) =>
                promise
                    .then(() => new Promise((resolve) => setTimeout(() => resolve(null), 5000)))
                    .then(async () => {
                        const resp = await fetch(url.url, { headers })
                        const body = await getResponseBody(resp)

                        if (!validateBody(body)) {
                            invalidIndexes.push(index)
                        }
                    }),
            Promise.resolve()
        )

        if (invalidIndexes.length) {
            invalidIndexes.forEach((index) => {
                const url = newUrls[index]
                if (!warned[url.url]) {
                    warnings.push([
                        getUrlKey(url, source.id),
                        `Found url for "${source.title} - Chapter ${url.chapter}" but link doesnt lead to chapter: ${url.url}`,
                        0
                    ])
                    warned[url.url] = true
                    warned[source.id] = true
                }
            })
            const pl = invalidIndexes.length !== 1
            const invalidChapters = invalidIndexes.map((index) => newUrls[index].chapter).join(', ')
            warnings.push([
                newUrls[0].host,
                `Found url${pl ? 's' : ''} for chapter${pl ? 's' : ''} "${invalidChapters}" but ${
                    pl ? 'those urls are' : 'that url is'
                } not published.`,
                -1
            ])
            newUrls = newUrls.filter((url, index) => !invalidIndexes.includes(index))
        }
    }
    if (warned[source.id]) {
        newUrls.forEach((url) => {
            if (warned[url.url]) {
                delete warned[url.url]
                warnings.push([
                    null,
                    `Previously invalid url for "${source.title} - Chapter ${url.chapter}" is now available.`
                ])
            }
        })
    }
    return { newUrls, warnings }
}
