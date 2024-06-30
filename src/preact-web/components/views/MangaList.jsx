import { useState } from 'preact/hooks'
import { Fragment } from 'preact'
import styled from 'styled-components'
import { useSelector } from '../../utils/atom'
import { DetailView } from '../molecules/DetailView'
import { MangaCard } from '../molecules/MangaCard'
import { InputField } from '../molecules/InputField'

const List = styled.ul`
    list-style: none;
    padding: 0;
    overflow: auto;
    overflow-x: hidden;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
    padding-top: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-flow: row;
    grid-template-rows: auto;
`
const Bar = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    padding: 0 8px;
`

export function MangaList () {
    const { urls, sources } = useSelector((store) => ({
        urls: store.urls,
        maxOld: store.maxOld,
        sources: store.sources
    }))
    const [detail, showDetails] = useState('')
    const [search, setSearch] = useState('')

    if (!Array.isArray(urls?.newUrls) || !Array.isArray(urls?.oldUrls)) return null

    const urlMapNew = urls.newUrls.reduce((map, url) => {
        if (!map.has(url.sourceId)) map.set(url.sourceId, [])
        map.get(url.sourceId).push({ ...url, isNew: true })
        return map
    }, new Map())
    const urlMap = urls.oldUrls.reduce((map, url) => {
        if (!map.has(url.sourceId)) map.set(url.sourceId, [])
        map.get(url.sourceId).push({ ...url, isNew: false })
        return map
    }, urlMapNew)
    const detailSource = detail && sources?.[detail]

    return (
        <Fragment>
            <Bar>
                <InputField label="Filter" value={search} onChange={setSearch} placeholder='Search' />
            </Bar>
            <List>
                {Array.from(urlMap.entries()).map(([sourceId, chapters]) => (
                    <MangaCard
                        search={search}
                        chapters={chapters}
                        key={sourceId}
                        sourceId={sourceId}
                        showDetails={() => showDetails(sourceId)}
                    />
                ))}
            </List>
            {detailSource && (
                <DetailView source={detailSource} onClose={() => showDetails(null)} urls={urlMap.get(detail)} />
            )}
        </Fragment>
    )
}
