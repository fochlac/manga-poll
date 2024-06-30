import styled, { keyframes, css } from 'styled-components'

const fadeIn = keyframes`
  from {
    background-color: #00000010;
  }

  to {
    background-color: #00000040;
  }
`
const fadeOut = keyframes`
  from {
    background-color: #00000040;
  }

  to {
    background-color: #00000000;
  }
`
const showAnimation = css`animation: ${fadeIn} 0.2s linear forwards`
const hideAnimation = css`animation: ${fadeOut} 0.2s linear forwards`

export const Backdrop = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    flex-direction: column;
    z-index: 100;
    top: ${({showTopbar}) => showTopbar ? '54px' : 0};
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    ${(props) => (props.visible ? showAnimation : hideAnimation)};
`

export const DialogBox = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--background);
    border-radius: 4px;
    max-width: 90vw;
    overflow: hidden;
    max-height: 90vh;
    box-shadow: 0px 3px 2px -1px rgb(0 0 0 / 20%), 0px 1px 2px 1px rgb(0 0 0 / 14%), 0px 1px 4px 1px rgb(0 0 0 / 12%); ;
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
    z-index: 1;
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
