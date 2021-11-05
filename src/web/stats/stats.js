import 'regenerator-runtime/runtime.js'
import { checkClickForDeleteClick } from './delete-dialog'
import { checkClickForEditClick } from './edit-dialog'
import { renderStats } from './render-stats'
import { checkForWarningClick } from './warning-dialog'

document.addEventListener('click', (event) => {
    const closestTitle = event.target.closest('.host .title')
    const closestLink = event.target.closest('.host .title .link, .host .title .warning')
    const closestHost = event.target.closest('.host')

    if (checkClickForDeleteClick(event) || checkForWarningClick(event) || checkClickForEditClick(event)) {
        return
    }
    else if (closestTitle && closestTitle.contains(event.target) && !closestLink) {
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

renderStats()

setInterval(() => renderStats(), 120000)
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        renderStats()
    }
})
