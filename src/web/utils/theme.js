import { darken, getLuminance, lighten, mix } from 'polished'

export const createTheme = ({
    link,
    font,
    background,
    destructive,
    brand,
    linkVisited
}) => {
    const contrast = mix(0.5, font, background)
    const fontDisabled = mix(0.8, font, background)
    const button = mix(0.1, font, background)
    return {
        '--background': background,
        '--background-off': getLuminance(background) > getLuminance(font) ? darken(0.025, background) : lighten(0.025, background),
        '--background-off-strong': getLuminance(background) > getLuminance(font) ? darken(0.1, background) : lighten(0.1, background),
        '--color-scheme': getLuminance(background) > getLuminance(font) ? 'light' : 'dark',
        '--brand': brand,
        '--brand-contrast': lighten(0.9, brand),
        '--brand-light': lighten(0.05, brand),
        '--brand-lightest': getLuminance(background) > getLuminance(font) ? lighten(0.81, brand) : lighten(0.05, brand),
        '--font': font,
        '--font-disabled': fontDisabled,
        '--link': link,
        '--backdrop': '#00000040',
        '--link-hover': lighten(0.03, link),
        '--link-active': darken(0.1, link),
        '--link-visited': linkVisited,
        '--link-visited-hover': lighten(0.03, linkVisited),
        '--link-visited-active': darken(0.1, linkVisited),
        '--link-destructive': destructive,
        '--link-destructive-hover': lighten(0.03, destructive),
        '--link-destructive-active': darken(0.1, destructive),
        '--contrast': mix(0.5, font, background),
        '--contrast-light': lighten(0.15, contrast),
        '--contrast-lighter': lighten(0.25, contrast),
        '--contrast-dark': darken(0.1, contrast),
        '--contrast-darker': darken(0.2, contrast),
        '--default-button-background': button,
        '--default-button-active': darken(0.025, button),
        '--default-button-hover': lighten(0.025, button),
        '--destructive': destructive,
        '--destructive-lightest': lighten(0.45, destructive),
        '--destructive-button-active': darken(0.025, destructive),
        '--destructive-button-hover': lighten(0.025, destructive),
        '--destructive-dark': darken(0.2, destructive),
        '--destructive-darker': darken(0.3, destructive)
    }
}
