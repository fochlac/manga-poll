"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSourceLink = exports.fetchChapterList = exports.registerParser = void 0;
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
    const fetchFunction = parserMap[source.type] || parserMap[defaultType];
    return fetchFunction(source);
}
exports.fetchChapterList = fetchChapterList;
function parseSourceLink(body, link) {
    const parser = linkParserList.find(({ parseCondition }) => parseCondition(link, body));
    return parser && parser.parseLink(body, link);
}
exports.parseSourceLink = parseSourceLink;
