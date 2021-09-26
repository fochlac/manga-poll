import 'regenerator-runtime/runtime.js'
import { checkClickForDeleteClick } from './delete-dialog'
import { renderStats } from './render-stats'
import { checkForWarningClick } from './warning-dialog'

document.addEventListener('click', (event) => {
    const closestTitle = event.target.closest('.host .title')
    const closestHost = event.target.closest('.host')

    if (checkClickForDeleteClick(event) || checkForWarningClick(event)) {
        return
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

renderStats()

setInterval(() => renderStats(), 120000)
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        renderStats()
    }
})