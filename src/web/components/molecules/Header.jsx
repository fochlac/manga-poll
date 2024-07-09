import { Settings } from 'preact-feather'
import { useState } from 'preact/hooks'
import styled from 'styled-components'
import { URL_LIST, SETTINGS, IMPRESSUM } from '../../constants/routes'
import { useDispatch, useSelector } from '../../utils/atom'
import { ActionLink } from '../atoms/ActionLink'
import { FlexRow } from '../atoms/Layout'
import { useOverlayDelay } from './Router'

const Bar = styled.header`
    height: ${({small}) => small ? 40 : 54}px;
    background: var(--brand);
    color: var(--brand-contrast);
    z-index: 1000;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 ${({small}) => small ? 7 : 16}px 0 max(16px, calc((100vw - 800px) / 3 + 16px));
`
const Title = styled.h1`
    font-size: ${({small}) => small ? 20 : 22}px;
    letter-spacing: 0.9px;
`
const HeaderImage = styled.img`
    width: ${({small}) => small ? 24 : 32}px;
    height: ${({small}) => small ? 24 : 32}px;
    margin-right: 12px;
    border-radius: 15%;
`

export function Header ({ small }) {
    const dispatch = useDispatch()
    const route = useSelector((store) => store.route)
    const [showX, setShowX] = useState(false)
    const settingsOpen = route.overlay === SETTINGS
    useOverlayDelay(() => {
        setShowX(settingsOpen)
    }, [settingsOpen])

    return (
        <Bar small={small}>
            <FlexRow onClick={() => dispatch('navigate', URL_LIST)} style={{ cursor: 'pointer' }}>
                <HeaderImage small={small} src="/icons/manga-32-half.png" alt="Manga-Scout Logo" />
                <Title small={small} id="popupTitle">Manga-Scout</Title>
            </FlexRow>
            <FlexRow>
                <ActionLink
                    onMouseDown={() => dispatch('overlay', showX ? '' : SETTINGS)}
                    small
                    light
                    disabled={route.overlay === IMPRESSUM}
                >
                    <Settings size={small ? 22 : 24} />
                </ActionLink>
            </FlexRow>
        </Bar>
    )
}
