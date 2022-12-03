function createApi (baseUrl, db) {
    let uid
    const getHeader = async () => {
        if (!uid) {
            uid = await db.settings.uid.read()
        }

        return {
            msuid: uid,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    async function postSource (source) {
        return fetch(`${baseUrl}/api/sources`, {
            method: 'post',
            body: JSON.stringify(source),
            headers: await getHeader()
        })
            .then((res) => res.json())
            .catch((error) => ({ valid: false, error }))
            .then((data) => data.payload)
    }

    async function addSourceFromUrl (url) {
        return fetch(`${baseUrl}/api/sources/addFromUrl`, {
            method: 'post',
            body: JSON.stringify({ url }),
            headers: await getHeader()
        })
            .then((res) => res.json())
            .catch((error) => ({ valid: false, error }))
    }

    async function checkSources (sources) {
        return fetch(`${baseUrl}/api/sources/bulkMatch`, {
            method: 'post',
            body: JSON.stringify({ sources }),
            headers: await getHeader()
        })
            .then((res) => res.json())
            .catch((error) => ({ valid: false, error }))
    }

    async function readUrls (sources = [], limit = '', date = '') {
        return fetch(
            `${baseUrl}/api/urls/fetch`,
            {
                method: 'post',
                body: JSON.stringify({
                    sources,
                    date,
                    limit
                }),
                headers: await getHeader()
            }
        )
            .then((res) => res.json())
            .then((data) => data.payload || [])
    }

    async function addSubscriptions (topics = [], key) {
        return fetch(`${baseUrl}/api/subscriptions`, {
            method: 'post',
            body: JSON.stringify({
                topics,
                key: key
            }),
            headers: await getHeader()
        })
            .then((res) => res.json())
            .catch((error) => ({ valid: false, error }))
    }

    async function deleteSubscriptions (topics = [], key) {
        return fetch(`${baseUrl}/api/subscriptions`, {
            method: 'delete',
            body: JSON.stringify({
                topics,
                key: key
            }),
            headers: await getHeader()
        })
            .then((res) => res.json())
            .catch((error) => ({ valid: false, error }))
    }

    async function readLink (key, changedSince) {
        return fetch(`${baseUrl}/api/links/${key}${changedSince ? `?changedSince=${changedSince}` : ''}`, {
            method: 'get',
            headers: await getHeader()
        })
            .then((res) => res.status === 304 ? ({ valid: true, payload: null }) : res.json())
            .catch((error) => ({ valid: false, error }))
    }

    async function readHosts () {
        return fetch(`${baseUrl}/api/sources/hosts`, {
            method: 'get',
            headers: await getHeader()
        })
            .then((res) => res.status === 304 ? ({ valid: true, payload: null }) : res.json())
            .catch((error) => ({ valid: false, error }))
    }

    async function updateLink (key, updateSet) {
        return fetch(`${baseUrl}/api/links/${key}`, {
            method: 'put',
            body: JSON.stringify(updateSet),
            headers: await getHeader()
        })
            .then((res) => res.json())
            .catch((error) => ({ valid: false, error }))
    }

    async function createLink (initSet) {
        return fetch(`${baseUrl}/api/links`, {
            method: 'post',
            body: JSON.stringify(initSet),
            headers: await getHeader()
        })
            .then((res) => res.json())
            .catch((error) => ({ valid: false, error }))
    }

    return {
        Urls: {
            read: readUrls
        },
        Source: {
            insert: postSource,
            fromUrl: addSourceFromUrl,
            checkSources
        },
        Subscription: {
            subscribe: addSubscriptions,
            unsubscribe: deleteSubscriptions
        },
        Link: {
            insert: createLink,
            update: updateLink,
            read: readLink
        },
        Hosts: {
            read: readHosts
        }
    }
}

const apis = {}

export const API = (baseUrl = '', db) => {
    if (!apis[baseUrl]) {
        apis[baseUrl] = createApi(baseUrl, db)
    }
    return apis[baseUrl]
}
