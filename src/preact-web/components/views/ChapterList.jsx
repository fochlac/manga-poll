import { Fragment } from 'preact'
import { useCallback, useState, useRef } from 'preact/hooks'
import styled from 'styled-components'
import { pad } from '../../../common/utils'
import { useDispatch, useSelector } from '../../utils/atom'
import { ActionLink } from '../atoms/ActionLink'
import { CenteredDiv } from '../atoms/CenteredDiv'
import { Link } from '../atoms/Link'
import { ListHeader } from '../atoms/ListHeader'
import { RefreshTimer } from '../molecules/RefreshTimer'

export function ChapterList () {
    const {urls, maxOld} = useSelector((store) => ({ urls: store.urls, maxOld: store.maxOld }))
    const dispatch = useDispatch()
    const listRef = useRef()
    const oldChapterRef = useRef()
    const [topButtonVisible, setTopButtonVisible] = useState(false)
    const scrollHandler = useCallback(() => {
        const urls = listRef.current
        if (!urls) {
            return () => null
        }
        let maxScroll = urls.scrollHeight - urls.offsetHeight - urls.scrollTop
        const getRefTop = (ref) => ref?.current?.getBoundingClientRect()?.top

        return () => {
            const scrollHeight = urls.offsetHeight + urls.scrollTop
            if (urls.scrollHeight - scrollHeight <= 50 && maxScroll !== urls.scrollHeight) {
                maxScroll = urls.scrollHeight
                dispatch('incrementMaxOld')
            }
            if (urls.scrollTop > 0 && oldChapterRef.current && getRefTop(listRef) === getRefTop(oldChapterRef)) {
                setTopButtonVisible(true)
            }
            else {
                setTopButtonVisible(false)
            }
        }
    }, [listRef, setTopButtonVisible, dispatch, oldChapterRef])

    return <ul id="urls" onScroll={scrollHandler()} ref={listRef}>
        {urls?.newUrls?.length && <Fragment>
            <ListHeader>
                <span>
                    <span>New Chapters</span>
                </span>
                <CenteredDiv>
                    <RefreshTimer />
                    <ActionLink>Hide all</ActionLink>
                </CenteredDiv>
            </ListHeader>
            {urls.newUrls.map((chapter) => <ChapterRow key={chapter.url} chapter={chapter} />)}
        </Fragment>}
        {urls?.oldUrls?.length && (<Fragment>
            <ListHeader ref={oldChapterRef}>
                <span>Old Chapters</span>
                {topButtonVisible && <ActionLink>Top &#8593;</ActionLink>}
            </ListHeader>
            {urls.oldUrls.map((chapter) => <ChapterRow key={chapter.url} chapter={chapter} isOld />)}
        </Fragment>)}
        {urls?.oldUrls?.length >= maxOld && <li class="action load-more">Load up to 100 more old chapters...</li>}
    </ul>
}

const Row = styled.li`
    display: flex;
    justify-content: space-between;
    padding-right: 4px;
    opacity: ${(props) => props.old ? '0.8' : '1'};
`

function ChapterRow ({isOld, chapter}) {
    const dispatch = useDispatch()
    const date = new Date(chapter.created)
    const timeString = `${pad(date.getHours())}:${pad(date.getMinutes())}`
    const dateString = `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${String(date.getFullYear()).slice(-2)}`
    const fullDate = date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0] ? timeString : dateString

    return (
        <Row old={isOld}>
            <Link href={chapter.url} newTab>{chapter.title} - Chapter {chapter.chapter}</Link>
            <span class="date-wrapper">
                <span class="date" title={`${dateString} ${timeString}`}>{fullDate}</span>
                {!isOld && <ActionLink onClick={() => dispatch('hideChapter', chapter.id)} >Hide</ActionLink>}
            </span>
        </Row>
    )
}
