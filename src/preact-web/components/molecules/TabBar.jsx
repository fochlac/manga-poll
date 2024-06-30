import styled from 'styled-components'
import { URL_LIST, BOOKMARKS } from '../../constants/routes'
import { useDispatch, useSelector } from '../../utils/atom'
import { Badge } from '../atoms/Badge'

const Bar = styled.nav`
    height: 36px;
    color: var(--brand);
    background: var(--brand-lightest);
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 max(calc((100vw - 800px) / 3), 16px) 0 max(16px, calc((100vw - 800px) / 3));
    flex-shrink: 0;
    z-index: 20;
`
const Tab = styled.a`
    display: flex;
    border-bottom: solid 2px ${({ active }) => (active ? 'var(--font)' : 'transparent')};
    cursor: ${({ active }) => (active ? 'default' : 'pointer')};
    user-select: none;
    line-height: 36px;
    height: 100%;
    flex-basis: ${({count}) => `${Math.floor(1 / count * 100)}%`};
    flex-grow: 1;
    text-align: center;
    justify-content: center;
    color: var(--font);
`

const NavigationTab = ({ children, link, count }) => {
    const dispatch = useDispatch()
    const route = useSelector((store) => store.route)

    return (
        <Tab onClick={() => dispatch('navigate', link)} active={route?.key === link} count = {count}>
            {children}
        </Tab>
    )
}

export function TabBar () {
    const { urls } = useSelector((store) => ({ urls: store.urls }))
    return (
        <Bar>
            <NavigationTab link={URL_LIST} count={2}>
                <Badge value={urls?.newUrls.length > 0 ? urls.newUrls.length : null}>Feed</Badge>
            </NavigationTab>
            <NavigationTab link={BOOKMARKS} count={2}>Stories</NavigationTab>
        </Bar>
    )
}
