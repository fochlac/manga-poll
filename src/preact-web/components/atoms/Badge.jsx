import styled from 'styled-components'

export const Badge = styled.span`
    position: relative;

    &::before {
        content: ${({ value }) => (['string', 'number'].includes(typeof value) ? `'${value}'` : null)};
        position: absolute;
        bottom: -2px;
        right: -20px;
        transform: translateY(-50%);
        background-color: ${({ theme }) => theme.colorPrimary};
        color: ${({ theme }) => theme.colorPrimaryLight};
        font-size: 10px;
        line-height: 12px;
        padding: 1px 3px;
        border-radius: 7px;
        width: 12px;
    }
`
Badge.defaultProps = {
    theme: {
        colorPrimary: '#062832',
        colorPrimaryLight: 'rgb(230, 241, 242)'
    }
}
