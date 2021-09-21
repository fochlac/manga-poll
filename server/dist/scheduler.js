"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSource = exports.fetchAll = exports.init = void 0;
const url_storage_1 = require("./url-storage");
const subscriptions_controller_1 = require("./subscriptions-controller");
const parser_1 = require("./parser");
const source_storage_1 = require("./source-storage");
const stats_1 = require("./stats");
async function fetchUrls(source, isNew = false) {
    let urls = [];
    urls = await parser_1.fetchChapterList(source);
    if (urls.length) {
        let page = source.url;
        try {
            page = source.url.split('/')[2].split('.').slice(-2).join('.');
        }
        catch (e) { }
        console.log(`${urls.length} new urls for ${source.title} on "${page}".`);
        subscriptions_controller_1.sendTopicMessage(source.id);
    }
    urls.forEach(url_storage_1.addUrl(source, isNew));
}
async function fetchAllUrls(isNew) {
    let results = [];
    const start = Date.now();
    const fetchPromiseMap = Object.values(source_storage_1.getSources())
        .reduce((promiseMap, source) => {
        const host = source.url.replace(/https?:\/\//, '').split('/')[0];
        const previousFetch = promiseMap[host] || Promise.resolve();
        promiseMap[host] = previousFetch.then(() => {
            const fetchPromise = fetchUrls(source, isNew)
                .then(() => ({ hasError: false, source, error: null }))
                .catch((error) => ({ hasError: true, error, source }))
                .then((result) => results.push(result));
            const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 2500));
            return Promise.all([fetchPromise, timeout]);
        });
        return promiseMap;
    }, {});
    await Promise.all(Object.values(fetchPromiseMap));
    stats_1.updateHosts();
    console.log('Fetching all chapters completed after', Math.ceil((Date.now() - start) / 1000), 'seconds.');
    return results.forEach((result) => {
        var _a;
        if (result === null || result === void 0 ? void 0 : result.hasError) {
            console.log(`Error fetching urls for source ${(_a = result === null || result === void 0 ? void 0 : result.source) === null || _a === void 0 ? void 0 : _a.title}:\n`, result.error);
        }
    });
}
let timer;
function init() {
    clearInterval(timer);
    timer = setInterval(() => {
        fetchAllUrls();
    }, 60000 * 5);
    fetchAllUrls(true);
}
exports.init = init;
exports.fetchAll = () => fetchAllUrls();
exports.fetchSource = (source, isNew) => fetchUrls(source, isNew);
