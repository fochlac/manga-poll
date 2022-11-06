import { date, getIcon, mergeWarningCollections, time } from './utils'

const deleteIcon = document.querySelector('svg.delete')
const editIcon = document.querySelector('svg.edit')
const linkIcon = document.querySelector('svg.link').outerHTML
const activeUsers = document.querySelector('#active-users')

export async function renderStats () {
    renderUserCount()

    const result = await fetch('/api/stats/sources').then((r) => r.json())
    const stats = result.payload
    const sortedHosts = Object.keys(stats).sort((a, b) => String(a).localeCompare(b))

    renderHostList(stats, sortedHosts)
    renderHostDiagram(
        stats,
        sortedHosts.filter((host) => Object.keys(stats[host].warnings || {}).length)
    )
}

document.querySelector('#globalLegend').addEventListener('click', (e) => {
    const closestHost = e.target.closest('.host')
    const closestHighlight = e.target.closest('.host.highlight')
    if (closestHighlight || closestHost) {
        document.querySelectorAll('#globalDiagramm .percentage.highlight, #globalLegend .host').forEach((elem) => {
            elem.classList.remove('highlight')
        })
    }
    if (!closestHighlight && closestHost) {
        document
            .querySelectorAll(`#globalDiagramm .percentage[data-host="${closestHost.dataset.host}"]`)
            .forEach((elem) => {
                elem.classList.add('highlight')
            })
        closestHost.classList.add('highlight')
    }
})

function getFetchIntervals (day) {
    const today = date(Date.now())
    if (day === today) {
        return new Date().getHours() * 12 + Math.ceil(new Date().getMinutes() / 5)
    }
    else if (day === 'Last hour') {
        return 12
    }
    return 24 * 12
}

function renderHostDiagram (stats, hosts) {
    const selectedHost = document.querySelector('#globalLegend .host.highlight')
    const dayWarningMap = hosts.reduce(
        (dayWarningMap, host) => {
            Object.keys(stats[host].warnings).forEach((dateKey) => {
                const warningDay = date(dateKey)
                if (Date.now() - new Date(`${dateKey}Z`).getTime() <= 61 * 60 * 1000) {
                    if (!dayWarningMap['Last hour'][host]) {
                        dayWarningMap['Last hour'][host] = 0
                    }
                    dayWarningMap['Last hour'][host] += stats[host].warnings[dateKey].count
                }
                if (!dayWarningMap[warningDay]) {
                    dayWarningMap[warningDay] = {}
                }
                if (!dayWarningMap[warningDay][host]) {
                    dayWarningMap[warningDay][host] = 0
                }
                dayWarningMap[warningDay][host] += stats[host].warnings[dateKey].count
            })

            return dayWarningMap
        },
        { hosts, 'Last hour': {} }
    )

    document.querySelector('#globalDiagramm').innerHTML = ''

    const days = new Array(7).fill(0).map((_v, index) => date(Date.now() - 3600000 * 24 * (6 - index)))
    days.push('Last hour')

    const allMax = days.reduce((allMax, day) => {
        const dayMax = Object.keys(dayWarningMap[day] || {}).reduce((max, host) => {
            const sourceCount = Object.keys(stats[host].sources).length
            const errorCount = dayWarningMap[day][host] || 0
            const percentage = Math.round((errorCount / sourceCount / getFetchIntervals(day)) * 100)
            return percentage > max ? percentage : max
        }, 0)
        return dayMax > allMax ? dayMax : allMax
    }, 0)
    const maxPercentage = Math.min(100, Math.ceil(allMax / 5) * 5)

    days.forEach((day) => {
        const dayBars = dayWarningMap.hosts.reduce((dayBars, host) => {
            const sourceCount = Object.keys(stats[host].sources).length
            const errorCount = dayWarningMap[day]?.[host] || 0
            if (errorCount === 0) {
                dayBars += '<div class="percentage" style="width: 0px; border: none; visibility: hidden;"></div>'
                return dayBars
            }
            const percentage = Math.min(Math.round((errorCount / sourceCount / getFetchIntervals(day)) * 100), 100)
            const title = `${host}: ${percentage}% error rate (${errorCount})`
            dayBars += `<div class="percentage" style="height: ${
                (percentage / maxPercentage) * 100
            }%" data-host="${host}" data-title="${title}"></div>`
            return dayBars
        }, '')
        document.querySelector('#globalDiagramm').dataset.max = `${maxPercentage}%`
        document.querySelector('#globalDiagramm').style.display = 'flex'
        document.querySelector(
            '#globalDiagramm'
        ).innerHTML += `<div class="compound" data-date="${day}">${dayBars}</div>`
    })

    document.querySelector('#globalLegend').innerHTML = dayWarningMap.hosts
        .map((host) => `<div class="host" data-host="${host}">${host}</div>`)
        .join(' ')
    if (selectedHost) {
        document
            .querySelectorAll(`#globalDiagramm .percentage[data-host="${selectedHost.dataset.host}"]`)
            .forEach((elem) => {
                elem.classList.add('highlight')
            })
        selectedHost.classList.add('highlight')
    }
}

function renderHostList (stats, hosts) {
    const expandedHosts = Array.from(document.querySelectorAll('.host.expanded')).reduce((hostMap, el) => {
        hostMap[el.dataset.id] = el.querySelector('.details').getBoundingClientRect().height
        return hostMap
    }, {})

    document.querySelector('#stats').innerHTML = ''

    hosts.forEach((host) => {
        const tableRows = Object.values(stats[host].sources)
            .sort((a, b) => String(a.title).localeCompare(b.title))
            .map(
                ({ title, latest, count, warnings, id, url }) => `
                            <td title="${title}" class="chtitle" data-warnings='${JSON.stringify(warnings).replace(/'/g, '`')}'>
                                <a href="${url}" target="_blank" rel="noopener">
                                    ${title}${(Object.keys(warnings).length && getIcon('severe')) || ''}
                                    ${linkIcon}
                                </a>
                            </td>
                            <td>${count}</td>
                            <td>${date(latest)}</td>
                            <td data-source="${id}" data-title="${title}" data-url="${url}">
                                <div class="row">
                                    ${editIcon.outerHTML}
                                    ${deleteIcon.outerHTML}
                                </div>
                            </td>
                        `
            )

        let weight = 'light'
        if (stats[host].failureRate.day > 0.1) {
            weight = 'severe'
        }
        else if (stats[host].failureRate.day > 0.02) {
            weight = ''
        }
        const warnings = mergeWarningCollections(stats[host].warnings, stats[host].chapterWarnings)
        const warning = Object.keys(warnings).length ? getIcon(weight) : ''

        const title = `${host}&nbsp;(${Object.keys(stats[host].sources).length})`
        document.querySelector('#stats').innerHTML += `
                        <div class="host${expandedHosts[host] !== undefined ? ' expanded' : ''}" 
                            data-id="${host}"
                            data-sources='${Object.keys(stats[host].sources).length}'
                            data-warnings='${JSON.stringify(warnings).replace(/'/g, '`')}'>
                            <table class="title">
                                <tbody>
                                    <tr>
                                        <td>
                                            <h5>
                                                <span class="titletext" title="${title}">${title}</span>
                                                ${warning}
                                                <a href="http://${host}/" target="_blank" rel="noopener">${linkIcon}</a>
                                            </h5>
                                        </td>
                                        <td><b>${stats[host].type
        .replace(/[aeiou]/g, '')
        .toUpperCase()
        .replace(/^MNG/, 'M')
        .slice(0, 3)}</b></td>
                                        <td><b>${date(stats[host].latest)}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="details" style="height: ${expandedHosts[host]}px;">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Chs.</th>
                                            <th>Updated</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            ${tableRows.join('</tr><tr>')}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `
    })
    document.querySelector('#stats').innerHTML += `<div class="updated">Updated: ${time(Date.now())}</div>`
}

function renderUserCount () {
    fetch('/api/stats/users')
        .then((r) => r.json())
        .then((r) => r.payload || { daily: { linked: 0, anon: 0 }, allTime: { linked: 0, anon: 0 } })
        .then(({ daily, allTime }) => {
            activeUsers.innerHTML =
                daily.linked === 1 ? `1 User (${daily.anon} anon)` : `${daily.linked} Users (${daily.anon} anon)`
            activeUsers.dataset.title = `All-Time: ${allTime.linked} (${allTime.anon} anon)`
        })
}
