import { date, time } from './utils'

const dialog = document.getElementById('warnings-dialog')
const warningList = document.getElementById('warnings')
const dialogBody = document.querySelector('.warnings')

dialog.addEventListener('click', (e) => {
    if (!dialogBody.contains(e.target) || e.target.closest('.closebutton')) {
        dialog.style.display = 'none'
    }
})

export function checkForWarningClick (event) {
    const closestHost = event.target.closest('.host')
    const closestWarning = event.target.closest('.title .warning')

    if (closestWarning && closestWarning.contains(event.target)) {
        const warnings = JSON.parse(closestHost.dataset.warnings)

        let lastDay
        const html = Object.keys(warnings)
            .reduce((list, key) => {
                warnings[key].warnings.forEach((warning) => {
                    list.push({
                        date: new Date(key).getTime(),
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
                html += `
            <div class="row">
            <div class="date">${day}, ${time(warning.date)}</div>
            <div class="message">${warning.message}</div>
            </div>
            `
                return html
            }, '')

        const sourceCount = Number(closestHost.dataset.sources)
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
}
