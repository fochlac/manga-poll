import styled from 'styled-components'
import { formatTime } from '../../utils/time'
import { FlexRow } from '../atoms/Layout'
import { Link } from '../atoms/Link'

const Time = styled.small`
    margin-left: 4px;
    margin-top: 1px;
    font-style: italic;
`

export function ChapterRowSimple ({ chapter }) {
    return (
        <FlexRow as="li" key={chapter.id} style={{ width: '100%', marginBottom: 2 }}>
            <Link newTab href={chapter.url}>
                <b>{`Chapter ${chapter.chapter}`}</b>
            </Link>
            <Time>{formatTime(chapter.created)}</Time>
        </FlexRow>
    )
}
