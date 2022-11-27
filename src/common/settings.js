const linkFields = ['hide', 'hiddenRegistry', 'sources']

function formatKey (key = '') {
    return `${key.slice(0, 5)}-${key.slice(5, 10)}-${key.slice(10, 15)}`
}

export function getLinkHelpers (db, Api) {
    async function pushLinkUpdate (changes) {
        const changeset = linkFields.filter((key) => Object.keys(changes).some((change) => change.includes(key)))

        if (changeset.length) {
            const link = await db.link.read() || {}
            const local = await db.link.local() || {}
            const update = {}
            if (changeset.includes('hide')) {
                update.hide = local.hide
            }
            if (changeset.includes('hiddenRegistry')) {
                update.hiddenChapters = local.hiddenChapters
            }
            if (changeset.includes('sources')) {
                update.sources = local.sources
            }

            if (Object.keys(update).length && link.key) {
                await Api.Link.update(link.key, update)
                    .then((res) => res.valid && db.link.set(res.payload))
            }
        }
    }

    async function fetchLinkUpdate () {
        const link = await db.link.read()

        if (link) {
            Api.Link.read(link.key, link.lastModified)
                .then((res) => {
                    if (res.valid && res.payload) {
                        const link = res.payload
                        db.link.setLocal(link)
                        db.link.set(link)
                    }
                })
        }
    }
    return {
        pushLinkUpdate,
        fetchLinkUpdate
    }
}

function isValidLinkKey (key) {
    if (typeof key !== 'string') {
        return
    }

    const cleanKey = key.replaceAll(/[^\d]*/g, '')
    if (cleanKey.length === 15) {
        return true
    }
}

export function getLinkQuery () {
    const urlParams = new URLSearchParams(window.location.search)

    if (isValidLinkKey(urlParams.get('link'))) {
        return urlParams.get('link').replaceAll(/[^\d]*/g, '')
    }
}

export async function linkIfUnlinked (db, api) {
    const key = getLinkQuery()

    if (key) {
        const currentLink = await db.link.read()

        if (!currentLink || !currentLink.key) {
            const linkInput1 = document.getElementById('link-number-1')
            const linkInput2 = document.getElementById('link-number-2')
            const linkInput3 = document.getElementById('link-number-3')

            linkInput1.value = key.slice(0, 5)
            linkInput2.value = key.slice(5, 10)
            linkInput3.value = key.slice(10, 15)
            const link = await connectToLink(key, api, db)

            if (link && link.key) {
                const linkNumberText = document.getElementById('link-id')
                const linkLink = document.getElementById('link-link')
                const linkLinkText = document.getElementById('link-link-text')

                document.getElementById('link-section').style.display = 'none'
                document.getElementById('unlink-section').style.display = ''
                linkLinkText.style.display = ''
                linkLink.style.display = ''
                linkLink.innerText = `https://manga.fochlac.com?link=${link.key}`
                linkLink.href = `https://manga.fochlac.com?link=${link.key}`
                linkNumberText.innerText = `${link.key.slice(0, 5)}-${link.key.slice(5, 10)}-${link.key.slice(10)}`
                linkNumberText.style.color = '#000c21'
            }
        }
        else if (formatKey(currentLink.key) !== formatKey(key)) {
            const linkLinkWarn = document.getElementById('link-link-warning')
            const warnLinkCurrent = document.getElementById('warn-current-link')
            const warnLinkNew = document.getElementById('warn-new-link')

            linkLinkWarn.style.display = 'flex'
            warnLinkCurrent.innerText = formatKey(currentLink.key)
            warnLinkNew.innerText = formatKey(key)
        }
    }
}

async function connectToLink (key, api, db) {
    const { Link } = api
    const linkError = document.getElementById('link-error')
    const linkProgress = document.getElementById('link-progress')
    const createLink = document.getElementById('new-link-button')
    const linkButton = document.getElementById('link-button')
    linkError.style.display = 'none'
    linkProgress.style.display = 'block'
    createLink.disabled = true
    linkButton.disabled = true

    const linkResult = await Link.read(key)
    createLink.disabled = false
    linkButton.disabled = false
    linkProgress.style.display = 'none'
    if (linkResult?.valid) {
        const link = linkResult.payload
        await db.link.set(link)
        await db.link.setLocal(link)

        return link
    }

    linkError.style.display = 'flex'

    const linkLinkWarn = document.getElementById('link-link-warning')

    if (linkLinkWarn) {
        linkLinkWarn.style.display = 'none'
    }
}

export async function addSettingsHandlers (db, api) {
    const { Link } = api

    const createLink = document.getElementById('new-link-button')
    const updateLink = document.getElementById('update-linking')
    const linkNumberText = document.getElementById('link-id')
    const linkLink = document.getElementById('link-link')
    const linkLinkText = document.getElementById('link-link-text')
    const linkingSection = document.getElementById('link-section')
    const unlinkSection = document.getElementById('unlink-section')
    const unlinkButton = document.getElementById('unlink-button')
    const linkButton = document.getElementById('link-button')
    const linkInput1 = document.getElementById('link-number-1')
    const linkInput2 = document.getElementById('link-number-2')
    const linkInput3 = document.getElementById('link-number-3')

    linkInput1.addEventListener('keyup', () => {
        const number = linkInput1.value.replaceAll(/[^\d]*/g, '').slice(0, 15)
        linkInput1.value = number.slice(0, 5)
        if (number.length > 5) {
            linkInput2.value = number.slice(5, 10)
        }
        if (number.length > 10) {
            linkInput3.value = number.slice(10)
            linkInput3.focus()
            linkInput3.setSelectionRange(number.length - 10, number.length - 10)
        }
        else if (number.length >= 5) {
            linkInput2.focus()
            linkInput2.setSelectionRange(number.length - 5, number.length - 5)
        }
    })
    linkInput2.addEventListener('keyup', () => {
        const number = linkInput2.value.replaceAll(/[^\d]*/g, '').slice(0, 10)
        linkInput2.value = number.slice(0, 5)
        if (number.length >= 5) {
            linkInput3.value = number.slice(5, 10)
            linkInput3.focus()
            linkInput3.setSelectionRange(number.length - 5, number.length - 5)
        }
    })
    linkInput3.addEventListener('keyup', () => {
        const number = linkInput3.value.replaceAll(/[^\d]*/g, '').slice(0, 5)
        if (linkInput3.value !== number.slice(0, 5)) {
            linkInput3.value = number.slice(0, 5)
        }
    })

    function writeStateToDom (link) {
        linkingSection.style.display = link ? 'none' : ''
        unlinkSection.style.display = link ? '' : 'none'
        if (linkLinkText) {
            linkLinkText.style.display = link ? '' : 'none'
            linkLink.style.display = link ? '' : 'none'
            linkLink.innerText = link ? `https://manga.fochlac.com?link=${link.key}` : ''
            linkLink.href = link ? `https://manga.fochlac.com?link=${link.key}` : ''
        }
        linkNumberText.innerText = link ? formatKey(link.key) : 'Unlinked'
        linkNumberText.classList[link ? 'add' : 'remove']('linked')
    }

    const link = await db.link.read()
    writeStateToDom(link)

    if (updateLink) {
        updateLink.addEventListener('click', async () => {
            const key = getLinkQuery()

            linkInput1.value = key.slice(0, 5)
            linkInput2.value = key.slice(5, 10)
            linkInput3.value = key.slice(10, 15)
            await db.link.set(null)
            document.getElementById('link-link-warning').style.display = 'none'
            writeStateToDom()
            const result = await connectToLink(key, api, db)
            if (result) {
                writeStateToDom(result)
                linkInput1.value = ''
                linkInput2.value = ''
                linkInput3.value = ''
            }
        })
    }

    createLink.addEventListener('click', async () => {
        const linkLinkWarn = document.getElementById('link-error')

        if (linkLinkWarn) {
            linkLinkWarn.style.display = 'none'
        }
        const link = await db.link.read()
        if (!link) {
            const linkData = await db.link.local()
            const newLinkResult = await Link.insert(linkData)
            if (newLinkResult?.valid) {
                const link = newLinkResult.payload
                await db.link.set(link)
                writeStateToDom(link)
            }
        }
    })
    unlinkButton.addEventListener('click', async () => {
        const link = await db.link.read()
        if (link) {
            await db.link.set(null)
            writeStateToDom(undefined)
        }
    })
    linkButton.addEventListener('click', async () => {
        const link = await db.link.read()
        if (!link) {
            const key = `${linkInput1.value}${linkInput2.value}${linkInput3.value}`
            const result = await connectToLink(key, api, db)
            if (result) {
                writeStateToDom(result)
                linkInput1.value = ''
                linkInput2.value = ''
                linkInput3.value = ''
            }
        }
    })

    const darkModeInput = document.querySelector('#darkmode-toggle')
    const settings = await db.settings.local.read()
    if (settings.dark) {
        darkModeInput.checked = true
        document.querySelector('html').classList.add('dark')
    }
    darkModeInput.addEventListener('change', async (e) => {
        const settings = await db.settings.local.read()

        if (e.target.checked) {
            document.querySelector('html').classList.add('dark')
        }
        else {
            document.querySelector('html').classList.remove('dark')
        }

        db.settings.local.set({
            ...settings,
            dark: e.target.checked
        })
    })
}
