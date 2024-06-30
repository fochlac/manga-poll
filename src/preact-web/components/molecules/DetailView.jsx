import styled from 'styled-components'
import { getHost } from '../../../common/utils'
import { ContainedImage } from '../atoms/Image'
import { FlexColumn, FlexRow } from '../atoms/Layout'
import { Link } from '../atoms/Link'
import { ChapterRow } from './ChapterRow'
import { Dialog } from './Dialog'
import { Button, DestructiveButton } from '../atoms/Button'
import { ButtonBar } from '../atoms/ButtonBar'
import { useDispatch } from '../../utils/atom'

const DetailImageContainer = styled.div`
    max-width: 30%;
    margin-right: 8px;
    flex-grow: 0;
    margin-right: 4px;
    height: calc(100% - 4px);
    background: var(--brand);
    border-bottom-left-radius: 4px;
    max-height: 200px;
    min-height: calc(100% - 4px);
    height: 200px;
    width: 140px;

    @media (max-width: 500px) {
        height: 120px;
        width: 100px;
        min-height: unset;
    }
`
const DetailTitle = styled.h3`
    font-size: 1.8rem;
    margin: 0;
    width: 100%;

    @media (max-width: 500px) {
        font-size: 1.5rem;
    }
`
const Host = styled.h6`
    white-space: nowrap;
    font-size: 0.8rem;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
`
const Subtitle = styled.h5`
    width: 100%;
    margin-bottom: 0;
    margin-top: auto;
    padding-left: 16px;
    box-sizing: border-box;

    @media (max-width: 500px) {
        display: none;
    }
`
const ChapterDescription = styled.p`
    padding: 8px 16px;
    text-align: justify;
    background: var(--brand);
    color: var(--brand-contrast);
    margin-top: 4px;
    margin-bottom: 0;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    max-height: 156px;
    overflow: auto;
`
const ChapterList = styled.ul`
    padding: 0;
    overflow-y: auto;
    flex-shrink: 1;
`
const TitleContainer = styled.div`
    overflow: visible;
    width: 100%;
    padding-left: 16px;
    margin-bottom: 16px;

    @media (max-width: 500px) {
        height: 0;
        margin-left: min(125px, calc(30vw + 25px));
        width: calc(100% - min(125px, calc(30vw + 5px)));
        margin-top: -120px;
        margin-bottom: 120px;
        padding-right: 25px;
    }
`
const InfoContainer = styled(FlexColumn)`
    min-height: 204px;

    @media (max-width: 500px) {
        min-height: unset;
    }
`

export function DetailView ({ onClose, source, urls }) {
    const dispatch = useDispatch()

    if (!source) return null

    return (
        <Dialog
            title={''}
            onClose={onClose}
            dialogStyle={{
                height: 'max(calc(80vh - (100vw - 800px)), 80vh)',
                width: 'calc(90vw - ((100vw - 800px) / 1.5))',
                maxWidth: '100%',
                maxHeight: 'calc(100% - 54px)',
                marginTop: '54px',
                borderRadius: 'min(4px, calc(4px + 100vw - 700px))'
            }}
            bodyStyle={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', marginTop: -32, height: '100%' }}
        >
            <FlexRow align="flex-start" style={{ marginBottom: 16, flexShrink: 0 }} flip={500}>
                <DetailImageContainer>
                    <ContainedImage
                        size="cover"
                        src={source.imageUrl}
                        style={{ marginRight: 0, border: 'solid 2px var(--brand)' }}
                    />
                </DetailImageContainer>
                <InfoContainer>
                    <TitleContainer>
                        <DetailTitle>{source.title}</DetailTitle>
                        <Host>
                            <span>Host: </span>
                            <Link href={source.url} newTab>
                                {getHost(source.url)}
                            </Link>
                        </Host>
                    </TitleContainer>
                    <Subtitle>Synopsis</Subtitle>
                    <ChapterDescription>{source.description}</ChapterDescription>
                </InfoContainer>
            </FlexRow>
            <ChapterList>
                {urls.map((chapter) => (
                    <ChapterRow chapter={chapter} key={chapter.id} />
                ))}
            </ChapterList>
            <ButtonBar>
                <DestructiveButton
                    onClick={() => dispatch('deleteSource', source.id).then(() => onClose())}
                    style={{ marginLeft: 'auto' }}
                >
                    Unfollow
                </DestructiveButton>
                <Button onClick={onClose} style={{ marginLeft: 8 }}>
                    Close
                </Button>
            </ButtonBar>
        </Dialog>
    )
}
