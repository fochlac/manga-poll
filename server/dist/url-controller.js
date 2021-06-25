"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlController = exports.getUrls = exports.addUrl = exports.updateUrl = exports.getUrlKey = void 0;
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
    const result = String(url).match(/^https?:\/\/([^/]*)\/.*\/([^/]*hapter[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/) || [];
    const chapter = result[3];
    const host = result[1];
    return `${host}--${sourceId}--${chapter}`;
}
exports.getUrlKey = getUrlKey;
function updateUrl(source, newUrl) {
    const key = getUrlKey(newUrl, source.id);
    if (urls[key] && urls[key].url !== newUrl) {
        urls[key].url = newUrl;
        clearTimeout(writeUrlsTimeout);
        writeUrlsTimeout = setTimeout(() => {
            fs_1.default.writeFile(urlsPath, JSON.stringify(urls, null, 2), () => null);
        }, 100);
    }
    return urls[key];
}
exports.updateUrl = updateUrl;
function addUrl(source, isNew = false) {
    return ({ url, created }) => {
        const entry = {
            url,
            id: getUrlKey(url, source.id),
            created: !isNew ? Date.now() : created,
            title: source.title,
            sourceId: source.id
        };
        urls[getUrlKey(url, source.id)] = entry;
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
function urlController(app) {
    app.post('/api/urls/fetch', (req, res) => {
        var _a, _b, _c;
        let payload = Object.values(urls);
        if (Array.isArray((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.sources) && req.body.sources.length > 0) {
            const sourceFilter = req.body.sources;
            payload = payload.filter((url) => sourceFilter.includes(url.sourceId));
        }
        if (!isNaN(Number((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.date)) && Number(req.body.date) > 0) {
            const limit = ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.limit) && !isNaN(Number(req.body.limit)) && Number(req.body.limit) || 25;
            const date = Number(req.body.date);
            let old = 0;
            payload = payload
                .sort((url1, url2) => url2.created - url1.created)
                .filter((url) => {
                if (url.created >= date) {
                    return true;
                }
                else if (old <= limit) {
                    old++;
                    return true;
                }
                return false;
            });
        }
        res.status(200).json({ valid: true, payload });
    });
}
exports.urlController = urlController;
