import { css, keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    background-color: #00000010;
  }

  to {
    background-color: #00000060;
  }
`
const fadeOut = keyframes`
  from {
    background-color: #00000060;
  }

  to {
    background-color: #00000000;
  }
`
const fadeToBackground = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`
const fadeShrinkToBackground = keyframes`
  from {
    opacity: 1;
    max-height: 100vh;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  to {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
`

const rotate = keyframes`
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(360deg);
  }
`
const showAnimation = css`animation: ${fadeIn} 0.2s linear forwards;`
const hideAnimation = css`animation: ${fadeOut} 0.2s linear forwards;`
const fadeAnimation = css`animation: ${fadeToBackground} 1s linear forwards;`
const fadeShrinkAnimation = css`animation: ${fadeShrinkToBackground} 1s linear forwards;`
const rotation = css`animation: ${rotate} 2.5s linear forwards infinite;`

export {fadeIn, fadeOut, hideAnimation, showAnimation, rotation, fadeAnimation, fadeShrinkAnimation}
