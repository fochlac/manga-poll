"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSource = exports.fetchAll = exports.init = void 0;
const url_controller_1 = require("./url-controller");
const source_controller_1 = require("./source-controller");
const subscriptions_controller_1 = require("./subscriptions-controller");
const parser_1 = require("./parser");
async function fetchUrls(source, isNew = false) {
    let urls = [];
    urls = await parser_1.fetchChapterList(source);
    if (urls.length) {
        subscriptions_controller_1.sendTopicMessage(source.id);
        console.log(`${urls.length} new urls for ${source.title} on "${source.url.split('/')[2]}".`);
    }
    urls.forEach(url_controller_1.addUrl(source, isNew));
}
function fetchAllUrls(isNew) {
    return Promise.all(Object.values(source_controller_1.getSources()).map((source) => fetchUrls(source, isNew)
        .then(() => ({ hasError: false, source, error: null }))
        .catch((error) => ({ hasError: true, error, source }))))
        .then((results) => {
        results.forEach((result) => {
            var _a;
            if (result === null || result === void 0 ? void 0 : result.hasError) {
                console.log(`Error fetching urls for source ${(_a = result === null || result === void 0 ? void 0 : result.source) === null || _a === void 0 ? void 0 : _a.title}:\n`, result.error);
            }
        });
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
