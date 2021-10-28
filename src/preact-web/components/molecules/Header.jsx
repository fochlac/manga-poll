import { Settings } from 'preact-feather'
import styled from 'styled-components'
import { URL_LIST, SETTINGS } from '../../constants/routes'
import { useDispatch, useSelector } from '../../utils/atom'
import { ActionLink } from '../atoms/ActionLink'
import { FlexRow } from '../atoms/Layout'

const Bar = styled.header`
    height: 54px;
    background: #062832;
    color: rgb(230, 241, 242);
    margin: 0;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 max(calc((100vw - 800px) / 3 + 16px), 16px) 0 max(16px, calc((100vw - 800px) / 3 + 16px));
`
const Title = styled.h1`
    font-size: 22px;
`
const HeaderImage = styled.img`
    width: 32px;
    height: 32px;
    margin-right: 12px;
    border-radius: 15%;
`

export function Header () {
    const dispatch = useDispatch()
    const route = useSelector((store) => store.route)

    return (
        <Bar>
            <FlexRow onClick={() => dispatch('navigate', URL_LIST)} style={{cursor: 'pointer'}}>
                <HeaderImage src="/android-chrome-144x144.png" alt="Manga-Scout Logo" />
                <Title id="popupTitle">Manga-Scout</Title>
            </FlexRow>
            <FlexRow>
                <ActionLink disabled={route.key === SETTINGS} onClick={() => dispatch('navigate', SETTINGS)} small>
                    <Settings size={24} />
                </ActionLink>
            </FlexRow>
        </Bar>
    )
}
