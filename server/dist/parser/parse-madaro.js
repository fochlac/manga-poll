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
const url_controller_1 = require("../url-controller");
const TYPE = 'madara';
const warned = {};
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
function parseDates(urlList, type) {
    return urlList.map((url) => {
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
            created
        };
    });
}
function parseMadaro(source, body) {
    const $ = cheerio_1.default.load(body);
    const host = source.url.replace(/https?:\/\//, '').split('/')[0];
    const urlList = $('li.wp-manga-chapter > a').toArray().map((elem) => {
        const url = $(elem).attr('href');
        const result = String(url).match(/^https?:\/\/([^/]*)\/.*\/([^/]*hapter[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/) || [];
        return {
            host,
            chapter: result[3],
            url,
            date: $(elem).closest('.wp-manga-chapter').find('.chapter-release-date').text()
        };
    });
    const newUrls = urlList.filter((url) => {
        const isValid = /^https?:\/\/.*\/([^/]*hapter[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/.test(url.url);
        const key = url_controller_1.getUrlKey(url, source.id);
        const stored = url_controller_1.getUrls()[key];
        if (!isValid && (warned[key] || 0) < 3) {
            console.log(`Invalid url found for ${source.title}: ${JSON.stringify(url)}`);
            warned[key] = typeof warned[key] === 'number' ? warned[key] + 1 : 0;
        }
        if (isValid && stored) {
            url_controller_1.updateUrl(source, url);
        }
        return isValid && !stored;
    });
    const type = getDateType(urlList);
    return parseDates(newUrls, type);
}
function parse(string, fallback = undefined) {
    try {
        return JSON.parse(string);
    }
    catch (e) {
        return fallback;
    }
}
const idRegex = /["']?manga_id["']?:\s?["']?(\d{2,10})["']?/g;
const urlRegex = /["']?ajax_url["']?:\s?["']?(https?:\/\/[^/]*\/wp-admin\/admin-ajax.php)/;
function decodeHTMLEntities(str) {
    if (str && typeof str === 'string') {
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        const $ = cheerio_1.default.load(`<div>${str}</div>`);
        return $('div').text();
    }
    return str;
}
function parseMadaroPage(sourcehtml, rawUrl) {
    var _a, _b;
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
            .map((script) => { var _a; return (_a = parse($(script).text())) === null || _a === void 0 ? void 0 : _a.headline; }).find((h) => h),
        $('#chapter-heading').text().split(' - ')[0],
        $('.post-title h1').contents().filter((index, el) => el.nodeType === 3).text(),
        $('.rate-title').attr('title')
    ]
        .filter((title) => !!title && String(title).length)
        .reduce((map, title) => {
        const clean = decodeHTMLEntities(title).trim();
        map[clean] = typeof map[clean] === 'number' ? map[clean] + 1 : 1;
        return map;
    }, {});
    const title = Object.keys(titles).sort((title1, title2) => titles[title1] - titles[title2])[0];
    const extractedUrl = (_a = /(https?:\/\/[^/]*)/.exec(rawUrl)) === null || _a === void 0 ? void 0 : _a[1];
    const urls = [
        (_b = urlRegex.exec(sourcehtml)) === null || _b === void 0 ? void 0 : _b[1],
        extractedUrl && `${extractedUrl}/wp-admin/admin-ajax.php`
    ]
        .filter((url) => !!url && String(url).length)
        .reduce((map, url) => {
        map[String(url).trim()] = typeof map[url] === 'number' ? map[String(url).trim()] + 1 : 1;
        return map;
    }, {});
    const url = Object.keys(urls).sort((url1, url2) => urls[url1] - urls[url2])[0];
    return {
        type: TYPE,
        mangaId,
        title,
        url
    };
}
async function fetchMadaro(source) {
    const formData = new form_data_1.default();
    formData.append('action', 'manga_get_chapters');
    formData.append('manga', source.mangaId);
    const body = await node_fetch_1.default(source.url, { method: 'post', body: formData }).then((res) => res.text());
    return parseMadaro(source, body);
}
const madaro = {
    fetchFunction: fetchMadaro,
    type: TYPE,
    parseLink: parseMadaroPage,
    parseCondition: () => false
};
exports.MADARA = TYPE;
parser_1.registerParser(madaro);
