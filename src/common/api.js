export const API = (baseUrl = '') => {
    function postSource (source) {
        return fetch(`${baseUrl}/api/sources`, {
            method: 'post',
            body: JSON.stringify(source),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch((error) => ({ valid: false, error }))
            .then((data) => data.payload)
    }

    function addSourceFromUrl (url) {
        return fetch(`${baseUrl}/api/sources/addFromUrl`, {
            method: 'post',
            body: JSON.stringify({ url }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch((error) => ({ valid: false, error }))
    }

    function readUrls (sources = [], limit = '', date = '') {
        return fetch(
            `${baseUrl}/api/urls/fetch`,
            {
                method: 'post',
                body: JSON.stringify({
                    sources,
                    date,
                    limit
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((res) => res.json())
            .then((data) => data.payload || [])
    }

    function addSubscriptions (topics = [], key) {
        return fetch(`${baseUrl}/api/subscriptions`, {
            method: 'post',
            body: JSON.stringify({
                topics,
                key: key
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch((error) => ({ valid: false, error }))
    }

    function deleteSubscriptions (topics = [], key) {
        return fetch(`${baseUrl}/api/subscriptions`, {
            method: 'delete',
            body: JSON.stringify({
                topics,
                key: key
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch((error) => ({ valid: false, error }))
    }

    function readLink (key, changedSince) {
        return fetch(`${baseUrl}/api/links/${key}${changedSince ? `?changedSince=${changedSince}` : ''}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.status === 304 ? ({ valid: true, payload: null }) : res.json())
            .catch((error) => ({ valid: false, error }))
    }

    function updateLink (key, updateSet) {
        return fetch(`${baseUrl}/api/links/${key}`, {
            method: 'put',
            body: JSON.stringify(updateSet),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch((error) => ({ valid: false, error }))
    }

    function createLink (initSet) {
        return fetch(`${baseUrl}/api/links`, {
            method: 'post',
            body: JSON.stringify(initSet),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
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
            fromUrl: addSourceFromUrl
        },
        Subscription: {
            subscribe: addSubscriptions,
            unsubscribe: deleteSubscriptions
        },
        Link: {
            insert: createLink,
            update: updateLink,
            read: readLink
        }
    }
}
