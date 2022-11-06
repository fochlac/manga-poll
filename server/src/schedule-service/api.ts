import fetch from 'node-fetch'

const port = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 43214

const mainServiceBaseUrl = `http://localhost:${port}`

