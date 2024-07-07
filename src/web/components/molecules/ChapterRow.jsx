import { Eye, Loader } from 'preact-feather'
import styled from 'styled-components'
import { useDispatch } from '../../utils/atom'
import { formatTime } from '../../utils/time'
import { ActionLink } from '../atoms/ActionLink'
import { CardActionIcon } from '../atoms/Card'
import { FlexRow } from '../atoms/Layout'
import { Link } from '../atoms/Link'
import { useState } from 'preact/hooks'
import { fadeShrinkAnimation, rotation } from '../atoms/animations'

const StyledRow = styled(FlexRow)`
    padding: 4px 4px 4px;
    border-bottom: solid 1px var(--background-off-strong);
    box-sizing: border-box;
    box-sizing: content-box;
    margin: 0 8px 2px;
    width: calc(100% - 24px);
    flex-shrink: 1;
    user-select: none;
    opacity: 1;
    ${({hide}) => hide ? fadeShrinkAnimation : ''};
    animation-duration: 1s;
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
const LoaderAnimated = styled(Loader)`
    ${rotation};
`

export function ChapterRow ({ chapter, showTitle, isNew }) {
    const dispatch = useDispatch()
    const [hide, setHide] = useState(false)

    const hideChapter = async () => {
        setHide(true)
        await dispatch('hideChapter', chapter.id).catch(() => setHide(false))
    }

    const newChap = chapter.isNew || isNew

    return (
        <StyledRow as="li" key={chapter.id} hide={hide}>
            <FlexRow style={{ width: '100%', marginRight: 4 }}>
                <Link onClick={hideChapter} newTab href={chapter.url}>
                    {showTitle ? `${chapter.title} - ` : ''}
                    <wbr />
                    {`Ch. ${chapter.chapter}`}
                </Link>
                <wbr />
                <Time>{formatTime(chapter.created)}</Time>
            </FlexRow>
            {(newChap && !hide) && (
                <CardActionIcon data-title="Mark as seen" left style={{ marginLeft: 'auto', width: 18, height: 18, position: 'relative' }}>
                    <HideButton
                        onClick={hideChapter}
                        style={{ paddingTop: 1, marginBottom: -1 }}
                    >
                        <Eye size={14} />
                    </HideButton>
                </CardActionIcon>
            )}
            {hide && (
                <CardActionIcon style={{ marginLeft: 'auto', flexShrink: 0 }}>
                    <LoaderAnimated size={14} />
                </CardActionIcon>
            )}
        </StyledRow>
    )
}

const Time = styled.small`
    margin-left: auto;
    margin-top: 1px;
    font-style: italic;
`
