"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const parser_1 = require("../parser");
const url_controller_1 = require("../url-controller");
const TYPE = 'fanfox';
const warned = {};
function parseFanfox(source, body) {
    const $ = cheerio_1.default.load(body);
    const baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0);
    const host = source.url.replace(/https?:\/\//, '').split('/')[0];
    const urlList = $('#chapterlist .detail-main-list li').toArray().map((elem) => {
        const rawDate = new Date($(elem).find('.title2').text());
        const url = $(elem).find('a').attr('href');
        return {
            url: url.includes('https://fanfox.net') ? url : `https://fanfox.net${url}`,
            chapter: $(elem).find('.title3').text().replace(/^.*Ch\./, '').replace(/ - .*/, ''),
            host,
            created: !isNaN(rawDate.getTime()) ? rawDate.getTime() : baseDate.getTime()
        };
    });
    return urlList.filter((url) => {
        const isValid = /^https:\/\/fanfox.net\/manga\/.*\/c([\d.]*)\/1.html$/.test(url.url);
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
async function fetchFanFox(source) {
    const body = await node_fetch_1.default(source.url, { method: 'get' }).then((res) => res.text());
    return parseFanfox(source, body);
}
async function parseFanfoxPage(rawUrl) {
    var _a, _b;
    const sourcehtml = await node_fetch_1.default(rawUrl).then(res => res.text());
    const $ = cheerio_1.default.load(sourcehtml);
    const path = (_a = rawUrl.match(/\/manga\/[^/]*\//)) === null || _a === void 0 ? void 0 : _a[0];
    const name = $('.reader-header-title-1 a:first-child').text() || $('.detail-info-right-title-font').text();
    return {
        type: TYPE,
        id: path ? path.split('/')[2] : null,
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
