import cheerio from 'cheerio'
import fetch from 'node-fetch'

function parse(string, fallback = undefined) {
    try {
        return JSON.parse(string)
    }
    catch (e) {
        return fallback
    }
}

const idRegex = /["']?manga_id["']?:\s?["']?(\d{2,10})["']?/g
const urlRegex = /["']?ajax_url["']?:\s?["']?(https?:\/\/[^/]*\/wp-admin\/admin-ajax.php)/


function extractRawSource (sourcehtml: string, rawUrl: string) {
    const $ = cheerio.load(sourcehtml)

    const ids = [
        ...(sourcehtml.match(idRegex) || []).map((str) => idRegex.exec(str)?.[1]),
        $('.rating-post-id').val(),
        $('.wp-manga-action-button[data-post]').first().data('post'),
        $('.chapter-selection[data-manga]').first().data('manga'),
        $('#manga-chapters-holder').data('id'),
        $('#manga-reading-nav-head').data('id'),
        $('#manga-reading-nav-foot').data('id')
    ]
        .filter((id) => !!id && String(id).length)
        .reduce((map, id) => {
            map[id] = typeof map[id] === 'number' ? map[id] + 1 : 1
            return map
        }, {})

    const mangaId = Object.keys(ids).sort((id1, id2) => ids[id1] - ids[id2])[0]

    const titles = [
        Array.from($('script[type="application/ld+json"]'))
            .map((script) => parse($(script).text())?.headline).find((h) => h),
        $('#chapter-heading').text().split(' - ')[0],
        $('.post-title h1').text(),
        $('.rate-title').attr('title')
    ]
        .filter((title) => !!title && String(title).length)
        .reduce((map, title) => {
            map[String(title).trim()] = typeof map[title] === 'number' ? map[String(title).trim()] + 1 : 1
            return map
        }, {})
    const title = Object.keys(titles).sort((title1, title2) => titles[title1] - titles[title2])[0]

    const extractedUrl = /(https?:\/\/[^/]*)/.exec(rawUrl)?.[1]
    const urls = [
        urlRegex.exec(sourcehtml)?.[1],
        extractedUrl && `${extractedUrl}/wp-admin/admin-ajax.php`
    ]
        .filter((url) => !!url && String(url).length)
        .reduce((map, url) => {
            map[String(url).trim()] = typeof map[url] === 'number' ? map[String(url).trim()] + 1 : 1
            return map
        }, {})

    const url = Object.keys(urls).sort((url1, url2) => urls[url1] - urls[url2])[0]

    return {
        mangaId,
        title,
        url
    }
}

export async function extractSourceIfPossible (url) {
    const body: string = await fetch(url)
        .then(res => res.text())
    
    if (body && body.length) {
        return extractRawSource(body, url)
    }
    return null
}