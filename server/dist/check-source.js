"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSourceIfPossible = void 0;
const parser_1 = require("./parser");
async function extractSourceIfPossible(url) {
    const rawSource = await parser_1.parseSourceLink(url);
    if (!rawSource || !rawSource.title || !rawSource.url || !rawSource.mangaId || !rawSource.type) {
        const missingFields = [];
        if (rawSource) {
            if (!rawSource.title) {
                missingFields.push('title');
            }
            if (!rawSource.url) {
                missingFields.push('url');
            }
            if (!rawSource.mangaId) {
                missingFields.push('mangaId');
            }
            if (!rawSource.type) {
                missingFields.push('type');
            }
        }
        else {
            missingFields.push('all fields');
        }
        console.log(`Core information missing for parsed Source : "${rawSource && JSON.stringify(rawSource)}" is missing ${missingFields.join(', ')}.`);
        return null;
    }
    return rawSource;
}
exports.extractSourceIfPossible = extractSourceIfPossible;
