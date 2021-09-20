"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const parser_1 = require("../parser");
const stats_1 = require("../stats");
const TYPE = 'mangadex';
const pageSize = 100;
async function fetchMangadex(source) {
    const host = source.url.split('/')[2].split('.').slice(-2).join('.');
    try {
        const result = await node_fetch_1.default(`${source.url}/feed?limit=${pageSize}`, { method: 'get' }).then((res) => res.json());
        let list = result.data;
        if (!(list === null || list === void 0 ? void 0 : list.length)) {
            stats_1.logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0);
            return [];
        }
        if (result.total > pageSize) {
            for (let offset = pageSize; offset <= result.total; offset += pageSize) {
                const offsetResult = await node_fetch_1.default(`${source.url}?limit=${pageSize}&offset=${offset}`, { method: 'get' })
                    .then((res) => res.json());
                list = list.concat(offsetResult.data);
            }
        }
        const urlList = list
            .filter((chapter) => { var _a; return (chapter === null || chapter === void 0 ? void 0 : chapter.type) === 'chapter' && ((_a = chapter.attributes) === null || _a === void 0 ? void 0 : _a.translatedLanguage) === 'en'; })
            .map((chapter) => {
            return {
                url: `https://mangadex.org/chapter/${chapter.id}/1`,
                chapter: chapter.attributes.chapter,
                host,
                created: new Date(chapter.attributes.publishAt).getTime()
            };
        });
        return urlList.filter(parser_1.createUrlFilter(source));
    }
    catch (err) {
        stats_1.logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${(err === null || err === void 0 ? void 0 : err.message) || 'Unknown Error.'}`, 0);
        return [];
    }
}
async function parseMangadexPage(rawUrl) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (/title\/[\d-\w]*\/[\d-\w]*/.test(rawUrl)) {
        const id = (_b = (_a = rawUrl.split('/title/')) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.split('/')[0];
        if (!id) {
            console.log('Could not extract id from manga link.');
            return null;
        }
        const mangaInfo = await node_fetch_1.default(`https://api.mangadex.org/manga/${id}`).then(r => r.json());
        if (((_c = mangaInfo === null || mangaInfo === void 0 ? void 0 : mangaInfo.data) === null || _c === void 0 ? void 0 : _c.type) !== 'manga') {
            console.log('Invalid id extracted from manga link.');
            return null;
        }
        return parser_1.createSource(TYPE, id, (_e = (_d = mangaInfo.data.attributes) === null || _d === void 0 ? void 0 : _d.title) === null || _e === void 0 ? void 0 : _e.en, `https://api.mangadex.org/manga/${id}`);
    }
    else if (/chapter\/[\d-\w]*(\/\d*)?/.test(rawUrl)) {
        const id = (_g = (_f = rawUrl.split('/chapter/')) === null || _f === void 0 ? void 0 : _f[1]) === null || _g === void 0 ? void 0 : _g.split('/')[0];
        if (!id) {
            console.log('Could not extract id from chapter link.');
            return null;
        }
        const chapterInfo = await node_fetch_1.default(`https://api.mangadex.org/chapter/${id}?includes[]=manga`).then(r => r.json());
        if (((_h = chapterInfo === null || chapterInfo === void 0 ? void 0 : chapterInfo.data) === null || _h === void 0 ? void 0 : _h.type) !== 'chapter') {
            console.log('Invalid id extracted from chapter link.');
            return null;
        }
        const mangaInfo = (_j = chapterInfo.relationships) === null || _j === void 0 ? void 0 : _j.find((rel) => (rel === null || rel === void 0 ? void 0 : rel.type) === 'manga');
        if (!mangaInfo) {
            console.log('Could not find manga for the chapter link.');
            return null;
        }
        const title = Object.values(((_k = mangaInfo.attributes) === null || _k === void 0 ? void 0 : _k.title) || {})[0];
        return {
            type: TYPE,
            mangaId: mangaInfo.id,
            title,
            url: `https://api.mangadex.org/manga/${mangaInfo.id}`
        };
    }
    else {
        console.log('Mangadex url of no chapter or manga posted.');
    }
}
const fanfox = {
    fetchFunction: fetchMangadex,
    type: TYPE,
    parseLink: parseMangadexPage,
    parseCondition: (url) => url.includes('mangadex.org')
};
parser_1.registerParser(fanfox);
