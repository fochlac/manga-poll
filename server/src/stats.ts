/* eslint-disable max-lines */
import { resolve } from 'path'
import { getSources, registerSourceChangeCallback } from './source-storage'
import { getUrls } from './url-storage'
import { adminUrl } from './utils/authentication'
import { createWrite, readFile } from './utils/db'
import { getUrlKey } from './utils/keys'
import { getHost } from './utils/parse'
import { debounce } from './utils/timing'

declare global {
    interface Warning {
        date: number
        message: string
    }

    type Stats = Record<string, HostStat>

    interface FailureRates {
        week: number
        day: number
        hour: number
    }

    interface HostInfo {
        name: string
        url: string
        failureRate: FailureRates
    }

    interface SourceStat {
        title: string
        latest: number
        count: number
        chapterWarnings: Warning[]
        failureRate: FailureRates
    }

    interface WarningCollection {
        count: number
        warnings: string[]
    }

    interface HostStat {
        latest: number
        sources: Record<string, SourceStat>
        count: number
        warnings: any
        chapterWarnings: WarningCollection[]
        url: string
        failureRate: FailureRates
    }
}

const warningsPath = resolve(__dirname, '../db/warnings.json')
const blacklistWarningsPath = resolve(__dirname, '../db/warnings-blacklist.json')
const ipStatsPath = resolve(__dirname, '../db/ip-history.json')
const writeWarnings = createWrite(warningsPath)
const writeWarningsBlacklist = createWrite(blacklistWarningsPath)
const writeIpHistory = createWrite(ipStatsPath)

const warnings = readFile<any>(warningsPath)
const warningsBlacklist = readFile<any>(blacklistWarningsPath) || {}

export function createStatsEndpoints (app) {
    const history = readFile(
        ipStatsPath,
        (history) => {
            let hasChanges = false
            if (!history.daily) {
                history.daily = [{}]
                hasChanges = true
            }
            if (!history.allTime) {
                history.allTime = {}
                hasChanges = true
            }
            return hasChanges
        },
        writeIpHistory
    )

    setInterval(() => {
        if (history.daily.length >= 24) {
            history.daily.shift()
        }
        history.daily.push({})
        writeIpHistory(history)
    }, 60 * 60 * 1000)

    app.use((req, _res, next) => {
        const uid = req.headers.msuid
        next()
        const daily = history.daily

        if (uid && !daily[daily.length - 1][uid]) {
            daily[daily.length - 1][uid] = true
            history.allTime[uid] = true
            writeIpHistory(history)
        }
    })

    function evaluateHistory (stats) {
        return Object.keys(stats).reduce(
            (stats, uid) => {
                const isAnon = uid.slice(0, 4) === 'anon'
                stats[isAnon ? 'anon' : 'linked']++

                return stats
            },
            {
                anon: 0,
                linked: 0
            }
        )
    }

    app.get('/api/stats/users', (req, res) => {
        res.status(200).json({
            valid: true,
            payload: {
                daily: evaluateHistory(Object.assign({}, ...history.daily)),
                allTime: evaluateHistory(history.allTime)
            }
        })
    })

    app.get('/api/stats/sources', async (req, res) => {
        const stats = await getStats()
        res.status(200).json({ valid: true, payload: stats })
    })

    app.post('/api/stats/warnings/blacklist', adminUrl, async (req, res) => {
        const { message } = req?.body || {}
        if (!message) {
            return res.status(400).json({ valid: false })
        }

        warningsBlacklist[message] = true
        writeWarningsBlacklist(warningsBlacklist)

        res.status(200).json({valid: true, payload: warningsBlacklist})
    })
    app.get('/api/stats/warnings/blacklist', async (req, res) => {
        res.status(200).json({ valid: true, payload: warningsBlacklist })
    })
}

export function shouldWarn (key, limit) {
    return (
        !warnings[key] ||
        !limit ||
        warnings[key].filter((warning) => Date.now() - warning.date <= 48 * 3600 * 1000).length < limit
    )
}

export function logWarning (key, message, limit = 3) {
    if (warningsBlacklist[message]) {
        return
    }
    const timestamp = new Date().toISOString().slice(0, 14) + '00'
    if (key.includes('--')) {
        const host = key.split('--')[0]
        warnings[host] = warnings[host] || { warnings: {}, chapterWarnings: {} }
        warnings[host].chapterWarnings[key] = warnings[host].chapterWarnings[key] || {}
        warnings[host].chapterWarnings[key][timestamp] = warnings[host].chapterWarnings[key][timestamp] || {
            count: 0,
            warnings: []
        }

        warnings[host].chapterWarnings[key][timestamp].count++
        if (
            !warnings[host].chapterWarnings[key][timestamp].warnings.includes(
                message.replace(/(created.{0,3}:\s?)\d+/, '$10')
            )
        ) {
            warnings[host].chapterWarnings[key][timestamp].warnings.push(
                message.replace(/(created.{0,3}:\s?)\d+/, '$10')
            )
        }
    }
    else {
        warnings[key] = warnings[key] || { warnings: {}, chapterWarnings: {} }
        warnings[key].warnings[timestamp] = warnings[key].warnings[timestamp] || { count: 0, warnings: [] }

        warnings[key].warnings[timestamp].count++
        if (!warnings[key].warnings[timestamp].warnings.includes(message.replace(/(created.{0,3}:\s?)\d+/, '$10'))) {
            warnings[key].warnings[timestamp].warnings.push(message.replace(/(created.{0,3}:\s?)\d+/, '$10'))
        }
    }
    writeWarnings(warnings)
    updateHosts()

    if (shouldWarn(key, limit)) {
        console.log(message)
    }
}

const emptyStats = (url, type, warnings = {}) => ({
    latest: 0,
    type,
    sources: {},
    count: 0,
    warnings,
    chapterWarnings: [],
    url,
    failureRate: {
        week: 0,
        day: 0,
        hour: 0
    }
})

const hourInMs = 60 * 60 * 1000
const dayInMs = 24 * hourInMs
const weekInMs = 7 * dayInMs
const fetchesPerHour = 60 / 5
const fetchesPerDay = 24 * fetchesPerHour
const fetchesPerWeek = 7 * fetchesPerDay

function checkIsBeforeYesterday (date) {
    const today = new Date().toISOString().slice(0, 11) + '00:00'
    const yesterday = new Date(Date.now() - dayInMs).toISOString().slice(0, 11) + '00:00'

    if (date.split('T')[1]?.length && date.split('T')[1] !== '00:00') {
        const timestamp = new Date(date).toISOString().slice(0, 11) + '00:00'
        if (timestamp !== yesterday && timestamp !== today) {
            return true
        }
    }
    return false
}

async function cleanWarnings () {
    const deletedDates = []
    const sources = await getSources()
    const hostMap = Object.values(sources).reduce((map, source) => {
        const host = getHost(source.url)
        map[host] = true
        return map
    }, {})

    function deleteIfOld (warnings, date) {
        if (Date.now() - new Date(date).getTime() > weekInMs + dayInMs) {
            delete warnings[date]
            if (!deletedDates.includes(date)) {
                deletedDates.push(date)
            }
            return true
        }
        return false
    }

    Object.keys(warnings).forEach((key) => {
        if (!hostMap[key]) {
            console.log(`Found deprecated host "${key}". Deleting ...`)
            delete warnings[key]
            return
        }

        const hostWarnings = warnings[key]?.warnings
        Object.keys(hostWarnings || {}).forEach((date) => {
            if (!deleteIfOld(hostWarnings, date) && checkIsBeforeYesterday(date)) {
                const timestamp = new Date(date).toISOString().slice(0, 11) + '00:00'
                hostWarnings[timestamp] = mergeWarnings(hostWarnings[timestamp], hostWarnings[date])
                delete hostWarnings[date]
            }
        })

        Object.keys(warnings[key]?.chapterWarnings || {}).forEach((chapterKey) => {
            const chapterWarnings = warnings[key].chapterWarnings[chapterKey]

            Object.keys(chapterWarnings).forEach((date) => {
                if (!deleteIfOld(chapterWarnings, date) && checkIsBeforeYesterday(date)) {
                    const timestamp = new Date(date).toISOString().slice(0, 11) + '00:00'
                    chapterWarnings[timestamp] = mergeWarnings(chapterWarnings[timestamp], chapterWarnings[date])
                    delete chapterWarnings[date]
                }
            })

            if (Object.keys(warnings[key]?.chapterWarnings[chapterKey]).length === 0) {
                delete warnings[key].chapterWarnings[chapterKey]
            }
        })

        if (
            Object.keys(warnings[key]?.chapterWarnings).length === 0 &&
            Object.keys(warnings[key]?.warnings).length === 0
        ) {
            delete warnings[key]
        }
    })

    if (deletedDates.length) {
        console.log(`Removed Chapters for dates: "${deletedDates.join('", "')}".`)
        writeWarnings(warnings)
    }
}

setInterval(() => cleanWarnings(), 60 * 1000)

cleanWarnings()

const makeCached = <T = any>(fn: () => T): { cachedFn: () => T; resetCache: () => void } => {
    let isValid = false
    let cache = null

    return {
        cachedFn: (...args) => {
            if (!isValid) {
                cache = fn(...args)
                isValid = true
            }
            return cache
        },
        resetCache: () => {
            isValid = false
        }
    }
}

function mergeWarnings (w1 = { count: 0, warnings: [] }, w2 = { count: 0, warnings: [] }) {
    return {
        count: (w1.count || 0) + (w2.count || 0),
        warnings: (w1.warnings || []).reduce((warnings, warning) => {
            if (!warnings.includes(warning)) {
                warnings.push(warning)
            }
            return warnings
        }, [...w2.warnings] || [])
    }
}

function mergeWarningCollections (
    wc1: Record<string, WarningCollection> = {},
    wc2: Record<string, WarningCollection> = {}
) {
    return Object.keys(wc1).reduce(
        (combi, date) => {
            if (combi[date]) {
                combi[date] = mergeWarnings(wc1[date], combi[date])
            }
            else {
                combi[date] = wc1[date]
            }
            return combi
        },
        { ...wc2 }
    )
}

async function getStatsDefault (): Promise<Stats> {
    const urls = await getUrls()
    const sources = await getSources()

    const stats = Object.values(sources).reduce((stats, source) => {
        const host = getHost(source.url)
        const url = source.url.split('/').slice(0, 3).join('/')
        stats[host] = stats[host] || emptyStats(url, source.type, warnings[host]?.warnings)
        const sourceChapters = Object.values(urls).filter((url) => url.sourceId === source.id)
        const latest = sourceChapters.reduce(
            (latest, url) => (latest > Number(url.created) ? latest : Number(url.created)),
            0
        )

        const chapterWarnings = Object.keys(warnings[host]?.chapterWarnings || {})
            .filter((key) => key.includes(getUrlKey({ host, chapter: '' }, source.id)))
            .reduce(
                (chWarnings, warningKey) =>
                    mergeWarningCollections(warnings[host].chapterWarnings[warningKey], chWarnings),
                {}
            )

        stats[host].chapterWarnings = mergeWarningCollections(stats[host].chapterWarnings, chapterWarnings)
        stats[host].latest = stats[host].latest >= latest ? stats[host].latest : latest
        stats[host].count += sourceChapters.length
        stats[host].sources[source.id] = {
            id: source.id,
            title: source.title,
            url: source.url,
            created: source.created,
            latest,
            count: sourceChapters.length,
            warnings: Object.keys(chapterWarnings).reduce((warnings, date) => {
                warnings[date] = chapterWarnings[date].count
                return warnings
            }, {})
        }

        return stats
    }, {})

    Object.keys(stats).forEach((host) => {
        if (stats[host]?.warnings || stats[host]?.chapterWarnings) {
            const warnings = mergeWarningCollections(stats[host]?.warnings, stats[host]?.chapterWarnings)
            stats[host].warnings = warnings
            const hour = new Date().toISOString().slice(0, 14) + '00'
            const dayLimit = new Date(new Date().toISOString().slice(0, 11) + '00:00').getTime()
            const weekLimit = new Date(new Date(Date.now() - weekInMs).toISOString().slice(0, 11) + '00:00').getTime()
            const { weekWarnings, dayWarnings, hourWarnings } = Object.keys(warnings).reduce(
                (col, date) => {
                    if (date === hour) {
                        col.hourWarnings += warnings[date].count
                    }
                    if (new Date(date).getTime() > dayLimit) {
                        col.dayWarnings += warnings[date].count
                    }
                    if (new Date(date).getTime() > weekLimit) {
                        col.weekWarnings += warnings[date].count
                    }
                    return col
                },
                {
                    weekWarnings: 0,
                    dayWarnings: 0,
                    hourWarnings: 0
                }
            )

            const sources = Object.keys(stats[host].sources).length
            const minutes = new Date().getMinutes()
            const hours = new Date().getHours()
            const hourFetches = Math.max(Math.floor(minutes / 5), 1)
            const dayFetches = Math.max(Math.floor((hours * 60 + minutes) / 5), 1)
            const weekFailPercentage = weekWarnings / sources / (fetchesPerWeek + dayFetches)
            const dayFailPercentage = dayWarnings / sources / dayFetches
            const hourFailPercentage = hourWarnings / sources / hourFetches

            stats[host].failureRate.week = weekFailPercentage
            stats[host].failureRate.day = dayFailPercentage
            stats[host].failureRate.hour = hourFailPercentage
        }
    })

    return stats
}

let hosts: { stable: HostInfo[]; unstable: HostInfo[] } = { stable: [], unstable: [] }

const statsCache = makeCached(getStatsDefault)

export const getStats = () => statsCache.cachedFn()

export const resetStatsCache = () => statsCache.resetCache()

registerSourceChangeCallback(resetStatsCache)

export function getHosts () {
    return hosts
}

async function updateHostsRaw () {
    const stats = await getStats()

    hosts = Object.keys(stats).reduce(
        (hosts, host) => {
            let state = 'stable'
            if (stats[host].count <= 10 || stats[host].failureRate?.week >= 0.1) {
                state = 'unstable'
            }
            const hostInfo: HostInfo = {
                name: host,
                url: stats[host].url,
                failureRate: stats[host].failureRate
            }
            hosts[state].push(hostInfo)
            return hosts
        },
        { stable: [], unstable: [] }
    )
}

export const updateHosts = debounce(updateHostsRaw, 500)

updateHosts()
