"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const parser_1 = require("../parser");
const stats_1 = require("../stats");
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
            url: url.includes('https://fanfox.net') ? url : parser_1.joinUrl('https://fanfox.net', url),
            chapter: $(elem).find('.title3a').text().replace(/^.*Ch\./, '').replace(/ - .*/, ''),
            host,
            created: !isNaN(rawDate.getTime()) ? rawDate.getTime() : baseDate.getTime()
        };
    });
    if (!(urlList === null || urlList === void 0 ? void 0 : urlList.length)) {
        stats_1.logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0);
        return [];
    }
    return urlList.filter(parser_1.createUrlFilter(source, (url) => /^https:\/\/fanfox.net\/manga\/.*\/c([\d.]*)\/1.html$/.test(url)));
}
async function fetchFanFox(source) {
    try {
        const response = await node_fetch_1.default(source.url, { method: 'get', headers: { ...parser_1.headers, cookie: 'isAdult=1;' } });
        const body = await parser_1.getResponseBody(response);
        return parseFanfox(source, body);
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.');
        stats_1.logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${(err === null || err === void 0 ? void 0 : err.message) || 'Unknown Error.'}`, 0);
        return [];
    }
}
async function parseFanfoxPage(rawUrl) {
    var _a, _b;
    const sourcehtml = await node_fetch_1.default(rawUrl, { headers: { ...parser_1.headers, cookie: 'isAdult=1;' } }).then(res => res.text());
    const $ = cheerio_1.default.load(sourcehtml);
    const path = (_a = rawUrl.match(/\/manga\/[^/]*\//)) === null || _a === void 0 ? void 0 : _a[0];
    const title = $('.reader-header-title-1 a:first-child').text() || $('.detail-info-right-title-font').text();
    return parser_1.createSource(TYPE, path === null || path === void 0 ? void 0 : path.split('/')[2], title, (_b = rawUrl.match(/^http.*fanfox.net\/manga\/[^/]*\//)) === null || _b === void 0 ? void 0 : _b[0]);
}
const fanfox = {
    fetchFunction: fetchFanFox,
    type: TYPE,
    parseLink: parseFanfoxPage,
    parseCondition: (url) => url.includes('fanfox.net')
};
parser_1.registerParser(fanfox);
