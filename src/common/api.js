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
        return fetch(`${baseUrl}/api/urls?sources=${sources.join(',')}&date=${date}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => data.payload || [])
    }

    function addSubscription (source, key) {
        return fetch(`${baseUrl}/api/subscriptions`, {
            method: 'post',
            body: JSON.stringify({
                topic: source.id,
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

    return {
        Urls: {
            read: readUrls
        },
        Source: {
            insert: postSource,
            fromUrl: addSourceFromUrl
        },
        Subscription: {
            subscribe: addSubscription
        }
    }
}
