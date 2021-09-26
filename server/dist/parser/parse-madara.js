"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MADARA = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const form_data_1 = __importDefault(require("form-data"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const parser_1 = require("../parser");
const stats_1 = require("../stats");
const TYPE = 'madara';
const dateMonthFirst = /^[^\d]*(1[012]|0\d|\d)[^\d](3[0,1]|[012]\d|\d)[^\d](\d{2}|\d{4})[^\d]*$/;
const dateDayFirst = /^[^\d]*(3[0,1]|[012]\d|\d)[^\d](1[012]|0\d|\d)[^\d](\d{2}|\d{4})[^\d]*$/;
const monthWritten = /^[^\d]*[A-Za-z]{2,10}.{1,2}(3[0,1]|[012]\d|\d)[^\d]{1,3}\d{2}|\d{4}[^\d]*$/;
function getDateType(urlList) {
    const types = urlList.reduce((types, url) => {
        if (dateMonthFirst.test((url === null || url === void 0 ? void 0 : url.date) || '') || dateDayFirst.test((url === null || url === void 0 ? void 0 : url.date) || '')) {
            if (dateMonthFirst.test((url === null || url === void 0 ? void 0 : url.date) || '')) {
                types.dateMonthFirst = Object.prototype.hasOwnProperty.call(types, 'dateMonthFirst') ? types.dateMonthFirst + 1 : 1;
            }
            if (dateDayFirst.test((url === null || url === void 0 ? void 0 : url.date) || '')) {
                types.dateDayFirst = Object.prototype.hasOwnProperty.call(types, 'dateDayFirst') ? types.dateDayFirst + 1 : 1;
            }
        }
        else if (monthWritten.test((url === null || url === void 0 ? void 0 : url.date) || '')) {
            types.monthWritten = Object.prototype.hasOwnProperty.call(types, 'monthWritten') ? types.monthWritten + 1 : 1;
        }
        else {
            types.unparsable = Object.prototype.hasOwnProperty.call(types, 'unparsable') ? types.unparsable + 1 : 1;
        }
        return types;
    }, {});
    return Object.keys(types).reduce((type1, type2) => types[type1] > types[type2] ? type1 : type2, 'unparsable');
}
function parseDates(urlList) {
    const type = getDateType(urlList);
    return (url) => {
        const baseDate = new Date();
        baseDate.setHours(0, 0, 0, 0);
        let created = baseDate.getTime();
        const { date } = url;
        if (type === 'monthWritten' && typeof date === 'string' && date.trim().length && new Date(date.trim()).toJSON()) {
            created = new Date(date.trim()).getTime();
        }
        else if (typeof date === 'string' && date.length && type === 'dateDayFirst') {
            const [_full, day, month, year] = date.trim().match(dateDayFirst) || [];
            if (month && day && year) {
                const date = new Date();
                date.setFullYear(Number(year.length === 2 ? `20${year}` : year), Number(month) - 1, Number(day));
                date.setHours(0, 0, 0, 0);
                created = date.getTime();
            }
        }
        else if (typeof date === 'string' && date.length && type === 'dateMonthFirst') {
            const [_full, month, day, year] = date.trim().match(dateMonthFirst) || [];
            if (month && day && year) {
                const date = new Date();
                date.setFullYear(Number(year.length === 2 ? `20${year}` : year), Number(month) - 1, Number(day));
                date.setHours(0, 0, 0, 0);
                created = date.getTime();
            }
        }
        return {
            ...url,
            created,
            date: undefined
        };
    };
}
async function parseMadara(source, body) {
    const $ = cheerio_1.default.load(body);
    const host = source.url.split('/')[2].split('.').slice(-2).join('.');
    const urlList = $('li.wp-manga-chapter > a').toArray().map((elem) => {
        const url = $(elem).attr('href');
        const result = String(url).match(/^https?:\/\/([^/]*)\/.*\/([^/]*hapter[^/\d]*|ch[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/) || [];
        return {
            host,
            chapter: result[3],
            url,
            date: $(elem).closest('.wp-manga-chapter').find('.chapter-release-date').text()
        };
    });
    if (!(urlList === null || urlList === void 0 ? void 0 : urlList.length)) {
        stats_1.logWarning(host, `Invalid chapterlist found for ${source.title} on ${host}: Recieved empty URL-List`, 0);
        return [];
    }
    let newUrls = urlList
        .map(parseDates(urlList))
        .filter(parser_1.createUrlFilter(source, (url) => /^https?:\/\/.*\/([^/]*hapter[^/\d]*|ch[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/.test(url)));
    return parser_1.checkNewUrlAvailability(source, newUrls, (body) => {
        const $ = cheerio_1.default.load(body);
        if ($('#image-0').length && $('#image-1').length) {
            return true;
        }
        return false;
    });
}
const idRegex = /["']?manga_id["']?:\s?["']?(\d{2,10})["']?/g;
async function parseMadaraPage(rawUrl) {
    var _a;
    const sourcehtml = await node_fetch_1.default(rawUrl, { headers: parser_1.headers }).then(res => res.text());
    const $ = cheerio_1.default.load(sourcehtml);
    const ids = [
        ...(sourcehtml.match(idRegex) || []).map((str) => { var _a; return (_a = idRegex.exec(str)) === null || _a === void 0 ? void 0 : _a[1]; }),
        $('.rating-post-id').val(),
        $('.wp-manga-action-button[data-post]').first().data('post'),
        $('.chapter-selection[data-manga]').first().data('manga'),
        $('#manga-chapters-holder').data('id'),
        $('#manga-reading-nav-head').data('id'),
        $('#manga-reading-nav-foot').data('id')
    ]
        .filter((id) => !!id && String(id).length)
        .reduce((map, id) => {
        map[id] = typeof map[id] === 'number' ? map[id] + 1 : 1;
        return map;
    }, {});
    const mangaId = Object.keys(ids).sort((id1, id2) => ids[id1] - ids[id2])[0];
    const titles = [
        Array.from($('script[type="application/ld+json"]'))
            .map((script) => { var _a; return (_a = parser_1.parse($(script).text())) === null || _a === void 0 ? void 0 : _a.headline; }).find((h) => h),
        $('#chapter-heading').text().split(' - ')[0],
        $('.post-title h1').contents().filter((index, el) => el.nodeType === 3).text(),
        $('.rate-title').attr('title')
    ]
        .filter((title) => !!title && String(title).length)
        .reduce((map, title) => {
        const clean = parser_1.decodeHTMLEntities(title).trim();
        map[clean] = typeof map[clean] === 'number' ? map[clean] + 1 : 1;
        return map;
    }, {});
    const title = Object.keys(titles).sort((title1, title2) => titles[title1] - titles[title2])[0];
    let url = (_a = rawUrl.match(/https?:\/\/[^/]*\/[^/]*\/[^/]*\//)) === null || _a === void 0 ? void 0 : _a[0];
    return parser_1.createSource(TYPE, mangaId, title, url);
}
async function fetchMadara(source) {
    var _a, _b, _c;
    let body;
    let errortext;
    try {
        const resp = await node_fetch_1.default(source.url, { headers: parser_1.headers });
        try {
            body = await parser_1.getResponseBody(resp);
        }
        catch (err) {
            errortext = err;
        }
        if (body && ((_a = cheerio_1.default.load(body)('li.wp-manga-chapter > a')) === null || _a === void 0 ? void 0 : _a.length)) {
            return parseMadara(source, body);
        }
        else {
            const formData = new form_data_1.default();
            formData.append('action', 'manga_get_chapters');
            formData.append('manga', source.mangaId);
            const baseurl = (_b = source.url.match(/https?:\/\/[^/]*\//)) === null || _b === void 0 ? void 0 : _b[0];
            try {
                const response = await node_fetch_1.default(`${baseurl}wp-admin/admin-ajax.php`, { method: 'post', body: formData, headers: parser_1.headers });
                const body = await parser_1.getResponseBody(response);
                return parseMadara(source, body);
            }
            catch (err) {
                errortext = `${errortext || 'Could not find chapter list in body.'} + ${err}`;
            }
        }
        if (body && ((_c = cheerio_1.default.load(body)('#manga-chapters-holder')) === null || _c === void 0 ? void 0 : _c.length)) {
            console.log(source.title, parser_1.joinUrl(source.url, '/ajax/chapters/'));
            const resp = await node_fetch_1.default(parser_1.joinUrl(source.url, '/ajax/chapters/'), { headers: parser_1.headers, method: 'post' });
            try {
                body = await parser_1.getResponseBody(resp);
                console.log(source.title, body.slice(0, 1000));
                return parseMadara(source, body);
            }
            catch (err) {
                throw new Error(`${errortext} + ${err}`);
            }
        }
        return [];
    }
    catch (err) {
        const host = source.url.split('/')[2].split('.').slice(-2).join('.');
        stats_1.logWarning(host, `Error fetching chapterlist for ${source.title} on ${host}: ${(err === null || err === void 0 ? void 0 : err.message) || 'Unknown Error.'}`, 0);
        return [];
    }
}
const madara = {
    fetchFunction: fetchMadara,
    type: TYPE,
    parseLink: parseMadaraPage,
    parseCondition: () => false
};
exports.MADARA = TYPE;
parser_1.registerParser(madara);
