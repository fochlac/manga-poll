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
const TYPE = 'asura';
async function testAsura(rawUrl) {
    const sourcehtml = await node_fetch_1.default(rawUrl, { headers: parser_1.headers }).then(res => res.text());
    const $ = cheerio_1.default.load(sourcehtml);
    const breadcrumpLink = $('ol[itemtype="http://schema.org/BreadcrumbList"] a[itemprop="item"][href*="/comics/"]');
    const url = breadcrumpLink.attr('href');
    const name = breadcrumpLink.find('span').text();
    return {
        type: TYPE,
        mangaId: url === null || url === void 0 ? void 0 : url.split('/')[4],
        title: name,
        url
    };
}
function parseAsura(source, body) {
    const $ = cheerio_1.default.load(body);
    const baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0);
    const host = source.url.split('/')[2].split('.').slice(-2).join('.');
    const urlList = $('#chapterlist li').toArray().map((elem) => {
        const rawDate = new Date($(elem).find('.chapterdate').text());
        return {
            url: $(elem).find('a').attr('href'),
            chapter: $(elem).data('num'),
            host,
            created: !isNaN(rawDate.getTime()) ? rawDate.getTime() : baseDate.getTime()
        };
    });
    if (!(urlList === null || urlList === void 0 ? void 0 : urlList.length)) {
        stats_1.logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0);
        return [];
    }
    return urlList.filter((url) => {
        const isValid = /^https:\/\/(www\.)?asurascans.com\/.*/.test(url.url) &&
            /^[\d\.-]*$/.test(String(url.chapter)) && url.host && url.host.length > 0;
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
async function fetchAsura(source) {
    try {
        const response = await node_fetch_1.default(source.url, { method: 'get', headers: parser_1.headers });
        const body = await parser_1.getResponseBody(response);
        return parseAsura(source, body);
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.');
        stats_1.logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${(err === null || err === void 0 ? void 0 : err.message) || 'Unknown Error.'}`, 0);
        return [];
    }
}
const asura = {
    fetchFunction: fetchAsura,
    type: TYPE,
    parseLink: testAsura,
    parseCondition: (url) => url.includes('asurascans.com')
};
parser_1.registerParser(asura);
