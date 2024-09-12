import cheerio, { AnyNode, Cheerio, CheerioAPI } from 'cheerio'
import fetch from 'node-fetch'
import {
    registerParser,
    headers,
    categorizeRemoteUrls,
    testForCloudFlare,
    queuePuppeteerFetch,
    cloudscrape
} from '../parser'
import { getHost } from '../utils/parse'

interface ParserOptions {
    TYPE: string
    getBaseUrl?: (sources: Source[]) => string
    normalizeTitle?: (title: string) => string
    selectSeriesEntries: ($: CheerioAPI) => Cheerio<AnyNode>
    getSeriesUrl: ($: CheerioAPI, elem: AnyNode) => string
    getSeriesTitle: ($: CheerioAPI, elem: AnyNode) => string
    getMangaId: (options: { $: CheerioAPI; elem: AnyNode; url: string }) => string
    getChapters: (options: { $: CheerioAPI; elem: AnyNode; host: string; url: string }) => Partial<Url>[]
    debug?: boolean
}

export const createParser = ({
    TYPE,
    getBaseUrl = (sources) => sources[0].url.split('/').slice(0, 3).join('/'),
    normalizeTitle = (title) => title.replace(/[\W_]+/g, ''),
    selectSeriesEntries,
    getSeriesUrl,
    getSeriesTitle,
    getMangaId,
    getChapters,
    debug
}: ParserOptions): Parser => {
    const normTitle = (title) => typeof normalizeTitle === 'function' && normalizeTitle(title)

    async function parseFrontPage (
        sources: Source[],
        urls: Record<string, Url>,
        body: string
    ): Promise<ChapterResult[]> {
        const $ = cheerio.load(body)
        const baseDate = new Date()
        baseDate.setHours(0, 0, 0, 0)
        const host = getHost(sources[0].url)
        const trackedSeries: Record<string, Source> = sources.reduce((trackedSeries, source) => {
            const path = source.url.split('/').slice(3).join('/')
            trackedSeries[path] = source
            if (normTitle(source.title)) {
                trackedSeries[normalizeTitle(source.title)] = source
            }
            return trackedSeries
        }, {})

        if (debug) {
            console.log(
                'trackedSeries:\n',
                Object.entries(trackedSeries)
                    .map(([key, series]) => [series.title, key])
                    .join('\n')
            )
        }

        const entries = selectSeriesEntries($).toArray()
        if (debug) console.log('entries', entries.length)

        return entries.reduce((sourceResults, elem) => {
            const url = getSeriesUrl($, elem)

            const title = getSeriesTitle($, elem)
            const path = url.split('/').slice(3).join('/')
            const source = trackedSeries[path] || trackedSeries[normTitle(title)]
            if (debug) console.log('source', source, path, normTitle(title))

            if (source) {
                const mangaId = getMangaId({ $, elem, url })
                let update
                if (source.url !== url || source.title !== title || source.mangaId !== mangaId) {
                    update = {
                        ...source,
                        mangaId,
                        url,
                        title
                    }
                }

                const chapterList = getChapters({ $, elem, host, url })

                const { newUrls, oldUrls, warnings } = categorizeRemoteUrls(chapterList, source, urls)

                sourceResults.push({
                    urls: newUrls,
                    warnings: warnings,
                    oldUrls,
                    source,
                    sourceInfo: update ? { update } : undefined
                })
            }
            return sourceResults
        }, [])
    }

    async function fetchFrontPage (sources: Source[], urls: Record<string, Url>): Promise<ChapterResult[]> {
        if (!sources.length) return []

        try {
            const url = getBaseUrl(sources)
            const response = await fetch(url, { method: 'get', headers })

            let body = await response.text()

            try {
                testForCloudFlare(body, response.status)
            }
            catch (e) {
                body = await queuePuppeteerFetch(url)
                if (body === '') {
                    body = await cloudscrape(url)
                }
            }

            if (!body) return []

            return parseFrontPage(sources, urls, body)
        }
        catch (err) {
            const host = getHost(sources[0].url)
            return sources.map((source) => ({
                urls: [],
                source,
                warnings: [[host, `Error fetching frontpage for ${host}: ${err?.message || 'Unknown Error.'}`, 0]]
            }))
        }
    }

    const parser = {
        fetchFunction: () => null,
        fetchFrontPageFunction: fetchFrontPage,
        type: TYPE
    }

    registerParser(parser)
    return parser
}
