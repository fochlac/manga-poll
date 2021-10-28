import styled from 'styled-components'
import { preventDefault } from '../../utils/events'
import { Link } from './Link'

export const ActionLinkRaw = styled(Link)`
    font-size: ${(props) => (props.small ? '0.8rem' : '')};
    letter-spacing: 0.1px;
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    color: ${({ theme, disabled }) => (disabled ? theme.linkColorDisabled : theme.linkColor)};
    margin-left: 4px;

    &:hover {
        color: ${({ theme, disabled }) => (disabled ? theme.linkColorDisabled : theme.linkColorHover)};
    }
    &:active {
        color: ${({ theme, disabled }) => (disabled ? theme.linkColorDisabled : theme.linkColorActive)};
    }
`
ActionLinkRaw.defaultProps = {
    theme: {
        linkColor: '#1e6bf7',
        linkColorHover: '#407ef1',
        linkColorActive: '#0e46af',
        linkColorDisabled: '#c3cbd2'
    }
}

export const ActionLink = ({ onClick, disabled, ...props }) => {
    return (
        <ActionLinkRaw
            onClick={preventDefault((e) => !disabled && typeof onClick === 'function' && onClick(e))}
            disabled={disabled}
            {...props}
        />
    )
}
