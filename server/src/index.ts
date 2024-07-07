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
import { createRateLimiter } from './utils/rate-limiter'
import { createStatsEndpoints } from './stats'
import { initImages } from './utils/images'

import './parser/parse-fanfox'
import './parser/parse-madara'
import './parser/parse-mangadex'
import './parser/parse-mangastream'
import './parser/parse-genkan'
import './parser/parse-leviathan'
import './parser/parse-webtoons'
import './parser/parse-reaper'
import { findAndCleanDuplicates } from './duplicates'

const app = express()
const server = createServer(app)
app.use(cors(), compression(), express.json(), express.static(resolve(__dirname, '../../dist/web')))
initImages(app)

app.use(createRateLimiter(50, 30))

createStatsEndpoints(app)
sourceController(app)
urlController(app)
subscriptionsController(app)
linksController(app)

app.get('/api/*', (_req, res) => {
    res.status(404).json({
        valid: false,
        message: 'Unknown Endpoint.'
    })
})

app.get('/*', (_req, res) => {
    res.status(200).sendFile(resolve(__dirname, '../../dist/web/index.html'))
})

const port = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 43214

findAndCleanDuplicates()

server.listen(port, '0.0.0.0', () => {
    console.log(`listening to http://localhost:${port}/`)
    init()
})
