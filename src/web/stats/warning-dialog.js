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
                        <div class="percentage" style="height: ${Math.min(height, 100)}%" />
                    </div>
                `
            })

        warningList.innerHTML = html
        dialog.style.display = 'flex'
    }
}
