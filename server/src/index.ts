#!/usr/bin/env node

import express from 'express'
import { createServer } from 'http'
import compression from 'compression'
import { resolve } from 'path'
import cors from 'cors'
import { sourceController } from './source-controller'
import { urlController } from './url-controller'
import { init } from './scheduler'
import { sendTopicMessage, subscriptionsController } from './subscriptions-controller'

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


app.get('/api/triggerFetch', async (req, res) => {
    try {
        console.log('Fetching all chapters...')
        await sendTopicMessage('Oc9_PDc8g3')
        console.log('Done.')
        res.status(200).send(`<html><body><h2>Success</h2></body></html>`)
    }
    catch(e) {
        res.status(400).send(`<html><body><h2>Error: ${e.message}</h2></body></html>`)
    }
})

app.get('*', (_req, res) => {
    res.status(404).send('Not Found... :(')
})

const port = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 43214

server.listen(port, 'localhost', () => {
    console.log(`listening to http://localhost:${port}/`)
    init()
})
