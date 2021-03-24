function postSource(source) {
    return fetch("https://manga.fochlac.com/api/sources", {
            method: "post",
            body: JSON.stringify(source),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((e) => e)
            .then((data) => data.payload)
}

export const Source = {
    insert: postSource
}

function readUrls(sources = []) {
    return fetch(`https://manga.fochlac.com/api/urls?sources=${sources.join(',')}`)
        .then((res) => res.json())
        .then((data) => data.payload || [])
}

export const Urls = {
    read: readUrls
}