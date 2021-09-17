/* eslint-disable max-len, no-undef, no-nested-ternary */
const iconPath = '<path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/>'
const iconSevere = `<svg class="warning severe" viewBox="0 0 576 512">${iconPath}</svg>`
const icon = `<svg class="warning" viewBox="0 0 576 512">${iconPath}</svg>`

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
    if (!dialogBody.contains(e.target)) {
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
                document.querySelector('#warningsDiagramm').innerHTML += `
                    <div class="bar" data-date="${day}" title="${(dayMap[day]?.length || 0)} failed fetches.">
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

function renderStats () {
    fetch('/api/sources/stats')
        .then((r) => r.json())
        .then(({ payload: stats }) => {
            document.querySelector('#stats').innerHTML = ''
            Object.keys(stats)
                .sort((a, b) => stats[a].latest === stats[b].latest ? 0 : (Number(stats[a].latest) < Number(stats[b].latest) ? 1 : -1))
                .forEach((host) => {
                    const tableRows = Object.values(stats[host].sources)
                        .sort((a, b) => String(a.title).localeCompare(b.title))
                        .map(({ title, latest, count, warnings }) => `
                                <td title="${title}" class="chtitle" data-warnings='${JSON.stringify(warnings).replace(/'/g, '`')}'>
                                    ${title}${warnings.length && iconSevere || ''}
                                </td>
                                <td>${count}</td>
                                <td>${date(latest)}</td>
                            `)

                    const warning = stats[host].warnings.length || stats[host].chapterWarnings.length
                        ? (stats[host].warnings.length ? iconSevere : icon)
                        : ''

                    document.querySelector('#stats').innerHTML += `
                            <div class="host" data-sources='${Object.keys(stats[host].sources).length}' data-warnings='${JSON.stringify(stats[host].warnings).replace(/'/g, '`')}'>
                                <table class="title">
                                    <tbody>
                                        <tr>
                                            <td><h5>${host}&nbsp;(${Object.keys(stats[host].sources).length}) ${warning}</h5></td>
                                            <td></td>
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
            document.querySelector('#stats').innerHTML += `<div>Updated: ${time(Date.now())}</div>`
        })
}

renderStats()

setInterval(() => renderStats(), 120000)
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        renderStats()
    }
})
