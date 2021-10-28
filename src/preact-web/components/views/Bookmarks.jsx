import { useMemo } from 'preact/hooks'
import { getHost } from '../../../common/utils'
import { useDispatch, useSelector } from '../../utils/atom'

export function SourceList () {
    const {sources} = useSelector((store) => ({ sources: store.sources }))
    const sortedSources = useMemo(() => Object.values(sources).sort((source1, source2) => String(source1.title).localeCompare(source2?.title)), [sources])

    return <ul id="sources">
        {sortedSources.map((source) => <SourceRow key={source.id} source={source} />)}
    </ul>
}

function SourceRow ({source}) {
    const dispatch = useDispatch()
    const url = getHost(source.url)

    return (
        <li class="row source">
            <div class="data" title={`${source.title} (${url})`}>
                <span class="title">{source.title}</span>
                <span class="manga-id">({url})</span>
            </div>
            <span class="action" onClick={() => dispatch('deleteSource', source.id)}>Delete</span>
        </li>
    )
}
