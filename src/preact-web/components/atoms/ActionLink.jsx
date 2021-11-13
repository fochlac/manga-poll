import styled from 'styled-components'
import { preventDefault } from '../../utils/events'
import { Link } from './Link'

const getLinkColour = (state) => ({theme, light, disabled}) => {
    if (disabled) {
        return light ? theme.linkColorDisabledLight : theme.linkColorDisabled
    }
    if (state === 'hover') {
        return light ? theme.linkColorHoverLight : theme.linkColorHover
    }
    if (state === 'active') {
        return light ? theme.linkColorActiveLight : theme.linkColorActive
    }
    return light ? theme.linkColorLight : theme.linkColor
}

export const ActionLinkRaw = styled(Link)`
    font-size: ${(props) => (props.small ? '0.8rem' : '')};
    letter-spacing: 0.1px;
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    color: ${getLinkColour()};
    margin-left: 4px;

    &:hover {
        color: ${getLinkColour('hover')};
    }
    &:active {
        color: ${getLinkColour('active')};
    }
`
ActionLinkRaw.defaultProps = {
    theme: {
        linkColor: '#1e6bf7',
        linkColorHover: '#407ef1',
        linkColorActive: '#0e46af',
        linkColorDisabled: '#c3cbd2',
        linkColorLight: '#e6f1f2',
        linkColorHoverLight: '#d0e3e6',
        linkColorActiveLight: '#c0d4da',
        linkColorDisabledLight: '#adadad'
    }
}

export const ActionLink = ({ onClick, disabled, onMouseDown, ...props }) => {
    return (
        <ActionLinkRaw
            onClick={preventDefault((e) => !disabled && typeof onClick === 'function' && onClick(e))}
            onMouseDown={preventDefault((e) => !disabled && typeof onMouseDown === 'function' && onMouseDown(e))}
            disabled={disabled}
            {...props}
        />
    )
}
