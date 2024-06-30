import { ActionLink } from '../atoms/ActionLink'
import { SmallerText } from '../atoms/Typography'
import styled from 'styled-components'
import { useDispatch } from '../../utils/atom'
import { IMPRESSUM } from '../../constants/routes'

const FooterBar = styled.div`
    cursor: default;
    display: flex;
    justify-content: space-between;
    padding: 2px 8px 3px;
    border-top: solid 1px lightslategrey;
    margin-top: auto;
    padding: 2px max(calc((100vw - 800px) / 3 + 16px), 16px) 3px max(16px, calc((100vw - 800px) / 3 + 8px));
`

export function Footer () {
    const dispatch = useDispatch()

    return (
        <FooterBar>
            <SmallerText style={{ margin: 0, fontSize: '0.8rem' }}>Designed and developed by Florian Riedel. © 2020</SmallerText>
            <ActionLink onClick={() => dispatch('overlay', IMPRESSUM)} style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                Legal Disclosure
            </ActionLink>
        </FooterBar>
    )
}
