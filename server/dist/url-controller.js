"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlController = void 0;
const url_storage_1 = require("./url-storage");
function urlController(app) {
    app.post('/api/urls/fetch', async (req, res) => {
        var _a, _b, _c;
        let payload = [];
        const urls = await url_storage_1.getUrls();
        if (Array.isArray((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.sources) && req.body.sources.length > 0) {
            const sourceFilter = req.body.sources;
            payload = Object.values(urls).filter((url) => sourceFilter.includes(url.sourceId));
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
