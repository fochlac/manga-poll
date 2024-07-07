import { ExternalLink, Menu, Trash2 } from 'preact-feather'
import styled from 'styled-components'
import { useDispatch, useSelector } from '../../utils/atom'
import { ActionLink } from '../atoms/ActionLink'
import { CardActionIcon } from '../atoms/Card'
import { FlexRow } from '../atoms/Layout'
import { Link } from '../atoms/Link'
import { getHost } from '../../../common/utils'
import { preventDefault } from '../../utils/events'

const StyledRow = styled(FlexRow)`
    padding: 4px 4px 4px;
    border-bottom: solid 1px var(--background-off-strong);
    box-sizing: border-box;
    box-sizing: content-box;
    margin: 0 8px 2px;
    flex-shrink: 1;
    user-select: none;
    margin: 0 max(calc((100vw - 800px) / 3), 4px) 0 max(8px,calc((100vw - 800px) / 3));
`
const HideButton = styled(ActionLink)`
    position: absolute;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -7px;
`

export function MangaRow ({ sourceId, showDetails, search }) {
    const { source } = useSelector((store) => ({ source: store.sources[sourceId] }))
    const dispatch = useDispatch()

    if (!source || search?.length && !source.title.toLowerCase().includes(search.toLowerCase())) return null

    return (
        <StyledRow as="li" key={sourceId}>
            <FlexRow style={{ width: '100%', marginRight: 4 }}>
                <ActionLink onClick={showDetails}>
                    {source.title}
                </ActionLink>
            </FlexRow>
            <CardActionIcon data-title={`Open Manga on ${getHost(source.url)}`} left style={{ marginLeft: 'auto', width: 18, height: 18, position: 'relative' }}>
                <HideButton
                    as={Link}
                    href={source.url}
                    style={{ paddingTop: 1, marginBottom: -1 }}
                    newTab
                >
                    <ExternalLink size={14} />
                </HideButton>
            </CardActionIcon>
            <CardActionIcon data-title='Show Details' left style={{ marginLeft: 'auto', width: 18, height: 18, position: 'relative' }}>
                <HideButton
                    style={{ paddingTop: 1, marginBottom: -1 }}
                    onClick={showDetails}
                >
                    <Menu size={14} />
                </HideButton>
            </CardActionIcon>
            <CardActionIcon data-title={`Unfollow ${source.title}`} left style={{ marginLeft: 'auto', width: 18, height: 18, position: 'relative' }}>
                <HideButton
                    destructive
                    style={{ paddingTop: 1, marginBottom: -1 }}
                    onClick={preventDefault(() => dispatch('deleteSource', sourceId))}
                >
                    <Trash2 size={14} />
                </HideButton>
            </CardActionIcon>
        </StyledRow>
    )
}

