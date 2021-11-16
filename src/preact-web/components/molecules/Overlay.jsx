import { X } from 'preact-feather'
import styled, { css, keyframes } from 'styled-components'
import { preventDefault } from '../../utils/events'
import { FlexColumn, FlexRow } from '../atoms/Layout'
import { Backdrop } from '../atoms/Modal'
import { OVERLAY_HIDE_TIMEOUT } from './Router'

const fadeIn = keyframes`
from {
  transform: translateX(calc(100% + max(calc((100vw - 800px) / 3), 8px)));
}

to {
  transform: translateX(0%);
}
`
const fadeOut = keyframes`
from {
  transform: translateX(0%);
}

to {
  transform: translateX(calc(100% + max(calc((100vw - 800px) / 3), 8px)));
}
`
const showAnimation = css`
    animation: ${fadeIn} 0.2s ease-out forwards;
`
const hideAnimation = css`
    animation: ${fadeOut} ${() => `${OVERLAY_HIDE_TIMEOUT}s`} ease-out forwards;
`

const OverlayBody = styled(FlexColumn)`
    position: absolute;
    background: white;
    height: 100%;
    z-index: 100;
    top: 0;
    transform: translateX(calc(100% + max(calc((100vw - 800px) / 3), 8px)));
    width: calc(90% - max(calc((100vw - 800px) / 1.5), 8px));
    margin: 0 max(calc((100vw - 800px) / 3), 0px) 0 max(64px, calc(10% + (100vw - 800px) / 3));
    box-sizing: border-box;
    ${({ hideOverlay, instantVisible, instantHidden }) =>
        hideOverlay ? !instantHidden && hideAnimation : !instantVisible && showAnimation}
    cursor: default;
    padding-top: 0;

    @media (max-width: 800px) {
        transform: unset;
        right: 0;
        width: calc(100% - 32px);
    }
`

const OverlayContent = styled(FlexColumn)`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 16px;
    box-sizing: border-box;

    &:after {
        content: '';
        background: white;
        height: 16px;
        position: absolute;
        bottom: 0;
        width: calc(100% - 32px);
        margin: 0 16px;
        left: 0;
    }
`

const OverlayTitle = styled(FlexRow)`
    padding: 8px 16px;
    min-height: 20px;
    color: #e6f1f2;
    background: #224049;
    font-size: 18px;
    letter-spacing: 0.8px;
    margin: 0;
    position: relative;
    padding-right: 35px;
`
const Close = styled.div`
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    height: 36px;
    width: 36px;
    background: #224049;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background: #1f3841;
    }
    &:active {
        background: #1b323a;
    }
`

export function Overlay ({ visible, children, onClose, title, instantVisible, instantHidden, ...props }) {
    return (
        <Backdrop visible={visible} showTopbar onClick={onClose}>
            <OverlayBody
                align="stretch"
                hideOverlay={!visible}
                onClick={preventDefault()}
                instantVisible={instantVisible}
                instantHidden={instantHidden}
            >
                {typeof title === 'string' && <OverlayTitle as="h4">
                    {title}
                    <Close onMouseDown={onClose}><X size={24} /></Close>
                </OverlayTitle>}
                <OverlayContent align="stretch" {...props}>
                    {children}
                </OverlayContent>
            </OverlayBody>
        </Backdrop>
    )
}
