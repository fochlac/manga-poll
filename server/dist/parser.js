"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSourceType = exports.parseSourceLink = exports.fetchChapterList = exports.registerParser = void 0;
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
