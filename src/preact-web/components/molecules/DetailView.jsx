import styled from 'styled-components'
import { getHost } from '../../../common/utils'
import { ContainedImage } from '../atoms/Image'
import { FlexColumn, FlexRow } from '../atoms/Layout'
import { Link } from '../atoms/Link'
import { ChapterRow } from './ChapterRow'
import { Dialog } from './Dialog'

const background = '#c6dafd'

const DetailImageContainer = styled.div`
    max-width: 30%;
    margin-right: 8px;
    flex-grow: 0;
`
const DetailTitle = styled.h3`
    font-size: 1.8rem;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
    padding-left: 16px;
`
const Host = styled.h6`
    white-space: nowrap;
    font-size: 0.8rem;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
    padding-left: 16px;
    margin-bottom: 16px;
`
const Subtitle = styled.h5`
    width: 100%;
    margin-bottom: 0;
    margin-top: auto;
    padding-left: 16px;
    box-sizing: border-box;
`
const ChapterDescription = styled.p`
    padding: 8px 16px;
    text-align: justify;
    background: ${() => background};
    margin-top: 4px;
    margin-bottom: 0;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
`
const ChapterList = styled.ul`
    padding: 0;
    overflow-y: auto;
    flex-shrink: 1;
`

export function DetailView ({ onClose, source, urls }) {
    return (
        <Dialog
            title={''}
            onClose={onClose}
            height="80vh"
            width="calc(90vw - max(calc((100vw - 800px) / 1.5), 4px))"
            bodyStyle={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', marginTop: -32 }}
        >
            <FlexRow align="flex-start" style={{ marginBottom: 16, flexShrink: 0 }}>
                <DetailImageContainer style={{ marginRight: 0, height: '100%', background, borderBottomLeftRadius: 4 }}>
                    <ContainedImage
                        size="cover"
                        src={source.imageUrl}
                        style={{ marginRight: 0, border: `solid 2px ${background}` }}
                    />
                </DetailImageContainer>
                <FlexColumn style={{ minHeight: 204 }}>
                    <DetailTitle>{source.title}</DetailTitle>
                    <Host>
                        <span>Host: </span>
                        <Link href={source.url} popup>
                            {getHost(source.url)}
                        </Link>
                    </Host>
                    <Subtitle>Synopsis</Subtitle>
                    <ChapterDescription>{source.description}</ChapterDescription>
                </FlexColumn>
            </FlexRow>
            <ChapterList>
                {urls.map((chapter) => (
                    <ChapterRow chapter={chapter} key={chapter.id} />
                ))}
            </ChapterList>
        </Dialog>
    )
}
