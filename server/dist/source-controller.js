"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceController = exports.getSources = void 0;
const fs_1 = __importDefault(require("fs"));
const nanoid_1 = require("nanoid");
const path_1 = require("path");
const check_source_1 = require("./check-source");
const parser_1 = require("./parser");
const scheduler_1 = require("./scheduler");
const url_controller_1 = require("./url-controller");
const nanoid = nanoid_1.customAlphabet(nanoid_1.urlAlphabet, 10);
const sourcesPath = path_1.resolve(__dirname, '../db/sources.json');
let sources = {};
try {
    sources = JSON.parse(fs_1.default.readFileSync(sourcesPath, { encoding: 'utf-8' }));
    const urls = url_controller_1.getUrls();
    let hasChanges = false;
    Object.values(sources).forEach((source) => {
        var _a;
        if (!source.url && source.type === 'madara') {
            const someChapterUrl = Object.values(urls).find((url) => url.sourceId === source.id);
            if (someChapterUrl) {
                sources[source.id].url = (_a = someChapterUrl.url.match(/https?:\/\/[^/]*\/[^/]*\/[^/]*\//)) === null || _a === void 0 ? void 0 : _a[0];
                hasChanges = true;
            }
        }
    });
    if (hasChanges) {
        fs_1.default.writeFile(sourcesPath, JSON.stringify(sources, null, 2), () => null);
    }
}
catch (e) {
    console.log(e);
}
function getSources() {
    return sources;
}
exports.getSources = getSources;
async function addSource(title, url, mangaId, type) {
    const entry = {
        title,
        url,
        id: nanoid(),
        mangaId,
        type
    };
    sources[entry.id] = entry;
    fs_1.default.writeFile(sourcesPath, JSON.stringify(sources, null, 2), () => null);
    return entry;
}
function removeSource(id) {
    if (sources[id]) {
        delete sources[id];
        fs_1.default.writeFile(sourcesPath, JSON.stringify(sources, null, 2), () => null);
        return true;
    }
    return false;
}
async function createSourceIfNeeded(rawSource) {
    const { title, url, mangaId, type } = rawSource;
    if (!title || !url || !mangaId || !type) {
        throw new Error(`Error creating new source. Basic values are missing:\n${JSON.stringify(rawSource)}`);
    }
    if (!parser_1.checkSourceType(type)) {
        throw new Error(`Error creating new source. Source type "${type}" is not supported.`);
    }
    let entry = Object.values(sources).find((source) => source.url === url && String(source.mangaId) === String(mangaId));
    if (!entry) {
        try {
            entry = await addSource(title, url, mangaId, type);
            await scheduler_1.fetchSource(entry, true);
        }
        catch (e) {
            removeSource(entry.id);
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
        const success = removeSource(id);
        res.status(200).json({ valid: success, payload: id });
    });
    app.get('/api/sources', (req, res) => {
        res.status(200).json({ valid: true, payload: Object.values(sources) });
    });
    app.get('/api/sources/stats', async (req, res) => {
        const urls = await url_controller_1.getUrls();
        const stats = Object.values(sources).reduce((stats, source) => {
            const host = source.url.split('/')[2].split('.').slice(-2).join('.');
            stats[host] = stats[host] || { latest: 0, sources: {}, count: 0 };
            const sourceChapters = Object.values(urls).filter((url) => url.sourceId === source.id);
            const latest = sourceChapters.reduce((latest, url) => latest > Number(url.created) ? latest : Number(url.created), 0);
            stats[host].latest = stats[host].latest >= latest ? stats[host].latest : latest;
            stats[host].count += sourceChapters.length;
            stats[host].sources[source.id] = {
                title: source.title,
                latest,
                count: sourceChapters.length
            };
            return stats;
        }, {});
        res.status(200).json({ valid: true, payload: stats });
    });
}
exports.sourceController = sourceController;
