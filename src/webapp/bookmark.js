import { db } from './storage'
import { API } from '../common/api'

const { Source } = API('')

export function addBookmarkListener () {
    const input = document.getElementById('bookmark')
    const button = document.getElementById('bookmark-button')

    button.addEventListener('click', () => {
        const url = input.value
        if (url) {
            Source.fromUrl(url)
                .then(({valid, payload: source}) => {
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
