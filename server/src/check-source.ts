import { parseSourceLink } from './parser'


export async function extractSourceIfPossible (url) {
    const rawSource = await parseSourceLink(url)
    
    if (!rawSource || !rawSource.title || !rawSource.url || !rawSource.mangaId || !rawSource.type) {
        console.log(`Core information missing for parsed Source : "${rawSource && JSON.stringify(rawSource)}"`)
        return null
    }
    return rawSource
}