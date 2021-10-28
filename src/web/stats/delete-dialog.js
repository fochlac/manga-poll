import { renderStats } from './render-stats'

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
        fetch(`/api/sources/${deleteSource.value}`, { method: 'delete', headers: { authentication: deletePass.value } })
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
