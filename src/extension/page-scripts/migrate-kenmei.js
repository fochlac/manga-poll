import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import qs from 'qs'

const setAuthConfig = (config) => {
    const token = localStorage.getItem('access')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}

const baseConfig = {
    baseURL: 'https://api.kenmei.co',
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
    }
}

const maintenanceInterceptor = (error) => {
    if (error.request.status === 503) {
        window.location.replace('https://maintenance.kenmei.co/')
    }
    else {
        return Promise.reject(error)
    }
}

const secure = axios.create(baseConfig)
const plain = axios.create(baseConfig)

const refreshAuthLogic = (failedRequest) =>
    plain
        .post('/refresh')
        .then((response) => {
            const { access } = response.data

            localStorage.access = access
            failedRequest.response.config.headers.Authorization = `Bearer ${access}`

            return Promise.resolve()
        })
        .catch(() => {})

plain.interceptors.request.use((config) => setAuthConfig(config))
secure.interceptors.request.use((config) => setAuthConfig(config))

plain.interceptors.response.use((res) => res, maintenanceInterceptor)
secure.interceptors.response.use((res) => res, maintenanceInterceptor)

createAuthRefreshInterceptor(secure, refreshAuthLogic)

const index = (searchTerm) =>
    secure
        .get('/api/v1/manga_series', { params: { search_term: searchTerm } })
        .then((response) => response)
        .catch((request) => request.response)

const create = (manga_entry) =>
    secure
        .post('/api/v2/manga_entries', { manga_entry })
        .then((response) => response)
        .catch((request) => request.response)

function migrateSource (source) {
    return index(source.title).then((result) => {
        if (result.data.data.length === 1) {
            const manga = result.data.data[0]
            const host = manga.mangaSources[0]
            const manga_source_id = host.id
            const manga_source_chapter_id = host.latestChapter.id

            return create({
                status: 1,
                manga_source_chapter_id,
                manga_source_id
            })
        }
        else {
            console.log('unable to automatically add ' + source.title)
        }
    })
}

export function renderList (sources) {
    const div = document.createElement('div')
    div.classList.add('migrate-container')
    div.innerHTML = `
        <style>
            .list > li {
                border-bottom: solid 1px black;
                cursor: pointer;
            }
            .list {
                position: fixed;
                right: 0;
                left: calc(100% - 250px);
                top: 0;
                bottom: 0;
                overflow: auto;
                z-index: 1000;
                background: white;
                padding: 4px;
            }
        </style>
        <ul class="list" >
            ${sources.map(({title}) => `<li data-title="${title}">${title}</li>`).join('\n')}
        </ul>
    `

    document.body.appendChild(div)

    document.querySelector('.migrate-container .list').addEventListener('click', (e) => {
        const li = e.target.closest('li[data-title]')
        if (li) {
            const title = li.dataset.title
            migrateSource({ title })
        }
    })
}