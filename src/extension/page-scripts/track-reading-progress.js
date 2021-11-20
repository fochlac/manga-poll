import { executeOnce, randomId } from '../../common/utils'

const controller = chrome || browser

function markRead (url) {
    return new Promise((resolve, reject) => {
        controller.runtime.sendMessage({
            action: 'MARK_READ',
            url
        }, (response) => {
            if (response.action === 'MARK_READ_SUCCESS') {
                resolve(null)
            }
            else {
                reject(response)
            }
        })
    })
}

export function trackProgress (url, source) {
    if (url?.id) {
        let hide
        const markReadOnce = executeOnce(() => {
            markRead(url)
                .then(() => {
                    const hideFunction = showSuccessBadge(source.title, url.chapter)
                    hide = () => setTimeout(() => hideFunction(), 2500)
                })
        })

        const pageView = sessionStorage.getItem(url.id)
        if (!pageView) {
            sessionStorage.setItem(url.id, 1)
        }
        else if ([10, 11].includes(Number(pageView))) {
            markReadOnce()
        }
        else {
            sessionStorage.setItem(url.id, Number(pageView) + 1)
        }

        let scrollevents = 0
        let skip = false
        document.addEventListener('scroll', () => {
            if (!skip) {
                skip = true
                const page = document.documentElement
                if (scrollevents > 10 || page.scrollHeight > window.visualViewport.height * 4 && page.scrollTop / page.scrollHeight > 0.5) {
                    markReadOnce()
                }
                scrollevents++
                setTimeout(() => {
                    skip = false
                }, 2000)
            }
            if (typeof hide === 'function') {
                hide()
                hide = null
            }
        })

        let clickevents = 0
        document.addEventListener('click', () => {
            if (clickevents > 10) {
                markReadOnce()
                if (typeof hide === 'function') {
                    hide()
                    hide = null
                }
            }
            clickevents++
        })
    }
}

function showSuccessBadge (title, chapter) {
    const div = document.createElement('div')
    const id = randomId()
    div.innerHTML = `
        <style>
            .${id} {
                position: fixed;
                top: 16px;
                z-index: 1000000000;
                color: #000c21;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                background: #ffff8d;
                right: 8px;
                text-align: center;
                padding: 4px 16px;
                border-radius: 4px;
            }
            .${id} p {
                margin: 0;
                font-family: system-ui;
                font-size: 16px;
            }
        </style>
        <p>Marked ${title} - Ch. ${chapter} as read.</p>
        `

    div.className = id

    document.documentElement.prepend(div)

    return () => div.remove()
}
