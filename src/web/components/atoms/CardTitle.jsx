import styled from 'styled-components'

export const CardTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: calc(100% + 16px);
    justify-content: space-between;
    margin-right: -16px;
`
export const CardTitle = styled.div`
    margin: 8px 0;
    padding-left: 0;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
`
export const CardTitleText = styled.h5`
    margin: 0;
    padding: 0;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: default;
`
export const CardMenu = styled.div``
export const CardMenuItem = styled.div`
    height: 30px;
    min-width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;

    &:hover {
        background: rgb(0 0 0 / 10%);
    }
    &:active {
        background: rgb(0 0 0 / 15%);
    }
`
