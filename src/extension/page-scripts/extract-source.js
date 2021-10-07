import { testFanFox } from './test-fanfox'
import { testGenkan } from './test-genkan'
import { testLeviathan } from './test-leviathan'
import { testMadara } from './test-madara'
import { testMangadex } from './test-mangadex'
import { testMangastream } from './test-mangastream'
import { testWebtoons } from './test-webtoon'

export function extractSource () {
    let result

    if (window.location.host === 'fanfox.net') {
        result = testFanFox()
    }
    else if (window.location.host.includes('webtoons.com')) {
        result = testWebtoons()
    }
    else if (document.documentElement.innerHTML.includes('Powered by Genkan.')) {
        result = testGenkan()
    }
    else if (document.documentElement.innerHTML.includes('ts-breadcrumb bixbox')) {
        result = testMangastream()
    }
    else if (window.location.host.includes('leviatanscans.com') || window.location.host.includes('immortalupdates.com')) {
        result = testLeviathan()
    }
    else if (window.location.host === 'mangadex.org') {
        result = testMangadex()
    }
    else {
        result = testMadara()
    }

    if (result && result.title && result.url && result.id && result.type) {
        return result
    }
}
