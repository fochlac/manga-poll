import { getPassword, resetPassword } from './auth'
import { date, time } from './utils'

const dialog = document.getElementById('warnings-dialog')
const warningList = document.getElementById('warnings')
const dialogBody = document.querySelector('.warnings')
const stopIcon = document.querySelector('.stop')

dialog.addEventListener('click', (e) => {
    if (!dialogBody.contains(e.target) || e.target.closest('.closebutton')) {
        dialog.style.display = 'none'
    }
    if (e.target.classList.contains('stop')) {
        BlackList.add(e.target.closest('.message').dataset.message)
    }
})

function cachedBlacklist () {
    let result

    setInterval(() => {
        result
    }, 10 * 1000 * 60)

    return {
        add: async (message) => {
            result[message] = true
            renderDialog()
            try {
                result = await fetch('/api/stats/warnings/blacklist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', authentication: await getPassword() },
                    body: JSON.stringify({ message })
                })
                    .then((r) => r.json())
                    .then((r) => r?.valid && r.payload || resetPassword())

                renderDialog()
            }
            catch (e) {
                console.error(e)
                resetPassword()
            }
        },
        get: async () => {
            if (!result) {
                try {
                    result = await fetch('/api/stats/warnings/blacklist')
                        .then((r) => r.json())
                        .then((r) => r?.valid && r.payload)
                }
                catch (e) {
                    console.error(e)
                }
            }
            return result || {}
        },
        resetCache: () => {
            result = undefined
        }
    }
}

const BlackList = cachedBlacklist()
let currentWarnings
let currentSources
async function renderDialog () {
    const warnings = currentWarnings
    const blacklist = await BlackList.get()

    let lastDay
    const html = Object.keys(warnings)
        .reduce((list, key) => {
            warnings[key].warnings.forEach((warning) => {
                list.push({
                    date: new Date(`${key}Z`).getTime(),
                    message: warning
                })
            })
            return list
        }, [])
        .sort((a, b) => b.date - a.date)
        .reduce((html, warning) => {
            const day = date(warning.date)
            if (lastDay !== day) {
                lastDay = day
                html += `<h5 class="row date">${day}</h5>`
            }
            const isUrlWarning = warning.message.includes('Invalid url found for') && !blacklist[warning.message]
            html += `
                    <div class="row">
                    <div class="date">${day}, ${time(warning.date)}</div>
                    <div class="message" data-message='${warning.message}'>
                        ${warning.message}
                        ${isUrlWarning ? stopIcon.outerHTML : ''}
                    </div>
                    </div>
                `
            return html
        }, '')

    const sourceCount = currentSources
    document.querySelector('#warningsDiagramm').innerHTML = ''
    const dayMap = Object.keys(warnings).reduce((dayMap, dateKey) => {
        const key = date(dateKey)
        if (!dayMap[key]) {
            dayMap[key] = 0
        }
        dayMap[key] += warnings[dateKey].count
        return dayMap
    }, {})

    const today = date(Date.now())
    new Array(7)
        .fill(0)
        .map((_v, index) => date(Date.now() - 3600000 * 24 * (6 - index)))
        .forEach((day) => {
            let fetchIntervallsPerDay = (24 * 60) / 5
            if (day === today) {
                fetchIntervallsPerDay = (new Date().getHours() * 60) / 5
            }
            const height = Math.round(((dayMap[day] || 0) / sourceCount / fetchIntervallsPerDay) * 100)
            const title = `${height}% error rate (${dayMap[day] || 0})`
            document.querySelector('#warningsDiagramm').innerHTML += `
                    <div class="bar" data-date="${day}" data-title="${title}" >
                        <div class="percentage" style="height: ${Math.min(height, 100)}%" />
                    </div>
                `
        })

    warningList.innerHTML = html
    dialog.style.display = 'flex'
}

export function checkForWarningClick (event) {
    const closestHost = event.target.closest('.host')
    const closestWarning = event.target.closest('.title .warning')

    if (closestWarning && closestWarning.contains(event.target)) {
        currentWarnings = JSON.parse(closestHost.dataset.warnings)
        currentSources = Number(closestHost.dataset.sources)
        renderDialog()
    }
}
