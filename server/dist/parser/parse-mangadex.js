"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const parser_1 = require("../parser");
const url_controller_1 = require("../url-controller");
const TYPE = 'mangadex';
const warned = {};
async function fetchMangadex(source) {
    const result = await node_fetch_1.default(`${source.url}/feed?limit=500`, { method: 'get' }).then((res) => res.json());
    let list = result.results;
    if (result.total > 500) {
        for (let offset = 500; offset <= result.total; offset += 500) {
            const offsetResult = await node_fetch_1.default(`${source.url}?limit=500&offset=${offset}`, { method: 'get' })
                .then((res) => res.json());
            list = list.concat(offsetResult.results);
        }
    }
    const urlList = list
        .filter((chapter) => { var _a, _b; return ((_a = chapter === null || chapter === void 0 ? void 0 : chapter.data) === null || _a === void 0 ? void 0 : _a.type) === 'chapter' && ((_b = chapter.data.attributes) === null || _b === void 0 ? void 0 : _b.translatedLanguage) === 'en'; })
        .map((chapter) => {
        return {
            url: `https://mangadex.org/chapter/${chapter.data.id}/1`,
            chapter: chapter.data.attributes.chapter,
            host: 'mangadex.org',
            created: new Date(chapter.data.attributes.publishAt).getTime()
        };
    });
    return urlList.filter((url) => {
        var _a, _b;
        const isValid = url.chapter && ((_b = (_a = url.url.split('/')) === null || _a === void 0 ? void 0 : _a[4]) === null || _b === void 0 ? void 0 : _b.length) && !isNaN(Number(url.created));
        const key = url_controller_1.getUrlKey(url, source.id);
        const stored = url_controller_1.getUrls()[key];
        if (!isValid && (warned[key] || 0) < 3) {
            console.log(`Invalid url found for ${source.title}: ${JSON.stringify(url)}`);
            warned[key] = typeof warned[key] === 'number' ? warned[key] + 1 : 0;
        }
        if (isValid && stored) {
            url_controller_1.updateUrl(source, url);
        }
        return isValid && !stored;
    });
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
        return {
            type: TYPE,
            mangaId: id,
            title: (_e = (_d = mangaInfo.data.attributes) === null || _d === void 0 ? void 0 : _d.title) === null || _e === void 0 ? void 0 : _e.en,
            url: `https://api.mangadex.org/manga/${id}`
        };
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
