import { readFileSync, writeFile } from "fs"
import { resolve } from "path"
import { getSources } from "./source-storage"
import { getUrlKey, getUrls } from "./url-storage"
declare global {
    interface Warning {
        date: number;
        message: string;
    }

    type Stats = Record<string, HostStat>

    interface FailureRates {
        week: number;
        day: number;
        hour: number;
    }

    interface HostInfo {
        name: string;
        url: string;
        failureRate: FailureRates;
    }

    interface SourceStat {
        title: string;
        latest: number;
        count: number;
        chapterWarnings: Warning[];
        failureRate: FailureRates
    }

    interface HostStat {
        latest: number;
        sources: Record<string, SourceStat>
        count: number;
        warnings: Warning[];
        chapterWarnings: Warning[];
        url: string;
        failureRate: FailureRates
    }

}

let warnings: Record<string, Warning[]> = {}
const warningsPath = resolve(__dirname, '../db/warnings.json')
const ipStatsPath = resolve(__dirname, '../db/ip-history.json')
try {
    warnings = JSON.parse(readFileSync(warningsPath, { encoding: 'utf-8' }))
}
catch (e) {
    console.log(e)
}

function write() {
    writeFile(warningsPath, JSON.stringify(warnings, null, 2), () => null)
}

export function createStatsEndpoints (app) {
    let history = {
        daily: [{}],
        allTime: {}
    }
    try {
        history = JSON.parse(readFileSync(ipStatsPath, { encoding: 'utf-8' }))
        if (Array.isArray(history)) {
            history = {
                daily: history,
                allTime: Object.assign({}, ...history)
            }
        }
    }
    catch (e) {
        console.log(e)
    }

    setInterval(() => {
        if (history.daily.length >= 24) {
            history.daily.shift()
        }
        history.daily.push({})
        writeFile(ipStatsPath, JSON.stringify(history, null, 2), () => null)  
    }, 60 * 60 * 1000)

    app.use((req, _res, next) => {
        const uid = req.headers.msuid
        next()
        const daily = history.daily

        if (uid && !daily[daily.length - 1][uid]) {
            daily[daily.length - 1][uid] = true
            history.allTime[uid] = true
            writeFile(ipStatsPath, JSON.stringify(history, null, 2), () => null)  
        }
    })

    function evaluateHistory (stats) {
        return Object.keys(stats)
            .reduce((stats, uid) => {
                const isAnon = uid.slice(0, 4) === 'anon'
                stats[isAnon ? 'anon' : 'linked']++

                return stats
            }, { 
                anon: 0, 
                linked:0 
            })
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

}



export function shouldWarn(key, limit) {
    return !warnings[key] || !limit || warnings[key].filter((warning) => Date.now() - warning.date <= 48 * 3600 * 1000).length < limit
}

export function logWarning(key, message, limit = 3) {
    if (!warnings[key]) {
        warnings[key] = []
    }

    warnings[key].push({
        date: Date.now(),
        message
    })
    
    if (!shouldWarn(key, limit)) {
        return
    }

    write()

    updateHosts()
    console.log(message)
}

const emptyStats = (url, type, warnings = []) => ({
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

setInterval(() => {
    let removedNumber = 0
    Object.keys(warnings).filter((key) => {
        const newWarnings = warnings[key].filter((warning) => (Date.now() - warning.date) > 2 * weekInMs)
        if (newWarnings.length !== warnings[key].length) {
            removedNumber += warnings[key].length - newWarnings.length
            warnings[key] = newWarnings
        }
    })

    if (removedNumber > 0) {
        console.log(`Removed ${removedNumber} old warnings.`)
        write()
    }
}, dayInMs)

export async function getStats(): Promise<Stats> {
    const urls = await getUrls()
    const sources = await getSources()

    const stats = Object.values(sources).reduce((stats, source) => {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.')
        const url = source.url.split('/').slice(0, 3).join('/')
        stats[host] = stats[host] || emptyStats(url, source.type, warnings[host])
        const sourceChapters = Object.values(urls).filter((url) => url.sourceId === source.id)
        const latest = sourceChapters.reduce((latest, url) => latest > Number(url.created) ? latest : Number(url.created), 0)

        const chapterWarnings = Object.keys(warnings)
            .filter(key => key.includes(getUrlKey({ host: sourceChapters[0]?.host || '', chapter: '' }, source.id)))
            .reduce((chWarnings, warningKey) => chWarnings.concat(warnings[warningKey] || []), [])

        const weekWarnings = chapterWarnings.filter((warning) => (Date.now() - warning.date) < weekInMs)
        const dayWarnings = weekWarnings.filter((warning) => (Date.now() - warning.date) < dayInMs)
        const hourWarnings = dayWarnings.filter((warning) => (Date.now() - warning.date) < hourInMs)
        const weekFailPercentage = weekWarnings.length / fetchesPerWeek
        const dayFailPercentage = dayWarnings.length / fetchesPerDay
        const hourFailPercentage = hourWarnings.length / fetchesPerHour

        stats[host].chapterWarnings = stats[host].chapterWarnings.concat(chapterWarnings)
        stats[host].latest = stats[host].latest >= latest ? stats[host].latest : latest
        stats[host].count += sourceChapters.length
        stats[host].sources[source.id] = {
            id: source.id,
            title: source.title,
            latest,
            count: sourceChapters.length,
            warnings: chapterWarnings,
            failureRate: {
                week: weekFailPercentage,
                day: dayFailPercentage,
                hour: hourFailPercentage
            }
        }

        return stats
    }, {})

    Object.keys(stats).forEach((host) => {
        if (stats[host]?.warnings?.length) {
            const weekWarnings = stats[host]?.warnings.filter((warning) => Date.now() - warning.date < weekInMs)
            const dayWarnings = weekWarnings.filter((warning) => Date.now() - warning.date < dayInMs)
            const hourWarnings = dayWarnings.filter((warning) => Date.now() - warning.date < hourInMs)
            const sources = Object.keys(stats[host].sources).length
            const weekFailPercentage = weekWarnings.length / sources / fetchesPerWeek
            const dayFailPercentage = dayWarnings.length / sources / fetchesPerDay
            const hourFailPercentage = hourWarnings.length / sources / fetchesPerHour

            stats[host].failureRate.week = weekFailPercentage
            stats[host].failureRate.day = dayFailPercentage
            stats[host].failureRate.hour = hourFailPercentage
        }
    })

    return stats
}

let hosts: { stable: HostInfo[], unstable: HostInfo[] } = { stable: [], unstable: [] }

export function getHosts() {
    return hosts
}

export async function updateHosts() {
    const stats = await getStats()

    hosts = Object.keys(stats).reduce((hosts, host) => {
        let state = 'stable'
        if (
            stats[host].count <= 10 || stats[host].failureRate.week >= 0.1 ||
            Object.values(stats[host].sources).some((source) => source.failureRate.week >= 0.9)
        ) {
            state = 'unstable'
        }
        const hostInfo: HostInfo = {
            name: host,
            url: stats[host].url,
            failureRate: stats[host].failureRate
        }
        hosts[state].push(hostInfo)
        return hosts
    }, { stable: [], unstable: [] })
}

updateHosts()