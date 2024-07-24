/* globals postMessage */
import { closePuppeteer, fetchChapterList, fetchFrontPage, isFrontPageFetchSupported, startPuppeteer } from '../parser'
import { getHost } from '../utils/parse'

import '../parser/parse-fanfox'
import '../parser/parse-madara'
import '../parser/parse-mangadex'
import '../parser/parse-mangastream'
import '../parser/parse-genkan'
import '../parser/parse-leviathan'
import '../parser/parse-webtoons'
import '../parser/parse-reaper'
import '../parser/parse-asura'
import '../parser/parse-flame'

let skip = false
async function fetchAllUrls (sources: Record<string, Source>, urls: Record<string, Url>, allowPuppeteer?: boolean) {
    const results = []
    try {
        let count = 0
        let complete = 0
        let next = 0.1
        const hostDurations:Record<string, { count: number; completed: number; duration: number; host: string; cloudflare?: boolean }> = {}
        const hostCloudFlareMap = {}
        const promiseStack = []
        const frontPageFetches = {}
        if (allowPuppeteer) {
            await startPuppeteer()
        }
        Object.values(sources).forEach((source, index, list) => {
            const host = getHost(source.url)
            hostDurations[host] = hostDurations[host] || { count: 0, completed: 0, duration: 0, host }
            count += 1
            if (isFrontPageFetchSupported(source.type)) {
                if (!frontPageFetches[host]) {
                    frontPageFetches[host] = true
                    hostDurations[host].count += 1
                    const startTime = Date.now()
                    const hostSources = list.filter((source) => host === getHost(source.url))
                    promiseStack.push(() => fetchFrontPage(source.type, hostSources, urls)
                        .then((resultList) => {
                            resultList.forEach(({ source, ...result }) => {
                                results.push({ hasError: false, source, error: null, result })
                            })
                            complete += hostSources.length
                            hostDurations[host].duration += Date.now() - startTime
                            hostDurations[host].completed += 1
                        })
                        .catch((error) => {
                            hostSources.forEach((source) => {
                                results.push({ hasError: true, error, source })
                            })
                            hostDurations[host].duration += Date.now() - startTime
                            hostDurations[host].completed += 1
                        }))
                }
            }
            else {
                hostDurations[host].count += 1
                promiseStack.push(() => {
                    if (skip || hostCloudFlareMap[host]) {
                        hostDurations[host].completed += 1
                        return Promise.resolve()
                    }
                    const startTime = Date.now()
                    const fetchPromise = fetchChapterList(source, urls)
                        .then((result) => ({ hasError: false, source, error: null, result }))
                        .catch((error) => ({ hasError: true, error, source }))
                        .then((result) => {
                            results.push(result)
                            if (result.hasError && result.error.message.includes('Cloudflare')) {
                                hostCloudFlareMap[host] = true
                                hostDurations[host].cloudflare = true
                            }
                            hostDurations[host].duration += Date.now() - startTime
                            hostDurations[host].completed += 1
                        })

                    const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 2500))
                    complete += 1
                    if (complete / count >= next) {
                        next += 0.1
                        console.log(`Checked ${complete}/${count} series.`)
                    }

                    return Promise.all([fetchPromise, timeout])
                })
            }
        })

        const threads = !isNaN(Number(process.env.THREADS)) ? Number(process.env.THREADS) : 100
        const starters = promiseStack.slice(0, threads)
        const stack = promiseStack.slice(threads)
        const startNext = () => {
            if (!stack.length) {
                return Promise.resolve()
            }
            const next = stack.shift()
            return next().then(startNext)
        }
        await Promise.all(starters.map((promiseGen) => {
            return promiseGen().then(startNext)
        }))

        console.log('=============================================')
        console.log(Object.values(hostDurations)
            .sort((a, b) => a.host.localeCompare(b.host))
            .map(({count, completed, duration, host}) => `${host}: ${completed}/${count} in ${Math.round(duration / 1000)}s.`)
            .join('\n')
        )
        console.log('=============================================')
    }
    finally {
        await closePuppeteer()
    }

    return results
}

// eslint-disable-next-line no-undef
onmessage = async function (e) {
    if (e.data.type === 'FETCH_ALL' && e.data.sources) {
        const data = await fetchAllUrls(e.data.sources, e.data.urls, e.data.allowPuppeteer)
        postMessage(data)
    }
    else if (e.data.type === 'FORCE_STOP') {
        skip = true
    }
}
