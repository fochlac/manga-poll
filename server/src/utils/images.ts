import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { join, resolve } from 'path'
import fetch from 'node-fetch'
import express from 'express'
import { headers } from '../parser'

const folder = resolve(__dirname, '../../images/')

if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true })
}

export const storeImage = async (source: Source, url: string): Promise<string> => {
    const ext = url.split('.').pop()?.match(/^\w*/)?.[0] || 'jpg'
    const name = `img_${source.id}.${ext}`
    const path = join(folder, name)
    const response = await fetch(url, { headers })
    if (response.status !== 200) {
        throw new Error(`Cannot fetch image for source ${source.title} with url "${url}".`)
    }
    const fileStream = createWriteStream(path)
    return new Promise((resolve, reject) => {
        response.body.pipe(fileStream)
        response.body.on('error', reject)
        fileStream.on('finish', () => resolve(`/images/${name}`))
    })
}

export function initImages (app) {
    app.use('/images', express.static(folder))
}
