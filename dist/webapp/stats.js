/* global document, fetch, setInterval, window */

const warningIcon = document.querySelector('svg.warning')
const deleteIcon = document.querySelector('svg.delete')

function date (date) {
    const dateRaw = new Date(date).toISOString().split('T')[0]
    const [y, m, d] = dateRaw.split('-')
    return `${d}.${m}.${y.slice(-2)}`
}

function time (date) {
    const dateRaw = new Date(date).toTimeString()
    const [h, m] = dateRaw.split(':')
    return `${h}:${m}`
}
const dialog = document.getElementById('warnings-dialog')
const warningList = document.getElementById('warnings')
const dialogBody = document.querySelector('.warnings')
const deleteDialog = document.getElementById('delete-dialog')
const deleteTitle = document.getElementById('delete-title')
const deleteSource = document.getElementById('delete-source')
const deletePass = document.getElementById('delete-passcode')
const deleteButton = document.getElementById('delete-button')
const deleteError = document.getElementById('delete-error')

deleteButton.addEventListener('click', (e) => {
    if (deleteSource.value && deletePass.value) {
        deleteButton.disabled = true
        deletePass.disabled = true
        deleteError.innerHTML = ''
        fetch(`/api/sources/${deleteSource.value}`, {method: 'delete', headers: {authentication: deletePass.value}})
            .then((res) => {
                deleteButton.disabled = false
                deletePass.disabled = false
                if (res.status === 200) {
                    deleteDialog.style.display = 'none'
                    renderStats()
                }
                else {
                    deleteError.innerHTML = 'Error deleting source!'
                }
            })
            .catch(() => {
                deleteError.innerHTML = 'Error deleting source!'
            })
    }
})
document.querySelector('#delete-dialog .closebutton').addEventListener('click', (e) => {
    deleteDialog.style.display = 'none'
})

dialog.addEventListener('click', (e) => {
    if (!dialogBody.contains(e.target) || e.target.closest('.closebutton')) {
        dialog.style.display = 'none'
    }
})

document.addEventListener('click', (event) => {
    const closestTitle = event.target.closest('.host .title')
    const closestHost = event.target.closest('.host')
    const closestWarning = event.target.closest('.warning')
    const closestDelete = event.target.closest('.delete')

    if (closestDelete && closestDelete.contains(event.target)) {
        const td = event.target.closest('td')
        if (td.dataset.source && td.dataset.title) {
            deleteDialog.style.display = 'flex'
            deleteSource.value = td.dataset.source
            deleteTitle.innerHTML = td.dataset.title
        }
    }
    else if (closestWarning && closestWarning.contains(event.target)) {
        const warnings = JSON.parse(closestHost.dataset.warnings)
        const html = warnings.reduce((html, warning) => {
            html += `
            <div class="row">
            <div class="date">${date(warning.date)}, ${time(warning.date)}</div>
            <div class="message">${warning.message}</div>
            </div>
            `
            return html
        }, '')

        const sourceCount = Number(closestHost.dataset.sources)
        document.querySelector('#warningsDiagramm').innerHTML = ''
        const dayMap = warnings.reduce((dayMap, warning) => {
            const key = date(warning.date)
            if (!dayMap[key]) {
                dayMap[key] = []
            }
            dayMap[key].push(warning)
            return dayMap
        }, {})

        const today = date(Date.now())
        new Array(14).fill(0)
            .map((_v, index) => date(Date.now() - 3600000 * 24 * (13 - index)))
            .forEach((day) => {
                let fetchIntervallsPerDay = 24 * 60 / 5
                if (day === today) {
                    fetchIntervallsPerDay = new Date().getHours() * 60 / 5
                }
                const height = Math.round((dayMap[day]?.length || 0) / sourceCount / fetchIntervallsPerDay * 100)
                const title = `${height}% error rate (${(dayMap[day]?.length || 0)})`
                document.querySelector('#warningsDiagramm').innerHTML += `
                    <div class="bar" data-date="${day}" data-title="${title}" >
                        <div class="percentage" style="height: ${height}%" />
                    </div>
                `
            })

        warningList.innerHTML = html
        dialog.style.display = 'flex'
    }
    else if (closestTitle && closestTitle.contains(event.target)) {
        if (closestHost.classList.contains('expanded')) {
            closestHost.querySelector('.details').style.height = 0
            closestHost.classList.remove('expanded')
        }
        else {
            const height = closestHost.querySelector('.details table')?.getBoundingClientRect().height
            closestHost.querySelector('.details').style.height = `${height}px`
            closestHost.classList.add('expanded')
        }
    }
})

function getIcon (classes = []) {
    const icon = warningIcon.cloneNode(true)
    classes = Array.isArray(classes) ? classes : [classes]
    classes.forEach((className) => className && icon.classList.add(className))
    return icon.outerHTML
}

function renderStats () {
    fetch('/api/sources/stats')
        .then((r) => r.json())
        .then(({ payload: stats }) => {
            const expandedHosts = Array.from(document.querySelectorAll('.host.expanded'))
                .reduce((hostMap, el) => {
                    hostMap[el.dataset.id] = el.querySelector('.details').getBoundingClientRect().height
                    return hostMap
                }, {})
            const allWarnings = {}
            document.querySelector('#stats').innerHTML = ''
            Object.keys(stats)
                .sort((a, b) => {
                    if (stats[a].latest === stats[b].latest) {
                        return 0
                    }
                    return Number(stats[a].latest) < Number(stats[b].latest)
                        ? 1
                        : -1
                })
                .forEach((host) => {
                    const tableRows = Object.values(stats[host].sources)
                        .sort((a, b) => String(a.title).localeCompare(b.title))
                        .map(({ title, latest, count, warnings, id }) => `
                                <td title="${title}" class="chtitle" data-warnings='${JSON.stringify(warnings).replace(/'/g, '`')}'>
                                    ${title}${warnings.length && getIcon('severe') || ''}
                                </td>
                                <td>${count}</td>
                                <td>${date(latest)}</td>
                                <td data-source="${id}" data-title="${title}">${deleteIcon.outerHTML}</td>
                            `)

                    let weight = 'light'
                    if (stats[host].failureRate.day > 0.1) {
                        weight = 'severe'
                    }
                    else if (stats[host].failureRate.day > 0.02) {
                        weight = ''
                    }
                    const warning = stats[host].warnings.length ? getIcon(weight) : ''
                    if (stats[host].warnings.length) {
                        allWarnings[host] = stats[host].warnings
                    }

                    const title = `${host}&nbsp;(${Object.keys(stats[host].sources).length})`
                    document.querySelector('#stats').innerHTML += `
                            <div class="host${expandedHosts[host] !== undefined ? ' expanded' : ''}" 
                                data-id="${host}"
                                data-sources='${Object.keys(stats[host].sources).length}'
                                data-warnings='${JSON.stringify(stats[host].warnings).replace(/'/g, '`')}'>
                                <table class="title">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5>
                                                    <span class="titletext" title="${title}">${title}</span>
                                                    ${warning}
                                                </h5>
                                            </td>
                                            <td><b>${stats[host].type.replace(/[aeiou]/g, '').slice(0, 3).toUpperCase()}</b></td>
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

            const dayWarningMap = Object.keys(allWarnings).reduce((dayWarningMap, host) => {
                const warnings = allWarnings[host]
                warnings.forEach((warning) => {
                    const warningDay = date(warning.date)
                    if (!dayWarningMap[warningDay]) {
                        dayWarningMap[warningDay] = {}
                    }
                    if (!dayWarningMap[warningDay][host]) {
                        dayWarningMap[warningDay][host] = 0
                    }
                    dayWarningMap[warningDay][host]++
                })

                return dayWarningMap
            }, {hosts: Object.keys(allWarnings).sort((a, b) => String(a).localeCompare(b))})

            document.querySelector('#globalDiagramm').innerHTML = ''

            const days = new Array(7).fill(0)
                .map((_v, index) => date(Date.now() - 3600000 * 24 * (6 - index)))

            const today = date(Date.now())
            const allMax = days
                .reduce((allMax, day) => {
                    let fetchIntervallsPerDay = 24 * 60 / 5
                    if (day === today) {
                        fetchIntervallsPerDay = new Date().getHours() * 60 / 5
                    }
                    const dayMax = Object.keys(dayWarningMap[day] || {}).reduce((max, host) => {
                        const sourceCount = Object.keys(stats[host].sources).length
                        const errorCount = dayWarningMap[day][host] || 0
                        const percentage = Math.round(errorCount / sourceCount / fetchIntervallsPerDay * 100)
                        return percentage > max ? percentage : max
                    }, 0)
                    return dayMax > allMax ? dayMax : allMax
                }, 0)
            const maxPercentage = Math.ceil(allMax / 5) * 5
            days.forEach((day) => {
                let fetchIntervallsPerDay = 24 * 60 / 5
                if (day === today) {
                    fetchIntervallsPerDay = new Date().getHours() * 60 / 5
                }
                const dayBars = dayWarningMap.hosts
                    .reduce((dayBars, host) => {
                        const sourceCount = Object.keys(stats[host].sources).length
                        const errorCount = dayWarningMap[day]?.[host] || 0
                        if (errorCount === 0) {
                            dayBars += '<div class="percentage" style="width: 0px; border: none; visibility: hidden;"></div>'
                            return dayBars
                        }
                        const percentage = Math.round(errorCount / sourceCount / fetchIntervallsPerDay * 100)
                        const title = `${host}: ${percentage}% error rate (${errorCount})`
                        dayBars += `<div class="percentage" style="height: ${percentage / maxPercentage * 100}%" data-host="${host}" data-title="${title}"></div>`
                        return dayBars
                    }, '')
                document.querySelector('#globalDiagramm').dataset.max = `${maxPercentage}%`
                document.querySelector('#globalDiagramm').innerHTML += `<div class="compound" data-date="${day}">${dayBars}</div>`
            })
            document.querySelector('#globalLegend').innerHTML = dayWarningMap.hosts.map((host) => `<div class="host" data-host="${host}">${host}</div>`).join(' ')
        })

    document.querySelector('#globalLegend').addEventListener('click', (e) => {
        const closestHost = e.target.closest('.host')
        if (closestHost) {
            document.querySelectorAll('#globalDiagramm .percentage.highlight, #globalLegend .host').forEach((elem) => {
                elem.classList.remove('highlight')
            })

            document.querySelectorAll(`#globalDiagramm .percentage[data-host="${closestHost.dataset.host}"]`).forEach((elem) => {
                elem.classList.add('highlight')
            })
            closestHost.classList.add('highlight')
        }
    })
}

renderStats()

setInterval(() => renderStats(), 120000)
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        renderStats()
    }
})
