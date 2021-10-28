import { Eye, EyeOff } from 'preact-feather'
import styled from 'styled-components'
import { useDispatch } from '../../utils/atom'
import { formatTime } from '../../utils/time'
import { ActionLink } from '../atoms/ActionLink'
import { CardActionIcon } from '../atoms/Card'
import { FlexRow } from '../atoms/Layout'
import { Link } from '../atoms/Link'

const StyledRow = styled(FlexRow)`
    padding: 4px 4px;
    border-bottom: solid 1px #c6dafd;
    box-sizing: border-box;
    width: '100%';
    margin: 2px;
    box-sizing: content-box;
    margin: 0 8px 2px;
    width: calc(100% - 24px);
    flex-shrink: 1;
`

export function ChapterRow ({ chapter, showTitle, isNew }) {
    const dispatch = useDispatch()

    return (
        <StyledRow as="li" key={chapter.id}>
            <span>
                <Link newTab href={chapter.url}>
                    {showTitle ? `${chapter.title} - ` : ''}
                    <wbr />
                    {`Chapter ${chapter.chapter}`}
                </Link>
                <wbr />
                <Time>{formatTime(chapter.created)}</Time>
            </span>
            {chapter.isNew || isNew ? (
                <CardActionIcon data-title="Mark as seen" left style={{ marginLeft: 'auto' }}>
                    <ActionLink
                        onClick={() => dispatch('hideChapter', chapter.id)}
                        style={{ paddingTop: 1, marginBottom: -1 }}
                    >
                        <Eye size={14} />
                    </ActionLink>
                </CardActionIcon>
            ) : (
                <EyeOff size={14} style={{ marginLeft: 'auto', flexShrink: 0 }} />
            )}
        </StyledRow>
    )
}

const Time = styled.small`
    margin-left: 4px;
    margin-top: 1px;
    font-style: italic;
`
