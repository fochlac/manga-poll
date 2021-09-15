"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrls = exports.addUrl = exports.updateUrl = exports.getUrlKey = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const urlsPath = path_1.resolve(__dirname, '../db/urls.json');
let urls = {};
try {
    urls = JSON.parse(fs_1.default.readFileSync(urlsPath, { encoding: 'utf-8' }));
}
catch (e) {
    console.log(e);
}
let writeUrlsTimeout = null;
function getUrlKey(url, sourceId) {
    const { chapter, host } = url;
    return `${host}--${sourceId}--${chapter}`;
}
exports.getUrlKey = getUrlKey;
function updateUrl(source, newUrl) {
    const key = getUrlKey(newUrl, source.id);
    if (urls[key] && urls[key].url !== newUrl.url || !urls[key].chapter) {
        urls[key].url = newUrl.url;
        urls[key].chapter = newUrl.chapter;
        urls[key].host = newUrl.host;
        clearTimeout(writeUrlsTimeout);
        writeUrlsTimeout = setTimeout(() => {
            fs_1.default.writeFile(urlsPath, JSON.stringify(urls, null, 2), () => null);
        }, 100);
    }
    return urls[key];
}
exports.updateUrl = updateUrl;
function addUrl(source, isNew = false) {
    return (newEntry) => {
        const entry = {
            url: newEntry.url,
            id: getUrlKey(newEntry, source.id),
            created: !isNew ? Date.now() : newEntry.created,
            chapter: newEntry.chapter,
            host: newEntry.host,
            title: source.title,
            sourceId: source.id
        };
        urls[getUrlKey(entry, source.id)] = entry;
        clearTimeout(writeUrlsTimeout);
        writeUrlsTimeout = setTimeout(() => {
            fs_1.default.writeFile(urlsPath, JSON.stringify(urls, null, 2), () => null);
        }, 100);
        return entry;
    };
}
exports.addUrl = addUrl;
function getUrls() {
    return urls;
}
exports.getUrls = getUrls;
