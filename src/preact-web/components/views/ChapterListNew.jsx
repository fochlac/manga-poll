import { ExternalLink, Eye, MoreVertical } from 'preact-feather'
import { useState } from 'preact/hooks'
import { Fragment } from 'preact'
import styled from 'styled-components'
import { getHost } from '../../../common/utils'
import { useDispatch, useSelector } from '../../utils/atom'
import { ActionLink } from '../atoms/ActionLink'
import { Card, CardActionIcon, CardContent, CardTextShort } from '../atoms/Card'
import { CardImage } from '../atoms/CardImage'
import { CardMenu, CardMenuItem, CardTitle, CardTitleContainer, CardTitleText } from '../atoms/CardTitle'
import { FlexColumn, FlexRow } from '../atoms/Layout'
import { Link } from '../atoms/Link'
import { Label } from '../atoms/Typography'
import { DetailView } from '../molecules/DetailView'
import { formatTime } from '../../utils/time'

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
export function ChapterList () {
    const {urls, sources} = useSelector((store) => ({ urls: store.urls, maxOld: store.maxOld, sources: store.sources }))
    const [detail, showDetails] = useState('')

    if (!urls?.newUrls?.length || !urls?.oldUrls?.length) return null

    const urlMapNew = urls.newUrls.reduce((map, url) => {
        if (!map.has(url.sourceId)) map.set(url.sourceId, [])
        map.get(url.sourceId).push({...url, isNew: true})
        return map
    }, new Map())
    const urlMap = urls.oldUrls.reduce((map, url) => {
        if (!map.has(url.sourceId)) map.set(url.sourceId, [])
        map.get(url.sourceId).push({...url, isNew: false})
        return map
    }, urlMapNew)
    const detailSource = detail && sources?.[detail]

    return <List>
        {Array.from(urlMap.entries()).map(([sourceId, chapters]) =>
            <ChapterCard chapters={chapters} key={sourceId} sourceId={sourceId} showDetails={() => showDetails(sourceId)} />
        )}
        {detailSource && <DetailView source={detailSource} onClose={() => showDetails(null)} urls={urlMap.get(detail)} />}
    </List>
}

const Row = styled.li`
    display: flex;
    justify-content: space-between;
`
const ChapterInfo = styled(FlexColumn)`
    white-space: nowrap;
    font-size: 0.9rem;
    padding-right: 14px;
    min-width: 200px;
    max-width: 200px;
    margin-top: 8px;

    @media (max-width: 650px) {
        max-width: unset;
        min-width: unset;
        
        & > * {
            margin-top: 0px !important;
        }
    }
    `
const ChapterTitle = styled(CardTitleText)`
    max-width: calc(100vw - 406px);
    
    @media (max-width: 650px) {
        max-width: calc(100vw - 200px);
    }
`

function ChapterCard ({ chapters, sourceId, showDetails }) {
    const { source } = useSelector((store) => ({ source: store.sources[sourceId] }))
    const dispatch = useDispatch()

    if (!source) return null

    const continueChapter = chapters.reduce((cont, chapter) => chapter.isNew ? chapter : cont, null)

    return (
        <Card as={Row}>
            <CardImage src={source.imageUrl} />
            <CardContent>
                <CardTitleContainer>
                    <CardTitle>
                        <ChapterTitle title={source.title}>
                            {source.title}
                        </ChapterTitle>
                        <CardActionIcon as={Link} href={source.url} data-title={`Open Manga on ${getHost(source.url)}`} style={{marginBottom: '3px'}}>
                            <ExternalLink size={18} />
                        </CardActionIcon>
                    </CardTitle>
                    <CardMenu>
                        <CardMenuItem>
                            <MoreVertical size={20} />
                        </CardMenuItem>
                    </CardMenu>
                </CardTitleContainer>
                <FlexRow align='flex-start' flip={650}>
                    <CardTextShort style={{paddingRight: '16px'}}>
                        {source.description}
                    </CardTextShort>
                    <ChapterInfo align="stretch">
                        <FlexColumn align="flex-start" justify="flex-start" style={{marginBottom: 8, marginTop: -24}}>
                            <Label style={{marginBottom: 4}}>Continue Reading:</Label>
                            <FlexRow style={{width: '100%' }}>
                                {continueChapter ? (
                                    <Fragment>
                                        <Link newTab href={continueChapter.url}>
                                            <b>{`Chapter ${continueChapter.chapter}`}</b>
                                        </Link>

                                        <CardActionIcon data-title="Mark as seen" left style={{marginLeft: 'auto'}}>
                                            <ActionLink onClick={() => dispatch('hideChapter', continueChapter.id)} style={{ paddingTop: 1, marginBottom: -1}} >
                                                <Eye size={14} />
                                            </ActionLink>
                                        </CardActionIcon>
                                    </Fragment>
                                ) : (
                                    <span>All Read</span>
                                )}
                            </FlexRow>
                        </FlexColumn>
                        <FlexColumn align="flex-start" style={{marginBottom: 8 }}>
                            <Label style={{marginBottom: 4}}>Latest Updates:</Label>
                            {chapters.slice(0, 2).map((chapter) => (<ChapterRow chapter={chapter} key={chapter.id} />))}
                            <FlexRow style={{width: '100%' }}>
                                <ActionLink onClick={showDetails} style={{ margin: 0}}>
                                    <small><b>Show All Chapters</b></small>
                                </ActionLink>
                            </FlexRow>
                        </FlexColumn>
                    </ChapterInfo>
                </FlexRow>
            </CardContent>
        </Card>
    )
}

const Time = styled.small`
    margin-left: 4px;
    margin-top: 1px;
    font-style: italic;
`

export function ChapterRow ({chapter}) {
    return <FlexRow as='li' key={chapter.id} style={{width: '100%', marginBottom: 2 }}>
        <Link newTab href={chapter.url}>
            <b>{`Chapter ${chapter.chapter}`}</b>
        </Link>
        <Time>{formatTime(chapter.created)}</Time>
    </FlexRow>
}
