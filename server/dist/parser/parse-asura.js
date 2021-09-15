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
const headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "dnt": "1",
    "sec-ch-ua": '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
};
async function testAsura(rawUrl) {
    const sourcehtml = await node_fetch_1.default(rawUrl, { headers }).then(res => res.text());
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
        stats_1.logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`);
        return [];
    }
    return urlList.filter((url) => {
        const isValid = /^https:\/\/(www\.)?asurascans.com\/.*/.test(url.url);
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
        const body = await node_fetch_1.default(source.url, { method: 'get', headers }).then((res) => res.text());
        return parseAsura(source, body);
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.');
        stats_1.logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${(err === null || err === void 0 ? void 0 : err.message) || 'Unknown Error.'}`);
        return [];
    }
}
const asura = {
    fetchFunction: fetchAsura,
    type: TYPE,
    parseLink: testAsura,
    parseCondition: (url) => {
        if (url.includes('asurascans.com')) {
            console.log('asura: ', url);
            return true;
        }
    }
};
parser_1.registerParser(asura);
