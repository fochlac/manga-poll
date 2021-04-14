"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSourceIfPossible = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const node_fetch_1 = __importDefault(require("node-fetch"));
function parse(string, fallback = undefined) {
    try {
        return JSON.parse(string);
    }
    catch (e) {
        return fallback;
    }
}
const idRegex = /["']?manga_id["']?:\s?["']?(\d{2,10})["']?/g;
const urlRegex = /["']?ajax_url["']?:\s?["']?(https?:\/\/[^/]*\/wp-admin\/admin-ajax.php)/;
function extractRawSource(sourcehtml, rawUrl) {
    var _a, _b;
    const $ = cheerio_1.default.load(sourcehtml);
    const ids = [
        ...(sourcehtml.match(idRegex) || []).map((str) => { var _a; return (_a = idRegex.exec(str)) === null || _a === void 0 ? void 0 : _a[1]; }),
        $('.rating-post-id').val(),
        $('.wp-manga-action-button[data-post]').first().data('post'),
        $('.chapter-selection[data-manga]').first().data('manga'),
        $('#manga-chapters-holder').data('id'),
        $('#manga-reading-nav-head').data('id'),
        $('#manga-reading-nav-foot').data('id')
    ]
        .filter((id) => !!id && String(id).length)
        .reduce((map, id) => {
        map[id] = typeof map[id] === 'number' ? map[id] + 1 : 1;
        return map;
    }, {});
    const mangaId = Object.keys(ids).sort((id1, id2) => ids[id1] - ids[id2])[0];
    const titles = [
        Array.from($('script[type="application/ld+json"]'))
            .map((script) => { var _a; return (_a = parse($(script).text())) === null || _a === void 0 ? void 0 : _a.headline; }).find((h) => h),
        $('#chapter-heading').text().split(' - ')[0],
        $('.post-title h1').text(),
        $('.rate-title').attr('title')
    ]
        .filter((title) => !!title && String(title).length)
        .reduce((map, title) => {
        map[String(title).trim()] = typeof map[title] === 'number' ? map[String(title).trim()] + 1 : 1;
        return map;
    }, {});
    const title = Object.keys(titles).sort((title1, title2) => titles[title1] - titles[title2])[0];
    const extractedUrl = (_a = /(https?:\/\/[^/]*)/.exec(rawUrl)) === null || _a === void 0 ? void 0 : _a[1];
    const urls = [
        (_b = urlRegex.exec(sourcehtml)) === null || _b === void 0 ? void 0 : _b[1],
        extractedUrl && `${extractedUrl}/wp-admin/admin-ajax.php`
    ]
        .filter((url) => !!url && String(url).length)
        .reduce((map, url) => {
        map[String(url).trim()] = typeof map[url] === 'number' ? map[String(url).trim()] + 1 : 1;
        return map;
    }, {});
    const url = Object.keys(urls).sort((url1, url2) => urls[url1] - urls[url2])[0];
    return {
        mangaId,
        title,
        url
    };
}
async function extractSourceIfPossible(url) {
    const body = await node_fetch_1.default(url)
        .then(res => res.text());
    if (body && body.length) {
        return extractRawSource(body, url);
    }
    return null;
}
exports.extractSourceIfPossible = extractSourceIfPossible;
