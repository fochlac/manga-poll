const zip = require('zip-a-folder').zip

function zipFiles () {
    return Promise.all([
        zip('./dist/extension_chrome/', './dist/extension_chrome.zip')
            .then(() => console.log('Successfully packaged Chrome-Extension.'))
            .catch(() => console.log('Error packaging Chrome-Extension.')),
        zip('./dist/extension_firefox/', './dist/extension_firefox.zip')
            .then(() => console.log('Successfully packaged Firefox-Extension.'))
            .catch(() => console.log('Error packaging Firefox-Extension.')),
        zip('./dist/extension_firefox_source/', './dist/extension_firefox_source.zip')
            .then(() => console.log('Successfully packaged Firefox-Extension-Source.'))
            .catch(() => console.log('Error packaging Firefox-Extension-Source.'))
    ])
}

zipFiles()
