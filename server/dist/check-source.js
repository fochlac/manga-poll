"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSourceIfPossible = void 0;
const parser_1 = require("./parser");
async function extractSourceIfPossible(url) {
    const rawSource = await parser_1.parseSourceLink(url);
    if (!rawSource || !rawSource.title || !rawSource.url || !rawSource.mangaId || !rawSource.type) {
        console.log(`Core information missing for parsed Source : "${rawSource && JSON.stringify(rawSource)}"`);
        return null;
    }
    return rawSource;
}
exports.extractSourceIfPossible = extractSourceIfPossible;
