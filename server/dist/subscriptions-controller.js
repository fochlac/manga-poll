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
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionsController = exports.sendTopicMessage = void 0;
const admin = __importStar(require("firebase-admin"));
const path_1 = require("path");
admin.initializeApp({
    credential: admin.credential.cert(path_1.resolve(path_1.join(__dirname, '../firebase-credentials.json')))
});
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
        try {
            await Promise.all(newTopics.map((topic) => admin.messaging().subscribeToTopic([key], topic)));
            res.status(200).json({ valid: true });
        }
        catch (err) {
            console.log('error subscribing to topics', err);
            res.status(400).json({ valid: false });
        }
    });
    app.delete('/api/subscriptions', async (req, res) => {
        const { topics, key } = req.body;
        if ((typeof topics !== 'string' && !Array.isArray(topics)) || typeof key !== 'string') {
            return res.status(400).json({ valid: false });
        }
        const newTopics = Array.isArray(topics) ? topics : [topics];
        try {
            await Promise.all(newTopics.map((topic) => admin.messaging().unsubscribeFromTopic([key], topic)));
            res.status(200).json({ valid: true });
        }
        catch (err) {
            console.log('error subscribing to topics', err);
            res.status(400).json({ valid: false });
        }
    });
}
exports.subscriptionsController = subscriptionsController;
