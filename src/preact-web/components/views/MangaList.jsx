import { useState } from 'preact/hooks'
import { Fragment } from 'preact'
import styled from 'styled-components'
import { useSelector } from '../../utils/atom'
import { DetailView } from '../molecules/DetailView'
import { MangaCard } from '../molecules/MangaCard'

const List = styled.ul`
    list-style: none;
    padding: 0;
    overflow: auto;
    overflow-x: hidden;
    margin: 0;
    width: 100%;
    padding: 0 max(calc((100vw - 1200px) / 3), 4px) 0 max(8px, calc((100vw - 1200px) / 3));
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 16px;
`
export function MangaList () {
    const { urls, sources } = useSelector((store) => ({
        urls: store.urls,
        maxOld: store.maxOld,
        sources: store.sources
    }))
    const [detail, showDetails] = useState('')

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
            <List>
                {Array.from(urlMap.entries()).map(([sourceId, chapters]) => (
                    <MangaCard
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
