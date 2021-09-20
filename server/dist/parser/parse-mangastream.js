"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const parser_1 = require("../parser");
const stats_1 = require("../stats");
const TYPE = 'mangastream';
async function testMangastream(rawUrl) {
    const sourcehtml = await node_fetch_1.default(rawUrl, { headers: parser_1.headers }).then(res => res.text());
    const $ = cheerio_1.default.load(sourcehtml);
    const breadcrumpLink = $('ol[itemtype="http://schema.org/BreadcrumbList"] li:has(meta[itemprop="position"][content="2"]) a[itemprop="item"][href*="/comics/"]');
    const url = breadcrumpLink.attr('href');
    const name = breadcrumpLink.find('span').text();
    return parser_1.createSource(TYPE, url === null || url === void 0 ? void 0 : url.split('/')[4], name, url);
}
function parseMangastream(source, body) {
    const $ = cheerio_1.default.load(body);
    const baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0);
    const host = source.url.split('/')[2].split('.').slice(-2).join('.');
    const urlList = $('#chapterlist li').toArray().map((elem) => {
        var _a;
        const rawDate = new Date($(elem).find('.chapterdate').text());
        return {
            url: $(elem).find('a').attr('href'),
            chapter: (_a = $(elem).data('num').match(/^\d+/)) === null || _a === void 0 ? void 0 : _a[0],
            host,
            created: !isNaN(rawDate.getTime()) ? rawDate.getTime() : baseDate.getTime()
        };
    });
    if (!(urlList === null || urlList === void 0 ? void 0 : urlList.length)) {
        stats_1.logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0);
        return [];
    }
    return urlList.filter(parser_1.createUrlFilter(source));
}
async function fetchMangastream(source) {
    try {
        const response = await node_fetch_1.default(source.url, { method: 'get', headers: parser_1.headers });
        const body = await parser_1.getResponseBody(response);
        return parseMangastream(source, body);
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.');
        stats_1.logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${(err === null || err === void 0 ? void 0 : err.message) || 'Unknown Error.'}`, 0);
        return [];
    }
}
const mangastream = {
    fetchFunction: fetchMangastream,
    type: TYPE,
    parseLink: testMangastream,
    parseCondition: async (url) => {
        const sourcehtml = await node_fetch_1.default(url, { headers: parser_1.headers }).then(res => res.text());
        return sourcehtml.includes('ts-breadcrumb bixbox');
    }
};
parser_1.registerParser(mangastream);
