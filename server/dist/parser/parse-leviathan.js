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
const TYPE = 'leviathan';
function parseLeviathan(source, body, url) {
    const $ = cheerio_1.default.load(body);
    const host = source.url.split('/')[2].split('.').slice(-2).join('.');
    const baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0);
    const urlList = $('li.wp-manga-chapter > a').toArray().map((elem) => {
        const url = $(elem).attr('href');
        const result = String(url).match(/^https?:\/\/([^/]*)\/.*\/([^/]*hapter[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/) || [];
        const date = $(elem).closest('.wp-manga-chapter').find('.chapter-release-date').text();
        const created = typeof date === 'string' && date.trim().length && new Date(date.trim()).toJSON()
            ? new Date(date.trim()).getTime()
            : baseDate.getTime();
        return {
            host,
            chapter: result[3],
            url,
            created
        };
    });
    if (!(urlList === null || urlList === void 0 ? void 0 : urlList.length)) {
        stats_1.logWarning(host, `Invalid chapterlist found for ${source.title} from ${url}: Recieved empty URL-List`, 0);
        return [];
    }
    const newUrls = urlList.filter((url) => {
        const isValid = /^https?:\/\/.*\/([^/]*hapter[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/.test(url.url);
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
    return newUrls;
}
async function parseLeviathanPage(rawUrl) {
    const sourcehtml = await node_fetch_1.default(rawUrl, { headers: parser_1.headers }).then(res => res.text());
    const $ = cheerio_1.default.load(sourcehtml);
    const titles = [
        Array.from($('script[type="application/ld+json"]'))
            .map((script) => { var _a; return (_a = parser_1.parse($(script).text())) === null || _a === void 0 ? void 0 : _a.headline; }).find((h) => h),
        $('#chapter-heading').text().split(' - ')[0],
        $('.post-title h1').contents().filter((index, el) => el.nodeType === 3).text(),
        $('.rate-title').attr('title')
    ]
        .filter((title) => !!title && String(title).length)
        .reduce((map, title) => {
        const clean = parser_1.decodeHTMLEntities(title).trim();
        map[clean] = typeof map[clean] === 'number' ? map[clean] + 1 : 1;
        return map;
    }, {});
    const title = Object.keys(titles).sort((title1, title2) => titles[title1] - titles[title2])[0];
    const baseUrl = rawUrl.split('/manga/')[0] + '/manga/';
    const mangaId = rawUrl.replace(baseUrl, '').split('/')[0];
    const url = `${baseUrl}${mangaId}`;
    return {
        type: TYPE,
        mangaId,
        title,
        url
    };
}
async function fetchLeviathan(source) {
    let body;
    let url;
    try {
        const baseUrl = await node_fetch_1.default(source.url.split('/').slice(0, 3).join('/'), { headers: parser_1.headers }).then((res) => res.url);
        url = `${baseUrl}/manga/${source.url.split('/manga/')[1]}/ajax/chapters`;
        url = url.slice(0, 10) + url.slice(10).replace(/\/\//g, '/');
        const response = await node_fetch_1.default(url, { method: 'post', headers: parser_1.headers });
        body = await parser_1.getResponseBody(response);
        return parseLeviathan(source, body, url);
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.');
        stats_1.logWarning(host, `Error fetching chapterlist for ${source.title} from ${url}: ${(err === null || err === void 0 ? void 0 : err.message) || 'Unknown Error.'}`, 0);
        return [];
    }
}
const leviathan = {
    fetchFunction: fetchLeviathan,
    type: TYPE,
    parseLink: parseLeviathanPage,
    parseCondition: (url) => url.includes('leviatanscans.com') || url.includes('immortalupdates.com')
};
parser_1.registerParser(leviathan);
