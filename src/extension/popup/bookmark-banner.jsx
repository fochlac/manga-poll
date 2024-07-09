import { useEffect } from 'preact/hooks'
import { getHost } from '../../common/utils'
import { db } from '../storage'
import { useSafeState } from '../../web/hooks/use-safe-state'
import { API } from '../../common/api'
import { API_ADDRESS } from '../constants'
import { ActionLink } from '../../web/components/atoms/ActionLink'
import styled from 'styled-components'
import { FlexRow } from '../../web/components/atoms/Layout'
import { rotation } from '../../web/components/atoms/animations'
import { Loader } from 'preact-feather'

const Banner = styled(FlexRow)`
    min-height: 28px;
    background: var(--destructive-dark);
    color: var(--brand-contrast);
    padding: 0 16px 0 max(16px, calc((100vw - 800px) / 3 + 16px));
`

const LoaderAnimated = styled(Loader)`
    ${rotation};
`
const Text = styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const controller = chrome || browser
const { Source } = API(API_ADDRESS, db)

const addSource = (source) => {
    return Source.insert(source)
        .then((source) => source && db.sources.add(source))
}

function testBookmark () {
    controller.tabs.query(
        { active: true, windowId: controller.windows.WINDOW_ID_CURRENT },
        (tabs) => {
            if (tabs[0].url.includes('http://') || tabs[0].url.includes('https://')) {
                if (controller.scripting) {
                    controller.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        files: ['./test-bookmark.js']
                    })
                }
                else if (controller.tabs?.executeScript) {
                    controller.tabs.executeScript(tabs[0].id, {
                        file: './test-bookmark.js'
                    })
                }
            }
        }
    )
}

export function BookmarkBanner () {
    const [source, setSource] = useSafeState(null)
    const [isAdding, setIsAdding] = useSafeState(false)
    useEffect(() => {
        controller.runtime.onMessage.addListener(async (request) => {
            if (request.id && request.title && request.url) {
                const sources = await db.sources.read()

                if (!sources.some((source) => getHost(source.url) === getHost(request.url) && String(source.mangaId) === String(request.id))) {
                    setSource({
                        type: request.type,
                        mangaId: request.id,
                        title: request.title,
                        url: request.url
                    })
                    return
                }
            }
        })
        testBookmark()
    }, [])

    if (!source) return null

    const onFollow = async () => {
        setIsAdding(true)
        try {
            await addSource(source)
            setSource(null)
        }
        finally {
            setIsAdding(false)
        }
    }

    return (
        <Banner>
            <Text>Do you want to start tracking "{source.title}"?</Text>
            <FlexRow as="span">
                {isAdding && (<LoaderAnimated size={16} />)}
                <ActionLink style={{ fontWeight: 600, marginLeft: 8 }} disabled={isAdding} onClick={onFollow}>Follow</ActionLink>
            </FlexRow>
        </Banner>
    )
}

