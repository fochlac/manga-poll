import { date, getIcon, time } from './utils'

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

const cache = new Map()

function renderHostList (stats, hosts) {
    const expandedHosts = Array.from(document.querySelectorAll('.host.expanded')).reduce((hostMap, el) => {
        hostMap[el.dataset.id] = el.querySelector('.details').getBoundingClientRect().height
        return hostMap
    }, {})

    document.querySelector('#stats').innerHTML = ''

    let innerHTML

    hosts.forEach((host) => {
        if (cache.has(host) && cache.get(host).sources === JSON.stringify(stats[host].sources)) {
            innerHTML += cache.get(host).html
        }

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
        const warnings = {}
        const warning = Object.keys(warnings).length ? getIcon(weight) : ''

        const title = `${host}&nbsp;(${Object.keys(stats[host].sources).length})`
        const html = `
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
        cache.set(host, {
            html,
            sources: JSON.stringify(stats[host].sources)
        })

        innerHTML += html
    })

    document.querySelector('#stats').innerHTML = `${innerHTML}<div class="updated">Updated: ${time(Date.now())}</div>`
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
