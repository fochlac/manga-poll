import { db } from './storage'
import { API } from '../common/api'

const { Source } = API('')

export function addBookmarkListener () {
    const input = document.getElementById('bookmark')
    const button = document.getElementById('bookmark-button')

    button.addEventListener('click', () => {
        const url = input.value
        if (url) {
            input.disabled = true
            button.disabled = true
            input.classList.remove('error')
            Source.fromUrl(url)
                .catch(() => ({ valid: false }))
                .then(({valid, payload: source}) => {
                    input.disabled = false
                    button.disabled = false
                    if (valid) {
                        db.sources.add(source)
                        input.value = ''
                        input.classList.remove('error')
                    }
                    else {
                        input.classList.add('error')
                    }
                })
        }
    })
}
