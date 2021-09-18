"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeHTMLEntities = exports.parse = exports.headers = exports.getResponseBody = exports.checkSourceType = exports.parseSourceLink = exports.fetchChapterList = exports.registerParser = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const defaultType = 'madara';
const parserMap = {};
const linkParserList = [];
let defaultLinkParser;
function registerParser({ type, fetchFunction, parseLink, parseCondition }) {
    parserMap[type] = fetchFunction;
    linkParserList.push({ parseLink, parseCondition });
    if (type === defaultType) {
        defaultLinkParser = parseLink;
    }
}
exports.registerParser = registerParser;
function fetchChapterList(source) {
    const type = source.type || defaultType;
    const fetchFunction = parserMap[source.type];
    if (!fetchFunction) {
        throw Error(`No fetch function for parser type ${type}.`);
    }
    return fetchFunction(source);
}
exports.fetchChapterList = fetchChapterList;
function parseSourceLink(link) {
    const parser = linkParserList.find(({ parseCondition }) => parseCondition(link));
    if (!parser) {
        console.log(`Could not find parser for url "${link}", using default parser.`);
    }
    return parser ? parser.parseLink(link) : defaultLinkParser(link);
}
exports.parseSourceLink = parseSourceLink;
function checkSourceType(type) {
    return !!parserMap[type];
}
exports.checkSourceType = checkSourceType;
async function getResponseBody(response) {
    const body = await response.text();
    if (body.includes('Access denied') && body.includes('Cloudflare')) {
        throw Error('Cloudflare-blockage detected.');
    }
    if (body.includes('id="cf-bubbles"')) {
        throw Error('(Temporary) Cloudflare-blockage detected.');
    }
    if (response.status >= 300) {
        throw Error(`Unable to get chapter page with response code "${response.status}".`);
    }
    return body;
}
exports.getResponseBody = getResponseBody;
exports.headers = {
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
function parse(string, fallback = undefined) {
    try {
        return JSON.parse(string);
    }
    catch (e) {
        return fallback;
    }
}
exports.parse = parse;
function decodeHTMLEntities(str) {
    if (str && typeof str === 'string') {
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        const $ = cheerio_1.default.load(`<div>${str}</div>`);
        return $('div').text();
    }
    return str;
}
exports.decodeHTMLEntities = decodeHTMLEntities;
