import { ExternalLink, Eye, MoreVertical } from 'preact-feather'
import { Fragment } from 'preact'
import { memo } from 'preact/compat'
import styled from 'styled-components'
import { getHost } from '../../../common/utils'
import { useDispatch, useSelector } from '../../utils/atom'
import { ActionLink } from '../atoms/ActionLink'
import { Card, CardActionIcon, CardContent } from '../atoms/Card'
import { CardMenu, CardMenuItem, CardTitle, CardTitleContainer, CardTitleText } from '../atoms/CardTitle'
import { FlexColumn, FlexRow } from '../atoms/Layout'
import { Link } from '../atoms/Link'
import { Label } from '../atoms/Typography'
import { ChapterRowSimple } from './ChapterRowSimple'

const Row = styled.li`
    display: flex;
    justify-content: space-between;
`
const ChapterInfo = styled(FlexColumn)`
    white-space: nowrap;
    font-size: 0.9rem;
    padding-right: 14px;
    margin-top: 8px;

    & > * {
        margin-top: 0px !important;
    }
`
const MangaTitleContainer = styled(CardTitleContainer)`
    max-width: calc(100% + 16px);
`
const MangaTitle = styled(CardTitle)`
    max-width: calc(100% - 30px);
`
const MangaTitleText = styled(CardTitleText)`
    @media (max-width: 350px) {
        white-space: normal;
    }
`
const MangaCardContent = styled(FlexColumn)`
    @media (max-width: 350px) {
        padding-left: 8px;
    }
`

export const MangaCard = memo(({ chapters, sourceId, showDetails, search }) => {
    const { source } = useSelector((store) => ({ source: store.sources[sourceId] }))
    const dispatch = useDispatch()

    if (!source || search?.length && !source.title.toLowerCase().includes(search.toLowerCase())) return null

    const continueChapter = chapters.reduce((cont, chapter) => (chapter.isNew ? chapter : cont), null)

    return (
        <Card style={{userSelect: 'none'}} as={Row} onClick={showDetails}>
            <CardContent>
                <MangaTitleContainer>
                    <MangaTitle>
                        <MangaTitleText title={source.title}>{source.title}</MangaTitleText>
                        <CardActionIcon
                            as={Link}
                            href={source.url}
                            data-title={`Open Manga on ${getHost(source.url)}`}
                            style={{ cursor: 'pointer' }}
                            newTab
                        >
                            <ExternalLink size={18} />
                        </CardActionIcon>
                    </MangaTitle>
                    <CardMenu>
                        <CardMenuItem>
                            <MoreVertical size={20} />
                        </CardMenuItem>
                    </CardMenu>
                </MangaTitleContainer>
                <MangaCardContent align="flex-start" style={{ height: '100%' }}>
                    <ChapterInfo align="stretch">
                        {continueChapter ? (
                            <FlexColumn
                                align="flex-start"
                                justify="flex-start"
                                style={{ marginBottom: 8, marginTop: -24 }}
                            >
                                <Label style={{ marginBottom: 4 }}>Continue where you left off:</Label>
                                <FlexRow style={{ width: '100%' }}>
                                    <Fragment>
                                        <Link newTab href={continueChapter.url}>
                                            <b>{`Chapter ${continueChapter.chapter}`}</b>
                                        </Link>

                                        <CardActionIcon data-title="Mark as seen" left style={{ marginLeft: 'auto' }}>
                                            <ActionLink
                                                onClick={() => dispatch('hideChapter', continueChapter.id)}
                                                style={{ paddingTop: 1, marginBottom: -1 }}
                                            >
                                                <Eye size={14} />
                                            </ActionLink>
                                        </CardActionIcon>
                                    </Fragment>
                                </FlexRow>
                            </FlexColumn>
                        ) : null}
                        <FlexColumn align="flex-start" style={{ marginBottom: 8 }}>
                            <Label style={{ marginBottom: 4 }}>Latest Updates:</Label>
                            {chapters.slice(0, 2).map((chapter) => (
                                <ChapterRowSimple chapter={chapter} key={chapter.id} />
                            ))}
                        </FlexColumn>
                    </ChapterInfo>
                </MangaCardContent>
            </CardContent>
        </Card>
    )
})
