"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSourceIfPossible = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const parser_1 = require("./parser");
async function extractSourceIfPossible(url) {
    const body = await node_fetch_1.default(url)
        .then(res => res.text());
    let rawSource;
    if (body && body.length) {
        rawSource = parser_1.parseSourceLink(body, url);
    }
    if (!rawSource || !rawSource.title || !rawSource.url || !rawSource.mangaId || !rawSource.type) {
        return null;
    }
    return rawSource;
}
exports.extractSourceIfPossible = extractSourceIfPossible;
