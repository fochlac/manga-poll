#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const compression_1 = __importDefault(require("compression"));
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
const source_controller_1 = require("./source-controller");
const url_controller_1 = require("./url-controller");
const scheduler_1 = require("./scheduler");
const subscriptions_controller_1 = require("./subscriptions-controller");
const link_controller_1 = require("./link-controller");
require("./parser/parse-fanfox");
require("./parser/parse-madara");
require("./parser/parse-mangadex");
require("./parser/parse-asura");
require("./parser/parse-genkan");
require("./parser/parse-leviathan");
const app = express_1.default();
const server = http_1.createServer(app);
app.use(cors_1.default(), compression_1.default(), express_1.default.json(), express_1.default.static(path_1.resolve(__dirname, '../../dist/webapp')), (req, _res, next) => {
    console.log(4, `${req.method} call to ${req.originalUrl}`);
    next();
});
source_controller_1.sourceController(app);
url_controller_1.urlController(app);
subscriptions_controller_1.subscriptionsController(app);
link_controller_1.linksController(app);
app.get('*', (_req, res) => {
    res.status(404).send('Not Found... :(');
});
const port = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 43214;
server.listen(port, 'localhost', () => {
    console.log(`listening to http://localhost:${port}/`);
    scheduler_1.init();
});
