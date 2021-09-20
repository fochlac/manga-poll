"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const parser_1 = require("../parser");
const stats_1 = require("../stats");
const TYPE = 'genkan';
async function testGenkan(rawUrl) {
    const [url, id] = rawUrl.match(/https?:\/\/[^/]*\/comics\/(\d*)-[-\w\d]*/) || [];
    if (!url || !id) {
        throw Error(`Could not extract url and/or id from genkan page. url: ${url} id: ${id}`);
    }
    const sourcehtml = await node_fetch_1.default(url, { headers: parser_1.headers }).then(res => res.text());
    const $ = cheerio_1.default.load(sourcehtml);
    const title = $('meta[property*="title"]').attr('content');
    return parser_1.createSource(TYPE, id, title, url);
}
function parseDate(dateString) {
    var _a;
    const baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0);
    const amount = Number((_a = dateString.match(/\d+/)) === null || _a === void 0 ? void 0 : _a[0]);
    if (isNaN(amount)) {
        return baseDate.getTime();
    }
    if (dateString.includes('inutes')) {
        return Date.now() - amount * 60 * 1000;
    }
    if (dateString.includes('hour')) {
        return Date.now() - amount * 60 * 60 * 1000;
    }
    if (dateString.includes('day')) {
        return Date.now() - amount * 24 * 60 * 60 * 1000;
    }
    if (dateString.includes('week')) {
        return Date.now() - amount * 7 * 24 * 60 * 60 * 1000;
    }
    const date = new Date();
    if (dateString.includes('onth')) {
        date.setMonth(date.getMonth() - amount);
        return date.getTime();
    }
    if (dateString.includes('ear')) {
        date.setFullYear(date.getFullYear() - amount);
        return date.getTime();
    }
    return baseDate.getTime();
}
async function fetchGenkan(source) {
    try {
        const response = await node_fetch_1.default(source.url, { method: 'get', headers: parser_1.headers });
        const body = await parser_1.getResponseBody(response);
        const $ = cheerio_1.default.load(body);
        const host = source.url.split('/')[2].split('.').slice(-2).join('.');
        const urlList = $('#content > .container > .row > .col-lg-9 .card .list-item').toArray().map((elem) => {
            const chapter = $(elem).find('span').text().trim();
            return {
                url: $(elem).find('a').attr('href'),
                chapter,
                host,
                created: parseDate($(elem).find('.item-company').text()) + (!isNaN(Number(chapter)) ? Number(chapter) : 0)
            };
        });
        if (!(urlList === null || urlList === void 0 ? void 0 : urlList.length)) {
            stats_1.logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0);
            return [];
        }
        return urlList.filter(parser_1.createUrlFilter(source));
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.');
        stats_1.logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${(err === null || err === void 0 ? void 0 : err.message) || 'Unknown Error.'}`, 0);
        return [];
    }
}
const genkan = {
    fetchFunction: fetchGenkan,
    type: TYPE,
    parseLink: testGenkan,
    parseCondition: async (url) => {
        const sourcehtml = await node_fetch_1.default(url, { headers: parser_1.headers }).then(res => res.text());
        return sourcehtml.includes('Powered by Genkan.');
    }
};
parser_1.registerParser(genkan);
