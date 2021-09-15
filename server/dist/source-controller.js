"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceController = void 0;
const check_source_1 = require("./check-source");
const parser_1 = require("./parser");
const scheduler_1 = require("./scheduler");
const stats_1 = require("./stats");
const source_storage_1 = require("./source-storage");
async function createSourceIfNeeded(rawSource) {
    const { title, url, mangaId, type } = rawSource;
    if (!title || !url || !mangaId || !type) {
        throw new Error(`Error creating new source. Basic values are missing:\n${JSON.stringify(rawSource)}`);
    }
    if (!parser_1.checkSourceType(type)) {
        throw new Error(`Error creating new source. Source type "${type}" is not supported.`);
    }
    const sources = await source_storage_1.getSources();
    let entry = Object.values(sources).find((source) => source.url === url && String(source.mangaId) === String(mangaId));
    if (!entry) {
        try {
            entry = await source_storage_1.addSource(title, url, mangaId, type);
            await scheduler_1.fetchSource(entry, true);
        }
        catch (e) {
            source_storage_1.removeSource(entry.id);
            throw new Error(`Error fetching urls for new source ${entry === null || entry === void 0 ? void 0 : entry.title}:\n${JSON.stringify(entry)}\n${e.message}`);
        }
    }
    return entry;
}
function sourceController(app) {
    app.post('/api/sources', async (req, res) => {
        const entry = await createSourceIfNeeded(req.body);
        if (entry) {
            res.status(200).json({ valid: true, payload: entry });
        }
        else {
            res.status(400).json({ valid: false });
        }
    });
    app.post('/api/sources/addFromUrl', async (req, res) => {
        try {
            const { url } = req.body;
            if (!url) {
                throw new Error('No url passed to test endpoint.');
            }
            const rawSource = await check_source_1.extractSourceIfPossible(url);
            if (!rawSource) {
                throw new Error(`Error parsing raw source "${url}".`);
            }
            const entry = await createSourceIfNeeded(rawSource);
            if (entry) {
                res.status(200).json({ valid: true, payload: entry });
            }
            else {
                throw new Error(`Could not create new source for url "${url}".`);
            }
        }
        catch (e) {
            console.log(e.message);
            res.status(400).json({ valid: false });
        }
    });
    app.delete('/api/sources/:id', (req, res) => {
        const { id } = req.params;
        const success = source_storage_1.removeSource(id);
        res.status(200).json({ valid: success, payload: id });
    });
    app.get('/api/sources', async (req, res) => {
        const sources = await source_storage_1.getSources();
        res.status(200).json({ valid: true, payload: Object.values(sources) });
    });
    app.get('/api/sources/stats', async (req, res) => {
        const stats = await stats_1.getStats();
        res.status(200).json({ valid: true, payload: stats });
    });
}
exports.sourceController = sourceController;
