"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const parser_1 = require("../parser");
const stats_1 = require("../stats");
const url_storage_1 = require("../url-storage");
const TYPE = 'fanfox';
function parseFanfox(source, body) {
    const $ = cheerio_1.default.load(body);
    const baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0);
    const host = source.url.split('/')[2].split('.').slice(-2).join('.');
    const urlList = $('#chapterlist .detail-main-list li').toArray().map((elem) => {
        const rawDate = new Date($(elem).find('.title2').text());
        const url = $(elem).find('a').attr('href');
        return {
            url: url.includes('https://fanfox.net') ? url : `https://fanfox.net${url}`,
            chapter: $(elem).find('.title3a').text().replace(/^.*Ch\./, '').replace(/ - .*/, ''),
            host,
            created: !isNaN(rawDate.getTime()) ? rawDate.getTime() : baseDate.getTime()
        };
    });
    if (!(urlList === null || urlList === void 0 ? void 0 : urlList.length)) {
        stats_1.logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`);
        return [];
    }
    return urlList.filter((url) => {
        const isValid = /^https:\/\/fanfox.net\/manga\/.*\/c([\d.]*)\/1.html$/.test(url.url);
        const key = url_storage_1.getUrlKey(url, source.id);
        const stored = url_storage_1.getUrls()[key];
        if (!isValid && !stored) {
            stats_1.logWarning(key, `Invalid url found for ${source.title}: ${JSON.stringify(url)}`);
        }
        if (isValid && stored) {
            url_storage_1.updateUrl(source, url);
        }
        return isValid && !stored;
    });
}
async function fetchFanFox(source) {
    try {
        const body = await node_fetch_1.default(source.url, { method: 'get', headers: { cookie: 'isAdult=1;' } }).then((res) => res.text());
        return parseFanfox(source, body);
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.');
        stats_1.logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${(err === null || err === void 0 ? void 0 : err.message) || 'Unknown Error.'}`);
        return [];
    }
}
async function parseFanfoxPage(rawUrl) {
    var _a, _b;
    const sourcehtml = await node_fetch_1.default(rawUrl).then(res => res.text());
    const $ = cheerio_1.default.load(sourcehtml);
    const path = (_a = rawUrl.match(/\/manga\/[^/]*\//)) === null || _a === void 0 ? void 0 : _a[0];
    const name = $('.reader-header-title-1 a:first-child').text() || $('.detail-info-right-title-font').text();
    return {
        type: TYPE,
        mangaId: path ? path.split('/')[2] : null,
        title: name,
        url: (_b = rawUrl.match(/^http.*fanfox.net\/manga\/[^/]*\//)) === null || _b === void 0 ? void 0 : _b[0]
    };
}
const fanfox = {
    fetchFunction: fetchFanFox,
    type: TYPE,
    parseLink: parseFanfoxPage,
    parseCondition: (url) => url.includes('fanfox.net')
};
parser_1.registerParser(fanfox);
