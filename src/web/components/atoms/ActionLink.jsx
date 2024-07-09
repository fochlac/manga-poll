import styled from 'styled-components'
import { preventDefault } from '../../utils/events'
import { Link } from './Link'

const getColor = (state = '') => ({destructive, light, disabled}) => {
    if (light) return 'var(--brand-contrast)'
    return destructive ? `var(--link-destructive${!disabled ? state : ''})` : `var(--link${!disabled ? state : ''})`
}

export const ActionLinkRaw = styled(Link)`
    font-size: ${(props) => (props.small ? '0.8rem' : '')};
    letter-spacing: 0.1px;
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    opacity: ${(props) => (props.disabled ? '0.5' : '1')};
    color: ${getColor()};
    margin-left: 4px;

    &:hover {
        color: ${getColor('-hover')};
    }
    &:active {
        color: ${getColor('-active')};
    }
`

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
