import { ActionLink } from '../atoms/ActionLink'
import { SmallerText } from '../atoms/Typography'
import styled from 'styled-components'
import { useDispatch } from '../../utils/atom'
import { IMPRESSUM } from '../../constants/routes'

const FooterBar = styled.div`
    cursor: default;
    display: flex;
    justify-content: space-between;
    border-top: solid 1px lightslategrey;
    margin-top: auto;
    padding: ${({small}) => small ? 1 : 2}px max(calc((100vw - 800px) / 3 + 16px), 16px) ${({small}) => small ? 2 : 3}px max(16px, calc((100vw - 800px) / 3 + 8px));
`

export function Footer ({ small }) {
    const dispatch = useDispatch()

    const style = small ? {fontSize: 12, lineHeight: '15px'} : { fontSize: 14 }
    return (
        <FooterBar small={small}>
            <SmallerText style={{ margin: 0, ...style }}>Designed and developed by Florian Riedel. © 2020</SmallerText>
            <ActionLink onClick={() => dispatch('overlay', IMPRESSUM)} style={{ whiteSpace: 'nowrap', ...style, fontWeight: 600 }}>
                Legal Disclosure
            </ActionLink>
        </FooterBar>
    )
}
