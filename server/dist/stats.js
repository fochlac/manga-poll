"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHosts = exports.getHosts = exports.getStats = exports.logWarning = exports.shouldWarn = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const source_storage_1 = require("./source-storage");
const url_storage_1 = require("./url-storage");
let warnings = {};
const warningsPath = path_1.resolve(__dirname, '../db/warnings.json');
try {
    warnings = JSON.parse(fs_1.readFileSync(warningsPath, { encoding: 'utf-8' }));
}
catch (e) {
    console.log(e);
}
function write() {
    fs_1.writeFile(warningsPath, JSON.stringify(warnings, null, 2), () => null);
}
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
    write();
    updateHosts();
    console.log(message);
}
exports.logWarning = logWarning;
const emptyStats = (url, warnings = []) => ({
    latest: 0,
    sources: {},
    count: 0,
    warnings,
    chapterWarnings: [],
    url,
    failureRate: {
        week: 0,
        day: 0,
        hour: 0
    }
});
const hourInMs = 60 * 60 * 1000;
const dayInMs = 24 * hourInMs;
const weekInMs = 7 * dayInMs;
const fetchesPerHour = 60 / 5;
const fetchesPerDay = 24 * fetchesPerHour;
const fetchesPerWeek = 7 * fetchesPerDay;
async function getStats() {
    const urls = await url_storage_1.getUrls();
    const sources = await source_storage_1.getSources();
    const stats = Object.values(sources).reduce((stats, source) => {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.');
        const url = source.url.split('/').slice(0, 3).join('/');
        stats[host] = stats[host] || emptyStats(url, warnings[host]);
        const sourceChapters = Object.values(urls).filter((url) => url.sourceId === source.id);
        const latest = sourceChapters.reduce((latest, url) => latest > Number(url.created) ? latest : Number(url.created), 0);
        const chapterWarnings = Object.keys(warnings)
            .filter(key => { var _a; return key.includes(url_storage_1.getUrlKey({ host: ((_a = sourceChapters[0]) === null || _a === void 0 ? void 0 : _a.host) || '', chapter: '' }, source.id)); })
            .reduce((chWarnings, warningKey) => chWarnings.concat(warnings[warningKey] || []), []);
        const weekWarnings = chapterWarnings.filter((warning) => (Date.now() - warning.date) < weekInMs);
        const dayWarnings = weekWarnings.filter((warning) => (Date.now() - warning.date) < dayInMs);
        const hourWarnings = dayWarnings.filter((warning) => (Date.now() - warning.date) < hourInMs);
        const weekFailPercentage = weekWarnings.length / fetchesPerWeek;
        const dayFailPercentage = dayWarnings.length / fetchesPerDay;
        const hourFailPercentage = hourWarnings.length / fetchesPerHour;
        stats[host].chapterWarnings = stats[host].chapterWarnings.concat(chapterWarnings);
        stats[host].latest = stats[host].latest >= latest ? stats[host].latest : latest;
        stats[host].count += sourceChapters.length;
        stats[host].sources[source.id] = {
            id: source.id,
            title: source.title,
            latest,
            count: sourceChapters.length,
            warnings: chapterWarnings,
            failureRate: {
                week: weekFailPercentage,
                day: dayFailPercentage,
                hour: hourFailPercentage
            }
        };
        return stats;
    }, {});
    Object.keys(stats).forEach((host) => {
        var _a, _b, _c;
        if ((_b = (_a = stats[host]) === null || _a === void 0 ? void 0 : _a.warnings) === null || _b === void 0 ? void 0 : _b.length) {
            const weekWarnings = (_c = stats[host]) === null || _c === void 0 ? void 0 : _c.warnings.filter((warning) => Date.now() - warning.date < weekInMs);
            const dayWarnings = weekWarnings.filter((warning) => Date.now() - warning.date < dayInMs);
            const hourWarnings = dayWarnings.filter((warning) => Date.now() - warning.date < hourInMs);
            const sources = Object.keys(stats[host].sources).length;
            const weekFailPercentage = weekWarnings.length / sources / fetchesPerWeek;
            const dayFailPercentage = dayWarnings.length / sources / fetchesPerDay;
            const hourFailPercentage = hourWarnings.length / sources / fetchesPerHour;
            stats[host].failureRate.week = weekFailPercentage;
            stats[host].failureRate.day = dayFailPercentage;
            stats[host].failureRate.hour = hourFailPercentage;
        }
    });
    return stats;
}
exports.getStats = getStats;
let hosts = { stable: [], unstable: [] };
function getHosts() {
    return hosts;
}
exports.getHosts = getHosts;
async function updateHosts() {
    const stats = await getStats();
    hosts = Object.keys(stats).reduce((hosts, host) => {
        let state = 'stable';
        if (stats[host].count <= 10 || stats[host].failureRate.week >= 0.1 ||
            Object.values(stats[host].sources).some((source) => source.failureRate.week >= 0.9)) {
            state = 'unstable';
        }
        const hostInfo = {
            name: host,
            url: stats[host].url,
            failureRate: stats[host].failureRate
        };
        hosts[state].push(hostInfo);
        return hosts;
    }, { stable: [], unstable: [] });
}
exports.updateHosts = updateHosts;
updateHosts();
