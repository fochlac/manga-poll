"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSource = exports.addSource = exports.getSources = void 0;
const fs_1 = __importDefault(require("fs"));
const nanoid_1 = require("nanoid");
const path_1 = require("path");
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
exports.addSource = addSource;
function removeSource(id) {
    if (sources[id]) {
        delete sources[id];
        fs_1.default.writeFile(sourcesPath, JSON.stringify(sources, null, 2), () => null);
        return true;
    }
    return false;
}
exports.removeSource = removeSource;