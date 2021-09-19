/* global document, fetch, setInterval, window */

const warningIcon = document.querySelector('svg.warning')

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

dialog.addEventListener('click', (e) => {
    if (!dialogBody.contains(e.target) || e.target.closest('.closebutton')) {
        dialog.style.display = 'none'
    }
})

document.addEventListener('click', (event) => {
    const closestTitle = event.target.closest('.host .title')
    const closestHost = event.target.closest('.host')
    const closestWarning = event.target.closest('.warning')

    if (closestWarning && closestWarning.contains(event.target)) {
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
    classes.forEach((className) => icon.classList.add(className))
    return icon.outerHTML
}

function renderStats () {
    fetch('/api/sources/stats')
        .then((r) => r.json())
        .then(({ payload: stats }) => {
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
                        .map(({ title, latest, count, warnings }) => `
                                <td title="${title}" class="chtitle" data-warnings='${JSON.stringify(warnings).replace(/'/g, '`')}'>
                                    ${title}${warnings.length && getIcon('severe') || ''}
                                </td>
                                <td>${count}</td>
                                <td>${date(latest)}</td>
                            `)

                    let weight = 'light'
                    if (stats[host].failureRate.day > 0.1) {
                        weight = 'severe'
                    }
                    else if (stats[host].failureRate.day > 0.02) {
                        weight = ''
                    }
                    const warning = stats[host].warnings.length ? getIcon(weight) : ''

                    const title = `${host}&nbsp;(${Object.keys(stats[host].sources).length})`
                    document.querySelector('#stats').innerHTML += `
                            <div class="host" data-sources='${Object.keys(stats[host].sources).length}' data-warnings='${JSON.stringify(stats[host].warnings).replace(/'/g, '`')}'>
                                <table class="title">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5>
                                                    <span class="titletext" title="title">${title}</span>
                                                    ${warning}
                                                </h5>
                                            </td>
                                            <td><b>${date(stats[host].latest)}</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="details">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Chs.</th>
                                                <th>Updated</th>
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
        })
}

renderStats()

setInterval(() => renderStats(), 120000)
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        renderStats()
    }
})
