import { extractSource } from './page-scripts/extract-source'

const controller = chrome || browser

function test () {
    const result = extractSource()

    if (result) {
        controller.runtime.sendMessage(result)
    }
}

test()
