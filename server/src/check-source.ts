import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { parseSourceLink } from './parser'


export async function extractSourceIfPossible (url) {
    const body: string = await fetch(url)
        .then(res => res.text())
    let rawSource

    if (body && body.length) {
        rawSource = parseSourceLink(body, url)
    }
    
    if (!rawSource || !rawSource.title || !rawSource.url || !rawSource.mangaId || !rawSource.type) {
        return null
    }
    return rawSource
}