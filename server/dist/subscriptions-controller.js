"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionsController = exports.sendTopicMessage = void 0;
const admin = __importStar(require("firebase-admin"));
const path_1 = require("path");
const node_fetch_1 = __importDefault(require("node-fetch"));
admin.initializeApp({
    credential: admin.credential.cert(path_1.resolve(path_1.join(__dirname, '../firebase-credentials.json')))
});
console.log(((_a = process.env.MANGA_GAPI_SERVER_KEY) === null || _a === void 0 ? void 0 : _a.length) ? `GAPI Server key: ${(process.env.MANGA_GAPI_SERVER_KEY).slice(0, 10)}*********${(process.env.MANGA_GAPI_SERVER_KEY).slice(-10)}` : 'No GAPI Server key.');
async function getTopicSubscriptions(token) {
    var _a, _b;
    if (!((_a = process.env.MANGA_GAPI_SERVER_KEY) === null || _a === void 0 ? void 0 : _a.length)) {
        return [];
    }
    const headers = { authorization: `key=${process.env.MANGA_GAPI_SERVER_KEY}`, accept: 'application/json' };
    const response = await node_fetch_1.default(`https://iid.googleapis.com/iid/info/${token}?details=true`, { headers });
    const body = await response.json();
    if (response.status !== 200) {
        console.log('Error fetching token list: ' + JSON.stringify(body));
        return [];
    }
    return Object.keys(((_b = body === null || body === void 0 ? void 0 : body.rel) === null || _b === void 0 ? void 0 : _b.topics) || {});
}
const timeouts = {};
function sendTopicMessage(topic) {
    clearTimeout(timeouts[topic]);
    timeouts[topic] = setTimeout(() => {
        console.log('sendTopicMessage', topic);
        const payload = {
            data: {
                type: 'UPDATE_CHAPTER',
                sourceId: topic
            }
        };
        admin.messaging().sendToTopic(topic, payload, { priority: 'high' });
    }, 100);
}
exports.sendTopicMessage = sendTopicMessage;
function subscriptionsController(app) {
    app.post('/api/subscriptions', async (req, res) => {
        const { topics, key } = req.body;
        if ((typeof topics !== 'string' && !Array.isArray(topics)) || typeof key !== 'string') {
            return res.status(400).json({ valid: false });
        }
        const newTopics = Array.isArray(topics) ? topics : [topics];
        const oldTopics = await getTopicSubscriptions(key);
        const subscribe = newTopics.filter((topic) => !oldTopics.includes(topic));
        const unsubscribe = oldTopics.filter((topic) => !newTopics.includes(topic));
        try {
            if (subscribe.length) {
                await Promise.all(subscribe.map((topic) => admin.messaging().subscribeToTopic([key], topic)));
            }
            if (unsubscribe.length) {
                await Promise.all(subscribe.map((topic) => admin.messaging().unsubscribeFromTopic([key], topic)));
            }
            console.log(subscribe.length && `Subscribed ${subscribe.length} topics` || '', unsubscribe.length && `Unsubscribed ${unsubscribe.length} topics` || '');
            res.status(200).json({ valid: true });
        }
        catch (err) {
            console.log('error subscribing to topics', err);
            res.status(400).json({ valid: false });
        }
    });
    app.delete('/api/subscriptions', async (req, res) => {
        const { topics, key } = req.body;
        const deleteTopics = Array.isArray(topics) ? topics : [topics];
        const oldTopics = await getTopicSubscriptions(key);
        const unsubscribe = oldTopics.length && oldTopics || deleteTopics;
        try {
            await Promise.all(unsubscribe.map((topic) => admin.messaging().unsubscribeFromTopic([key], topic)));
            console.log(unsubscribe.length && `Unsubscribed from ${unsubscribe.length} topics.` || '');
            res.status(200).json({ valid: true });
        }
        catch (err) {
            console.log('error unsubscribing from topics', unsubscribe, err);
            res.status(400).json({ valid: false });
        }
    });
}
exports.subscriptionsController = subscriptionsController;
