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
const scheduler_1 = require("./scheduler");
const nanoid = nanoid_1.customAlphabet(nanoid_1.urlAlphabet, 10);
const sourcesPath = path_1.resolve(__dirname, '../db/sources.json');
let sources = {};
try {
    sources = JSON.parse(fs_1.default.readFileSync(sourcesPath, { encoding: 'utf-8' }));
}
catch (e) {
    console.log(e);
}
function getSources() {
    return sources;
}
exports.getSources = getSources;
async function addSource(title, url, mangaId) {
    const entry = {
        title, url, id: nanoid(), mangaId
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
    const { title, url, mangaId } = rawSource;
    if (!title || !url || !mangaId) {
        throw new Error(`Error creating new source. Basic values are missing:\n${JSON.stringify(rawSource)}`);
    }
    let entry = Object.values(sources).find((source) => source.url === url && String(source.mangaId) === String(mangaId));
    if (!entry) {
        try {
            entry = await addSource(title, url, mangaId);
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
                throw new Error(`Error parsing raw source ${url}.`);
            }
            const entry = await createSourceIfNeeded(rawSource);
            if (entry) {
                res.status(200).json({ valid: true, payload: entry });
            }
            else {
                throw new Error(`Could not create new source for url ${url}.`);
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
}
exports.sourceController = sourceController;
