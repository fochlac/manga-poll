const fs = require('fs')
const path = require('path')
const zip = require('zip-a-folder').zip

function copyFileSync (source, target) {
    let targetFile = target

    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source))
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source))
}

function copyFolderSync (source, target, recursive = true, initial = true) {
    let files = []

    // Check if folder needs to be created or integrated
    const targetFolder = initial ? target : path.join(target, path.basename(source))
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder)
    }

    // Copy
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source)
        files.forEach((file) => {
            const curSource = path.join(source, file)
            if (fs.lstatSync(curSource).isDirectory()) {
                if (!recursive) {
                    return
                }
                copyFolderSync(curSource, targetFolder, recursive, false)
            }
            else {
                copyFileSync(curSource, targetFolder)
            }
        })
    }
}

function zipFiles () {
    return Promise.all([
        zip('./dist/extension_chrome/', './dist/extension_chrome.zip')
            .then(() => console.log('Successfully packaged Chrome-Extension.'))
            .catch((e) => console.log('Error packaging Chrome-Extension: ', e)),
        zip('./dist/extension_firefox/', './dist/extension_firefox.zip')
            .then(() => console.log('Successfully packaged Firefox-Extension.'))
            .catch((e) => console.log('Error packaging Firefox-Extension:', e)),
        zip('./dist/extension_firefox_source/', './dist/extension_firefox_source.zip')
            .then(() => console.log('Successfully packaged Firefox-Extension-Source.'))
            .catch((e) => console.log('Error packaging Firefox-Extension-Source:', e))
    ])
}

fs.mkdirSync('./dist/extension_firefox_source')
fs.mkdirSync('./dist/extension_firefox_source/src')
fs.mkdirSync('./dist/extension_firefox_source/static')
copyFolderSync('./', './dist/extension_firefox_source/', false)
copyFolderSync('./src/extension/', './dist/extension_firefox_source/src/extension/')
copyFolderSync('./src/common/', './dist/extension_firefox_source/src/common/')
copyFolderSync('./static/extension/', './dist/extension_firefox_source/static/extension/')
copyFolderSync('./static/extension_firefox/', './dist/extension_firefox_source/static/extension_firefox/')
fs.unlinkSync('./dist/extension_firefox_source/webpack.config.js')
copyFileSync('./dist/extension_firefox_source/webpack.config.ff.js', './dist/extension_firefox_source/webpack.config.js')

zipFiles()
