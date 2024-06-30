import { useMemo, useState } from 'preact/hooks'
import { Fragment } from 'preact'
import styled from 'styled-components'
import { useSelector } from '../../utils/atom'
import { DetailView } from '../molecules/DetailView'
import { MangaCard } from '../molecules/MangaCard'
import { InputField, SelectField } from '../molecules/InputField'
import { usePersistedState } from '../../hooks/use-persisted-state'

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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    padding: 0 8px;
`

const FILTERS = {
    CHANGED: 'CHANGED',
    ALPHABET: 'ALPHABET'
}

const sortFunctions = {
    [FILTERS.CHANGED]: () => (a, b) => a[1]?.created - b[1]?.created,
    [FILTERS.ALPHABET]: (sources) => (a, b) =>
        String(sources[a[0]]?.title?.trim()).localeCompare(sources[b[0]]?.title?.trim())
}

export function MangaList () {
    const urls = useSelector((store) => store.urls)
    const sources = useSelector((store) => store.sources)

    const [detail, showDetails] = useState('')
    const [search, setSearch] = useState('')
    const [order, setOrder] = usePersistedState('manga-list-filter', FILTERS.ALPHABET)

    const detailSource = detail && sources?.[detail]

    const urlMap = useMemo(() => {
        if (!Array.isArray(urls?.newUrls) || !Array.isArray(urls?.oldUrls)) {
            return new Map()
        }
        const urlMapNew = urls.newUrls.reduce((map, url) => {
            if (!map.has(url.sourceId)) map.set(url.sourceId, [])
            map.get(url.sourceId).push({ ...url, isNew: true })
            return map
        }, new Map())
        return urls.oldUrls.reduce((map, url) => {
            if (!map.has(url.sourceId)) map.set(url.sourceId, [])
            map.get(url.sourceId).push({ ...url, isNew: false })
            return map
        }, urlMapNew)
    }, [urls])
    const sortedSources = useMemo(
        () =>
            Array.from(urlMap.entries())
                .filter(([sourceId]) => sources[sourceId])
                .sort(sortFunctions[order](sources)),
        [order, urlMap, sources]
    )

    return (
        <Fragment>
            <Bar>
                <InputField label="Filter" value={search} onChange={setSearch} placeholder="Search" />
                <SelectField
                    onChange={setOrder}
                    value={order}
                    label="Sort By"
                    options={[
                        { label: 'Title', value: FILTERS.ALPHABET },
                        { label: 'Last Update', value: FILTERS.CHANGED }
                    ]}
                />
            </Bar>
            <List>
                {sortedSources.map(([sourceId, chapters]) => (
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
