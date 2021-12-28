const fs = require('fs')
require('colors')
const Diff = require('diff')

function getValue (diff) {
    return diff && !diff.added && !diff.removed && diff.value || ''
}
function testFile (filename) {
    const src_cs_1 = fs.readFileSync(`./dist/extension_firefox/${filename}`, 'utf8')
    const src_cs_2 = fs.readFileSync(`./dist/extension_firefox_source/dist/extension_firefox/${filename}`, 'utf8')

    if (src_cs_1 !== src_cs_2) {
        const diff = Diff.diffChars(src_cs_1, src_cs_2)
        process.stderr.write(`\nDiff found in "${filename}": \n`['yellow'])
        let hasNewline = true
        let prevText = ''
        diff.forEach((part, index) => {
            const nextText = getValue(diff[index + 1]) + getValue(diff[index + 2]) + getValue(diff[index + 3])
            if (part.added) {
                hasNewline = false
                process.stderr.write(prevText.slice(-20)['grey'])
                process.stderr.write(part.value['green'])
                process.stderr.write(nextText.slice(0, 20)['grey'])
            }
            else if (part.removed) {
                hasNewline = false
                process.stderr.write(prevText.slice(-20)['grey'])
                process.stderr.write(part.value['red'])
                process.stderr.write(nextText.slice(0, 20)['grey'])
            }
            else if (!hasNewline) {
                prevText += part.value
                hasNewline = true
                process.stderr.write('\n')
            }
            else {
                prevText += part.value
            }
        })
    }
    else {
        console.log(`No diff in ${filename}`)
    }
}

['content-script.js', 'test-bookmark.js', 'sw.js', 'popup.js', 'popup.css', 'popup.html'].forEach(testFile)

