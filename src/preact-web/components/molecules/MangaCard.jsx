import { ExternalLink, Eye, MoreVertical } from 'preact-feather'
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
import { ChapterRowSimple } from './ChapterRowSimple'

const Row = styled.li`
    display: flex;
    justify-content: space-between;

    @media(max-width: 350px) {
        flex-direction: column;
    }
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
const MangaImage = styled(CardImage)`
    @media(max-width: 350px) {
        height: 100px;
        width: 100px;
        min-height: unset;
    }
`
const MangaTitleContainer = styled(CardTitleContainer)`
    @media(max-width: 350px) {
        margin-left: 110px;
        margin-top: -100px;
        margin-bottom: 106px;
        height: 0px;
        align-items: flex-start;
        width: calc(100% + 16px - 110px);
    }
`
const MangaTitle = styled(CardTitle)`
    max-Width: min(240px, calc(100vw - 190px));

    @media(max-width: 350px) {
        align-items: flex-start;
    }
`
const MangaTitleText = styled(CardTitleText)`
    @media(max-width: 350px) {
        white-space: normal;
    }
`
const MangaCardContent = styled(FlexColumn) `
    @media(max-width: 350px) {
        padding-left: 8px;
    }
`

export function MangaCard ({ chapters, sourceId, showDetails }) {
    const { source } = useSelector((store) => ({ source: store.sources[sourceId] }))
    const dispatch = useDispatch()

    if (!source) return null

    const continueChapter = chapters.reduce((cont, chapter) => (chapter.isNew ? chapter : cont), null)

    return (
        <Card as={Row} onClick={showDetails} style={{ maxWidth: 400 }}>
            <MangaImage src={source.imageUrl} />
            <CardContent>
                <MangaTitleContainer>
                    <MangaTitle>
                        <MangaTitleText title={source.title}>
                            {source.title}
                        </MangaTitleText>
                        <CardActionIcon
                            as={Link}
                            href={source.url}
                            data-title={`Open Manga on ${getHost(source.url)}`}
                            style={{ marginBottom: '3px' }}
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
                    <CardTextShort style={{ paddingRight: '16px' }}>{source.description}</CardTextShort>
                    <ChapterInfo align="stretch">
                        <FlexColumn align="flex-start" justify="flex-start" style={{ marginBottom: 8, marginTop: -24 }}>
                            <Label style={{ marginBottom: 4 }}>Continue where you left off:</Label>
                            <FlexRow style={{ width: '100%' }}>
                                {continueChapter ? (
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
                                ) : (
                                    <span>All Read</span>
                                )}
                            </FlexRow>
                        </FlexColumn>
                        <FlexColumn align="flex-start" style={{ marginBottom: 8 }}>
                            <Label style={{ marginBottom: 4 }}>Latest Updates:</Label>
                            {chapters.slice(0, 2).map((chapter) => (
                                <ChapterRowSimple chapter={chapter} key={chapter.id} />
                            ))}
                            <FlexRow style={{ width: '100%' }} justify="center">
                                <ActionLink onClick={showDetails} style={{ margin: 0 }}>
                                    <small>
                                        <b>Show All Chapters</b>
                                    </small>
                                </ActionLink>
                            </FlexRow>
                        </FlexColumn>
                    </ChapterInfo>
                </MangaCardContent>
            </CardContent>
        </Card>
    )
}
