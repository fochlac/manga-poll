import { getPassword, resetPassword } from './auth'
import { renderStats } from './render-stats'

const deleteDialog = document.getElementById('delete-dialog')
const deleteTitle = document.getElementById('delete-title')
const deleteSource = document.getElementById('delete-source')
const deleteButton = document.getElementById('delete-button')
const deleteError = document.getElementById('delete-error')

deleteButton.addEventListener('click', async (e) => {
    if (deleteSource.value) {
        deleteButton.disabled = true
        deleteError.innerHTML = ''
        fetch(`/api/sources/${deleteSource.value}`, { method: 'delete', headers: { authentication: await getPassword() } })
            .then((res) => {
                deleteButton.disabled = false
                if (res.status === 200) {
                    deleteDialog.style.display = 'none'
                    renderStats()
                }
                else {
                    deleteError.innerHTML = 'Error deleting source!'
                    resetPassword()
                }
            })
            .catch(() => {
                deleteError.innerHTML = 'Error deleting source!'
                resetPassword()
            })
    }
})

document.querySelector('#delete-dialog .closebutton').addEventListener('click', (e) => {
    deleteDialog.style.display = 'none'
})

export function checkClickForDeleteClick (e) {
    const closestDelete = e.target.closest('.delete')

    if (closestDelete && closestDelete.contains(e.target)) {
        const td = e.target.closest('td')
        if (td.dataset.source && td.dataset.title) {
            deleteDialog.style.display = 'flex'
            deleteSource.value = td.dataset.source
            deleteTitle.innerHTML = td.dataset.title
        }
        return true
    }
    return false
}
