import { Fragment } from 'preact'
import { useCallback, useState, useRef } from 'preact/hooks'
import styled from 'styled-components'
import { useDispatch, useSelector } from '../../utils/atom'
import { ActionLink } from '../atoms/ActionLink'
import { CenteredDiv } from '../atoms/CenteredDiv'
import { ListHeader } from '../atoms/ListHeader'
import { ChapterRow } from '../molecules/ChapterRow'
import { RefreshTimer } from '../molecules/RefreshTimer'

const List = styled.ul`
    list-style: none;
    padding: 0;
    overflow: auto;
    overflow-x: hidden;
    margin: 0;
    width: 100%;
    padding: 0 max(calc((100vw - 800px) / 3), 4px) 0 max(8px, calc((100vw - 800px) / 3));
    box-sizing: border-box;
`

export function MangaFeed () {
    const { urls, maxOld } = useSelector((store) => ({ urls: store.urls, maxOld: store.maxOld }))
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

    return (
        <List onScroll={scrollHandler()} ref={listRef}>
            {urls?.newUrls?.length && (
                <Fragment>
                    <ListHeader>
                        <span>
                            <span>New Chapters</span>
                        </span>
                        <CenteredDiv>
                            <RefreshTimer />
                            <ActionLink>Hide all</ActionLink>
                        </CenteredDiv>
                    </ListHeader>
                    {urls.newUrls.map((chapter) => (
                        <ChapterRow key={chapter.url} chapter={chapter} isNew showTitle />
                    ))}
                </Fragment>
            )}
            {urls?.oldUrls?.length && (
                <Fragment>
                    <ListHeader ref={oldChapterRef}>
                        <span>Old Chapters</span>
                        {topButtonVisible && <ActionLink>Top &#8593;</ActionLink>}
                    </ListHeader>
                    {urls.oldUrls.map((chapter) => (
                        <ChapterRow key={chapter.url} chapter={chapter} showTitle />
                    ))}
                </Fragment>
            )}
            {urls?.oldUrls?.length >= maxOld && <li class="action load-more">Load up to 100 more old chapters...</li>}
        </List>
    )
}
