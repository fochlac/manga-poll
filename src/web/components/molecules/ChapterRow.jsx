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
    padding: 2px 4px;
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
const ActionBadge = styled(ActionLink)`
    background: var(--brand);
    color: var(--brand-contrast) !important;
    border-radius: 10px;
    height: 14px;
    line-height: 12px;
    font-size: 12px;
    padding: 1px 6px 1px 4px;
    font-weight: 700;
    margin: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
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
const Spacer = styled.span`
    flex-shrink: 0;
    flex-grow: 999999;
    flex-basis: 0;
`
const Time = styled.small`
    margin-top: 1px;
    font-style: italic;
`

export function ChapterRow ({ chapter, showTitle, isNew, chapters, onExpand }) {
    const dispatch = useDispatch()
    const [hide, setHide] = useState(false)

    const hideChapter = async () => {
        setHide(true)
        await dispatch('hideChapter', chapter.id).catch(() => setHide(false))
    }

    const newChap = chapter.isNew || isNew

    return (
        <StyledRow as="li" key={chapter.id} hide={hide && (typeof chapters !== 'number' || chapters <= 1)}>
            <FlexRow style={{ width: '100%', marginRight: 4 }}>
                <Link onClick={hideChapter} newTab href={chapter.url}>
                    {showTitle ? `${chapter.title} - ` : ''}
                    <wbr />
                    {`Ch. ${chapter.chapter}`}
                </Link>
                <Spacer />
                <wbr />
                {typeof chapters === 'number' && chapters > 1 && (
                    <ActionBadge onClick={onExpand}>
                    +{chapters}
                    </ActionBadge>
                )}
                <wbr />
                <Time>{formatTime(chapter.created)}</Time>
            </FlexRow>
            {(newChap && !hide) && (
                <CardActionIcon data-title="Mark as seen" left style={{ marginLeft: 2, width: 18, height: 18, position: 'relative' }}>
                    <HideButton
                        onClick={hideChapter}
                        style={{ paddingTop: 1, marginBottom: -1 }}
                    >
                        <Eye size={14} />
                    </HideButton>
                </CardActionIcon>
            )}
            {hide && (
                <CardActionIcon style={{ marginLeft: 4, width: 18, height: 18, flexShrink: 0, marginRight: -2 }}>
                    <LoaderAnimated size={14} />
                </CardActionIcon>
            )}
        </StyledRow>
    )
}
