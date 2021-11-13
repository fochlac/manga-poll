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
        linkColor: '#1e6bf7',
        linkColorHover: '#407ef1',
        linkColorActive: '#0e46af',
        linkColorVisited: '#5e28cc',
        linkColorVisitedHover: '#855adb',
        linkColorVisitedActive: '#511fb6'
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
