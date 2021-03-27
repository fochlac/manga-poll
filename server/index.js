#!/usr/bin/env node

import express from 'express'
import { createServer } from 'http'
import compression from 'compression'
import { resolve } from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import { sourceController } from './source-controller'
import { urlController } from './url-controller'

const app = express()
const server = createServer(app)
const indexPath = resolve('./index.html')

app.use(cors(), compression(), bodyParser.json(), (req, _res, next) => {
    console.log(4, `${req.method} call to ${req.originalUrl}`)
    next()
})

sourceController(app)
urlController(app)

app.get('*', (_req, res) => {
    res.sendFile(indexPath)
})

const port = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 43214

server.listen(port, 'localhost', () => {
    console.log(0, `listening to http://localhost:${port}/`)
})
