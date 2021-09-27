/* global require */
const zip = require('zip-a-folder').zip

function zipFiles () {
    return Promise.all([
        zip('./dist/extension_chrome/', './dist/extension_chrome.zip'),
        zip('./dist/extension_firefox/', './dist/extension_firefox.zip'),
        zip('./dist/extension_firefox_source/', './dist/extension_firefox_source.zip')
    ])
}

zipFiles()
