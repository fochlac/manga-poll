import styled from 'styled-components'

export const ButtonBar = styled.nav`
    margin-top: auto;
    display: flex;

    & > button {
        margin-left: 8px;
    }
    & > button:first-child {
        margin-left: auto;
    }
`
