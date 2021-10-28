import styled from 'styled-components'

export const Backdrop = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.visible ? '#00000040' : 'transparent'};
`

export const DialogBox = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #ffffff;
    border-radius: 4px;
    max-width: 90vw;
    overflow: hidden;
    max-height: 90vh;
    box-shadow: 0px 3px 2px -1px rgb(0 0 0 / 20%), 0px 1px 2px 1px rgb(0 0 0 / 14%), 0px 1px 4px 1px rgb(0 0 0 / 12%);;
`

export const DialogTitle = styled.h5`
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    padding: 0;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: default;
    margin-left: 16px;
    margin-top: 8px;
`
export const DialogHead = styled.header`
    width: 100%;
    height: 32px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`
export const DialogBody = styled.main`
    width: calc(100% - 16px);
    margin: 0 8px 8px;
    padding: 0 8px 8px;
    box-sizing: border-box;
    overflow-y: auto;
`
export const DialogCloseIcon = styled.nav`
    height: 32px;
    min-width: 32px;
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
