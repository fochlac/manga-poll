import { addUrl, readSources } from "./db"
import cheerio from 'cheerio'

function createUrl(source) {
    return ({ url, date }) => {
        let created = Date.now()
        if (typeof date === 'string' && date.length && new Date(date).toJSON() && new Date(date).getTime() < Date.now()) {
            created = new Date(date).getTime()
        }
        const entry = { url, created, title: source.title, sourceId: source.id }
        addUrl(entry)
    }
}

async function fetchUrls(source) {
    const formData = new FormData()
    formData.append('action', 'manga_get_chapters')
    formData.append('manga', source.mangaId)
    
    const body = await fetch('https://manga.fochlac.com/proxy', { method: 'post', body: formData, headers: {'actual-target': source.url} })
        .then(res => res.text())
    const $ = cheerio.load(body);
    const urlList = $(source.selector).toArray().map(elem => {
        return {
            url: $(elem).attr('href'),
            date: $(elem).closest('.wp-manga-chapter').find('.chapter-release-date').text()
        }
    })
    return urlList.filter(({ url }) => {
        return /^https?:\/\/.*\/[^\/]*hapter[^\/\d]*(\d*)[^\d\/]*[^\/]*\//.test(url)
    })
}

export async function fetchAllUrls() {
    const sources = await readSources()
    Object.values(sources).forEach(async (source) => {
        const urls = await fetchUrls(source)
        if (urls.length) {
            urls.forEach(createUrl(source))
        }
    })
}
