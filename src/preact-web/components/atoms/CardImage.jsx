import styled from 'styled-components'

export const CardImage = styled.div`
    min-height: 100%;
    width: 90px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    flex-shrink: 0;
    background-image: url(${(props) => props.src});
    background-position: center;
    background-size: cover;
`
