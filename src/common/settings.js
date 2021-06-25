const linkFields = ['hide', 'hiddenChapters', 'sources']

export function getLinkHelpers (db, Api) {
    async function pushLinkUpdate (changes) {
        const changeset = linkFields.filter((key) => Object.keys(changes).some((change) => change.includes(key)))

        if (changeset.length) {
            const link = await db.link.read()
            const local = await db.link.local()
            const changes = {}
            if (changeset.includes('hide') && String(link.hide) !== String(local.hide)) {
                changes.hide = local.hide
            }
            if (
                changeset.includes('hiddenChapters') &&
                JSON.stringify(link.hiddenChapters) !== JSON.stringify(local.hiddenChapters)
            ) {
                changes.hiddenChapters = local.hiddenChapters
            }
            if (changeset.includes('sources') && (
                link.sources?.length !== local.sources.length ||
                link.sources.some((source) => source && !local.sources.includes(source.id))
            )) {
                changes.sources = local.sources
            }

            if (Object.keys(changes).length) {
                Api.Link.update(link.key, changes)
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
                        db.link.setLocal(res.payload)
                        db.link.set(res.payload)
                    }
                })
        }
    }
    return {
        pushLinkUpdate,
        fetchLinkUpdate
    }
}

export async function addSettingsHandlers (db, api) {
    const { Link } = api

    const createLink = document.getElementById('new-link-button')
    const linkNumberText = document.getElementById('link-id')
    const linkingSection = document.getElementById('link-section')
    const unlinkSection = document.getElementById('unlink-section')
    const unlinkButton = document.getElementById('unlink-button')
    const linkButton = document.getElementById('link-button')
    // const linkingToggle = document.getElementById('link-toggle')
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
        else if (number.length > 5) {
            linkInput2.focus()
            linkInput2.setSelectionRange(number.length - 5, number.length - 5)
        }
    })
    linkInput2.addEventListener('keyup', () => {
        const number = linkInput2.value.replaceAll(/[^\d]*/g, '').slice(0, 10)
        linkInput2.value = number.slice(0, 5)
        if (number.length > 5) {
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

    function writeStateToDom (link, enabled) {
        linkingSection.style.display = link ? 'none' : ''
        unlinkSection.style.display = link ? '' : 'none'
        // linkingToggle.disabled = !link
        // linkingToggle.checked = enabled
        linkNumberText.innerText = link ? `${link.key.slice(0, 5)}-${link.key.slice(5, 10)}-${link.key.slice(10)}` : 'Unlinked'
        linkNumberText.style.color = link ? '#000c21' : '#c3cbd2'
    }

    const link = await db.link.read()
    const enabled = await db.link.getEnabled()
    writeStateToDom(link, enabled)

    createLink.addEventListener('click', async () => {
        const link = await db.link.read()
        if (!link) {
            const linkData = await db.link.local()
            const newLinkResult = await Link.insert(linkData)
            if (newLinkResult?.valid) {
                const link = newLinkResult.payload
                await db.link.set(link)
                await db.link.setEnabled(true)
                writeStateToDom(link, true)
            }
        }
    })
    unlinkButton.addEventListener('click', async () => {
        const link = await db.link.read()
        if (link) {
            await db.link.set(null)
            await db.link.setEnabled(false)
            writeStateToDom(undefined, true)
        }
    })
    linkButton.addEventListener('click', async () => {
        const link = await db.link.read()
        if (!link) {
            const key = `${linkInput1.value}${linkInput2.value}${linkInput3.value}`
            const linkResult = await Link.read(key)
            if (linkResult?.valid) {
                const link = linkResult.payload
                await db.link.set(link)
                await db.link.setEnabled(true)
                await db.link.setLocal(link)
                writeStateToDom(link, true)
                linkInput1.value = ''
                linkInput2.value = ''
                linkInput3.value = ''
            }
        }
    })

    // linkingToggle.addEventListener('change', async (e) => {
    //     db.link.setEnabled(e.target.checked)
    // })
}
