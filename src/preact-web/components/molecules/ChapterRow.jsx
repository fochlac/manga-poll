import { Eye, EyeOff } from 'preact-feather'
import styled from 'styled-components'
import { useDispatch } from '../../utils/atom'
import { formatTime } from '../../utils/time'
import { ActionLink } from '../atoms/ActionLink'
import { CardActionIcon } from '../atoms/Card'
import { FlexRow } from '../atoms/Layout'
import { Link } from '../atoms/Link'

export function ChapterRow ({chapter}) {
    const dispatch = useDispatch()

    return <FlexRow as='li' key={chapter.id} style={{width: '100%', marginBottom: 2 }}>
        <Link newTab href={chapter.url}>
            <b>{`Chapter ${chapter.chapter}`}</b>
        </Link>
        <Time>{formatTime(chapter.created)}</Time>
        {chapter.isNew ? (<CardActionIcon data-title="Mark as seen" left style={{marginLeft: 'auto'}}>
            <ActionLink onClick={() => dispatch('hideChapter', chapter.id)} style={{ paddingTop: 1, marginBottom: -1}} >
                <Eye size={14} />
            </ActionLink>
        </CardActionIcon>) : (
            <EyeOff size={14} />
        )}
    </FlexRow>
}

const Time = styled.small`
    margin-left: 4px;
    margin-top: 1px;
    font-style: italic;
`
