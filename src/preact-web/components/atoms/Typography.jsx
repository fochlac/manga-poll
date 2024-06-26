import styled from 'styled-components'

export const DefaultText = styled.p`
    margin: 0px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.01071em;
    color: var(--font);
`

export const SmallerText = styled.p`
    font-size: 0.95rem;
    line-height: 1.1rem;
    display: block;
    margin-right: 8px;
    margin-top: 4px;
    margin-bottom: 8px;
    overflow: hidden;
    width: 100%;
    text-align: justify;
    padding: 0 4px;
    box-sizing: border-box;
`

export const Label = styled.legend`
    display: block;
    width: auto;
    padding: 0px;
    height: 11px;
    font-size: 0.75em;
    max-width: 100%;
`

export const H6 = styled.h6`
    font-size: 0.8rem;
    margin: 16px 0 4px;
    border-bottom: solid 1px var(--font);
    padding-left: 2px;
`

export const H5 = styled.h5`
    font-size: 1.2rem;
    margin: 8px 0;
`
