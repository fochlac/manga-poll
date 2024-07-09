import styled from 'styled-components'

export const Badge = styled.span`
    position: relative;

    &::before {
        content: ${({ value }) => (['string', 'number'].includes(typeof value) ? `'${value}'` : null)};
        position: absolute;
        bottom: ${({small}) => small ? 3 : 6}px;
        right: -2px;
        transform: translateX(100%);
        background-color: var(--destructive-dark);
        color: var(--brand-contrast);
        font-size: 10px;
        line-height: 12px;
        padding: 1px 4px 1px 4px;
        border-radius: 7px;
        min-width: 12px;
    }
`
