"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlController = exports.getUrls = exports.addUrl = void 0;
const fs_1 = __importDefault(require("fs"));
const nanoid_1 = require("nanoid");
const path_1 = require("path");
const nanoid = nanoid_1.customAlphabet(nanoid_1.urlAlphabet, 10);
const urlsPath = path_1.resolve(__dirname, '../db/urls.json');
let urls = {};
try {
    urls = JSON.parse(fs_1.default.readFileSync(urlsPath, { encoding: 'utf-8' }));
}
catch (e) {
    console.log(e);
}
let writeUrlsTimeout = null;
function addUrl(source, isNew = false) {
    return ({ url, created, type }) => {
        const entry = {
            url,
            id: nanoid(),
            created: type === 'unparseable' && !isNew ? Date.now() : created,
            title: source.title,
            sourceId: source.id
        };
        urls[url] = entry;
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
    app.get('/api/urls', (req, res) => {
        var _a, _b, _c;
        let payload = Object.values(urls);
        if (typeof ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.sources) === 'string' && req.query.sources.length > 0) {
            const sourceFilter = req.query.sources.split(',');
            payload = payload.filter((url) => sourceFilter.includes(url.sourceId));
        }
        if (!isNaN(Number((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.date)) && Number(req.query.date) > 0) {
            const limit = ((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.limit) && !isNaN(Number(req.query.limit)) && Number(req.query.limit) || 25;
            const date = Number(req.query.date);
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
