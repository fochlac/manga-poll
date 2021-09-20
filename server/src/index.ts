#!/usr/bin/env node

import express from 'express'
import { createServer } from 'http'
import compression from 'compression'
import { resolve } from 'path'
import cors from 'cors'
import { sourceController } from './source-controller'
import { urlController } from './url-controller'
import { init } from './scheduler'
import { subscriptionsController } from './subscriptions-controller'
import { linksController } from './link-controller'

import './parser/parse-fanfox'
import './parser/parse-madara'
import './parser/parse-mangadex'
import './parser/parse-asura'
import './parser/parse-genkan'
import './parser/parse-leviathan'

const app = express()
const server = createServer(app)

app.use(
    cors(), 
    compression(), 
    express.json(), 
    express.static(resolve(__dirname, '../../dist/webapp')),
    (req, _res, next) => {
        console.log(4, `${req.method} call to ${req.originalUrl}`)
        next()
    }
)

sourceController(app)
urlController(app)
subscriptionsController(app)
linksController(app)

app.get('*', (_req, res) => {
    res.status(404).send('Not Found... :(')
})

const port = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 43214

server.listen(port, 'localhost', () => {
    console.log(`listening to http://localhost:${port}/`)
    init()
})
