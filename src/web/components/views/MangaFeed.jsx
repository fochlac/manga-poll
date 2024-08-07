import { Fragment } from 'preact'
import { useCallback, useState, useRef } from 'preact/hooks'
import styled from 'styled-components'
import { useDispatch, useSelector } from '../../utils/atom'
import { ActionLink } from '../atoms/ActionLink'
import { CenteredDiv } from '../atoms/CenteredDiv'
import { ListHeader } from '../atoms/ListHeader'
import { ChapterRow } from '../molecules/ChapterRow'
import { RefreshTimer } from '../molecules/RefreshTimer'
import { FlexRow } from '../atoms/Layout'

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
const HeaderRowText = styled.span`
    font-weight: 600;
    font-size: 15px;
`

function createUnique (key) {
    const rendered = {}
    return (func) => (entity) => {
        if (!entity?.[key] || rendered[entity[key]]) return null
        rendered[entity[key]] = true
        return func(entity)
    }
}

export function MangaFeed () {
    const { urls } = useSelector((store) => ({ urls: store.urls, maxOld: store.maxOld }))
    const dispatch = useDispatch()
    const listRef = useRef()
    const oldChapterRef = useRef()
    const [topButtonVisible, setTopButtonVisible] = useState(false)
    const scrollHandler = useCallback(() => {
        const urls = listRef.current
        if (!urls) {
            return
        }
        let maxScroll = urls.scrollHeight - urls.offsetHeight - urls.scrollTop
        const getRefTop = (ref) => ref?.current?.getBoundingClientRect()?.top
        const scrollHeight = urls.offsetHeight + urls.scrollTop

        if (urls.scrollHeight - scrollHeight <= 50 && maxScroll !== urls.scrollHeight) {
            maxScroll = urls.scrollHeight
            dispatch('incrementMaxOld')
        }
        if (urls.scrollTop > 0 && oldChapterRef.current && Math.abs(getRefTop(listRef) - getRefTop(oldChapterRef)) < 10) {
            setTopButtonVisible(true)
        }
        else {
            setTopButtonVisible(false)
        }
    }, [listRef, setTopButtonVisible, dispatch, oldChapterRef])

    const unique = createUnique('url')

    return (
        <List onScroll={scrollHandler} ref={listRef}>
            {Boolean(urls?.newUrls?.length) && (
                <Fragment>
                    <ListHeader>
                        <FlexRow>
                            <HeaderRowText>New Chapters</HeaderRowText>
                            <RefreshTimer />
                        </FlexRow>
                        <CenteredDiv>
                            <ActionLink onClick={() => dispatch('hideAll')}>Hide all</ActionLink>
                        </CenteredDiv>
                    </ListHeader>
                    {urls.newUrls.map(unique((chapter) => (
                        <ChapterRow key={chapter.url} chapter={chapter} isNew showTitle />
                    )))}
                </Fragment>
            )}
            {Boolean(urls?.oldUrls?.length) && (
                <Fragment>
                    <ListHeader ref={oldChapterRef}>
                        <HeaderRowText>Old Chapters</HeaderRowText>
                        {topButtonVisible && (
                            <ActionLink onClick={() => listRef.current && (listRef.current.scrollTop = 0)}>
                                Top &#8593;
                            </ActionLink>
                        )}
                    </ListHeader>
                    {urls.oldUrls.map(unique((chapter) => (
                        <ChapterRow key={chapter.url} chapter={chapter} showTitle />
                    )))}
                </Fragment>
            )}
        </List>
    )
}
