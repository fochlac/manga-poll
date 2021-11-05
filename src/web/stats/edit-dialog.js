import { getPassword, resetPassword } from './auth'
import { renderStats } from './render-stats'

const editDialog = document.getElementById('edit-dialog')
const editMangaTitle = document.getElementById('edit-manga-title')
const editTitle = document.getElementById('edit-title')
const editUrl = document.getElementById('edit-url')
const editButton = document.getElementById('edit-button')
const editError = document.getElementById('edit-error')

editButton.addEventListener('click', async () => {
    const td = document.querySelector(`td[data-source="${editDialog.dataset.source}"]`)
    if (
        editTitle.value &&
        editUrl.innerText &&
        (editTitle.value !== td.dataset.title || editUrl.innerText !== td.dataset.url)
    ) {
        editButton.disabled = true
        editTitle.disabled = true
        editUrl.disabled = true
        editError.innerHTML = ''
        fetch(`/api/sources/${td.dataset.source}`, {
            method: 'put',
            headers: { authentication: await getPassword(), 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({ url: editUrl.innerText, title: editTitle.value })
        })
            .then((res) => {
                editButton.disabled = false
                editTitle.disabled = false
                editUrl.disabled = false
                if (res.status === 200) {
                    editDialog.style.display = 'none'
                    renderStats()
                }
                else {
                    editError.innerHTML = 'Error deleting source!'
                    resetPassword()
                }
            })
            .catch(() => {
                editButton.disabled = false
                editTitle.disabled = false
                editUrl.disabled = false
                editError.innerHTML = 'Error deleting source!'
                resetPassword()
            })
    }
})

document.querySelector('#edit-dialog .closebutton').addEventListener('click', (e) => {
    editDialog.style.display = 'none'
})

export function checkClickForEditClick (e) {
    const closestEdit = e.target.closest('.edit')

    if (closestEdit && closestEdit.contains(e.target)) {
        const td = e.target.closest('td')
        if (td.dataset.source && td.dataset.title && td.dataset.url) {
            editDialog.style.display = 'flex'
            editDialog.dataset.source = td.dataset.source
            editTitle.value = td.dataset.title
            editUrl.innerText = td.dataset.url
            editMangaTitle.innerHTML = td.dataset.title
        }
        return true
    }
    return false
}
