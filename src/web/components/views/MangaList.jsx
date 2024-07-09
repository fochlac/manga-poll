import { useMemo, useState } from 'preact/hooks'
import { Fragment } from 'preact'
import styled from 'styled-components'
import { useSelector } from '../../utils/atom'
import { DetailView } from '../molecules/DetailView'
import { MangaCard } from '../molecules/MangaCard'
import { FieldGroup, InputField, SelectField } from '../molecules/InputField'
import { usePersistedState } from '../../hooks/use-persisted-state'
import { List as ListIcon, Grid } from 'preact-feather'
import { BaseButton } from '../atoms/Button'
import { MangaRow } from '../molecules/MangaRow'

const ToggleBar = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5px;

    & > * {
        border-radius: 0;
        padding: 2px 4px;
        display:flex;
        align-items: center;
        justify-content: center;
    }
    & > [disabled] {
        background-color: var(--brand-light) !important;
        color: var(--brand-contrast) !important;
        opacity: 1;
    }

    & > *:first-child {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    & > *:last-child {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
`

const List = styled.ul`
    list-style: none;
    padding: 0;
    overflow: auto;
    overflow-x: hidden;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
    padding-top: 0;
    display: ${({type}) => type};
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-flow: row;
    grid-template-rows: auto;
    flex-direction: column;
    padding-bottom: 64px;
    margin-top: 8px;
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
const TYPE = {
    CARD: 'CARD',
    LIST: 'LIST'
}

const sortFunctions = {
    [FILTERS.CHANGED]: (urlMap) => (a, b) => urlMap.get(b?.id)?.[0]?.created - urlMap.get(a?.id)?.[0]?.created,
    [FILTERS.ALPHABET]: () => (a, b) => String(a?.title?.trim()).localeCompare(b?.title?.trim())
}

export function MangaList ({ small }) {
    const urls = useSelector((store) => store.urls)
    const sources = useSelector((store) => store.sources)

    const [detail, showDetails] = useState('')
    const [search, setSearch] = useState('')
    const [order, setOrder] = usePersistedState('manga-list-filter', FILTERS.ALPHABET)
    const [listType, setListType] = usePersistedState('manga-list-type', TYPE.CARD)

    const ListComponent = listType === TYPE.CARD ? MangaCard : MangaRow

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
        () => Object.values(sources).sort(sortFunctions[order](urlMap)),
        [order, sources, urlMap]
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
                <FieldGroup label="Display" style={{ width: 50 }}>
                    <ToggleBar>
                        <BaseButton disabled={listType === TYPE.CARD} onClick={() => setListType(TYPE.CARD)}><Grid size={14} /></BaseButton>
                        <BaseButton disabled={listType === TYPE.LIST} onClick={() => setListType(TYPE.LIST)}><ListIcon size={14} /></BaseButton>
                    </ToggleBar>
                </FieldGroup>
            </Bar>
            <List type={listType === TYPE.CARD ? 'grid' : 'flex'}>
                {sortedSources.map((source) => (
                    <ListComponent
                        search={search}
                        chapters={urlMap.get(source.id) ?? []}
                        key={source.id}
                        sourceId={source.id}
                        showDetails={() => showDetails(source.id)}
                    />
                ))}
            </List>
            {detailSource && (
                <DetailView small={small} source={detailSource} onClose={() => showDetails(null)} urls={urlMap.get(detail) ?? []} />
            )}
        </Fragment>
    )
}
