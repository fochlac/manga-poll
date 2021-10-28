import styled from 'styled-components'

export const ContainedImage = styled.picture`
    width: ${({ width = '150px' }) => width};
    height: ${({ height = '200px' }) => height};
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    flex-shrink: 0;
    background-image: url(${(props) => props.src});
    background-position: center;
    background-size: ${({ size = 'contain' }) => size};
    background-repeat: no-repeat;
`
