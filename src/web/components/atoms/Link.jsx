import styled from 'styled-components'
import { stopPropagation } from '../../utils/events'

const LinkRaw = styled.a`
    text-decoration: none;
    cursor: pointer;
    color: ${({ theme }) => theme.linkColor};

    &:hover {
        color: ${({ theme }) => theme.linkColorHover};
    }
    &:active {
        color: ${({ theme }) => theme.linkColorActive};
    }
    &:visited {
        color: ${({ theme, hideVisit }) => (hideVisit ? theme.linkColor : theme.linkColorVisited)};
    }
    &:visited:hover {
        color: ${({ theme, hideVisit }) => (hideVisit ? theme.linkColorHover : theme.linkColorVisitedHover)};
    }
    &:visited:active {
        color: ${({ theme, hideVisit }) => (hideVisit ? theme.linkColorActive : theme.linkColorVisitedActive)};
    }
`

LinkRaw.defaultProps = {
    theme: {
        linkColor: 'var(--link)',
        linkColorHover: 'var(--link-hover)',
        linkColorActive: 'var(--link-active)',
        linkColorVisited: 'var(--link-visited)',
        linkColorVisitedHover: 'var(--link-visited-hover)',
        linkColorVisitedActive: 'var(--link-visited-active)'
    }
}

export const Link = ({ newTab, target, rel, ...props }) => {
    return (
        <LinkRaw
            {...props}
            target={newTab ? '_blank' : target}
            rel={newTab ? 'noreferrer' : rel}
            onClick={stopPropagation(props.onClick)}
        />
    )
}
