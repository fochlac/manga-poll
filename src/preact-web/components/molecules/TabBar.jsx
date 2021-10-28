import styled from 'styled-components'
import { URL_LIST, BOOKMARKS } from '../../constants/routes'
import { useDispatch, useSelector } from '../../utils/atom'
import { Badge } from '../atoms/Badge'

const Bar = styled.nav`
    height: ${({ theme }) => theme.tabBarHeight};
    color: ${({ theme }) => theme.colorPrimary};
    background: ${({ theme }) => theme.colorPrimaryLight};
    margin: 0;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 max(calc((100vw - 800px) / 3), 16px) 0 max(16px, calc((100vw - 800px) / 3));
    flex-shrink: 0;
`
const Tab = styled.a`
    display: flex;
    border-bottom: solid 2px ${({ active, theme }) => (active ? theme.colorPrimary : 'transparent')};
    cursor: ${({ active }) => (active ? 'default' : 'pointer')};
    user-select: none;
    line-height: ${({ theme }) => theme.tabBarHeight};
    height: 100%;
    padding: 0 64px;
    flex-grow: 1;
    text-align: center;
    justify-content: center;
`
const defaultProps = {
    theme: {
        colorPrimary: '#062832',
        colorPrimaryLight: 'rgb(230, 241, 242)',
        tabBarHeight: '36px'
    }
}
Bar.defaultProps = defaultProps
Tab.defaultProps = defaultProps

const NavigationTab = ({ children, link }) => {
    const dispatch = useDispatch()
    const route = useSelector((store) => store.route)

    return (
        <Tab onClick={() => dispatch('navigate', link)} active={route?.key === link}>
            {children}
        </Tab>
    )
}

export function TabBar () {
    const { urls } = useSelector((store) => ({ urls: store.urls }))
    return (
        <Bar>
            <NavigationTab link={URL_LIST}>
                <Badge value={urls?.newUrls.length > 0 ? urls.newUrls.length : null}>Feed</Badge>
            </NavigationTab>
            <NavigationTab link={BOOKMARKS}>Stories</NavigationTab>
        </Bar>
    )
}
