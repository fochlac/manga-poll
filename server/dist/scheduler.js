"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSource = exports.fetchAll = exports.init = void 0;
const form_data_1 = __importDefault(require("form-data"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const parse_madaro_1 = require("./parse-madaro");
const url_controller_1 = require("./url-controller");
const source_controller_1 = require("./source-controller");
// import { sendTopicMessage } from './subscriptions-controller'
async function fetchUrls(source, isNew = false) {
    const formData = new form_data_1.default();
    formData.append('action', 'manga_get_chapters');
    formData.append('manga', source.mangaId);
    const body = await node_fetch_1.default(source.url, { method: 'post', body: formData }).then((res) => res.text());
    const urls = parse_madaro_1.parseMadaro(source, body);
    if (urls.length) {
        // sendTopicMessage(source.id)
        console.log(`${urls.length} new urls for ${source.title}`);
    }
    urls.forEach(url_controller_1.addUrl(source, isNew));
}
function fetchAllUrls() {
    return Promise.all(Object.values(source_controller_1.getSources()).map((source) => fetchUrls(source)
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
    }, 60000 * 15);
    fetchAllUrls();
}
exports.init = init;
exports.fetchAll = () => fetchAllUrls();
exports.fetchSource = (source, isNew) => fetchUrls(source, isNew);
