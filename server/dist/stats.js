"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHosts = exports.getHosts = exports.getStats = exports.logWarning = exports.shouldWarn = void 0;
const source_storage_1 = require("./source-storage");
const url_storage_1 = require("./url-storage");
const warnings = {};
function shouldWarn(key, limit) {
    return !warnings[key] || !limit || warnings[key].filter((warning) => Date.now() - warning.date <= 48 * 3600 * 1000).length < limit;
}
exports.shouldWarn = shouldWarn;
function logWarning(key, message, limit = 3) {
    if (!shouldWarn(key, limit)) {
        return;
    }
    if (!warnings[key]) {
        warnings[key] = [];
    }
    warnings[key].push({
        date: Date.now(),
        message
    });
    updateHosts();
    console.log(message);
}
exports.logWarning = logWarning;
async function getStats() {
    const urls = await url_storage_1.getUrls();
    const sources = await source_storage_1.getSources();
    return Object.values(sources).reduce((stats, source) => {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.');
        const url = source.url.split('/').slice(0, 3).join('/');
        stats[host] = stats[host] || { latest: 0, sources: {}, count: 0, warnings: warnings[host] || [], chapterWarnings: [], url };
        const sourceChapters = Object.values(urls).filter((url) => url.sourceId === source.id);
        const latest = sourceChapters.reduce((latest, url) => latest > Number(url.created) ? latest : Number(url.created), 0);
        const chapterWarnings = Object.keys(warnings)
            .filter(key => { var _a; return key.includes(url_storage_1.getUrlKey({ host: ((_a = sourceChapters[0]) === null || _a === void 0 ? void 0 : _a.host) || '', chapter: '' }, source.id)); })
            .reduce((chWarnings, warningKey) => chWarnings.concat(warnings[warningKey] || []), []);
        stats[host].chapterWarnings = stats[host].chapterWarnings.concat(chapterWarnings);
        stats[host].latest = stats[host].latest >= latest ? stats[host].latest : latest;
        stats[host].count += sourceChapters.length;
        stats[host].sources[source.id] = {
            title: source.title,
            latest,
            count: sourceChapters.length,
            warnings: chapterWarnings
        };
        return stats;
    }, {});
}
exports.getStats = getStats;
let hosts = { stable: [], unstable: [] };
function getHosts() {
    return hosts;
}
exports.getHosts = getHosts;
async function updateHosts() {
    const stats = await getStats();
    const weekInMs = 7 * 24 * 60 * 60 * 1000;
    hosts = Object.keys(stats).reduce((hosts, host) => {
        const recentWarnings = stats[host].warnings.filter((warning) => Date.now() - warning.date < weekInMs);
        const state = stats[host].count <= 10 || recentWarnings.length
            ? 'unstable'
            : 'stable';
        hosts[state].push({ name: host, url: stats[host].url });
        return hosts;
    }, { stable: [], unstable: [] });
}
exports.updateHosts = updateHosts;
updateHosts();
