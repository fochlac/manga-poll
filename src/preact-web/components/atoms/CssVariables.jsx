import { useMemo } from 'preact/hooks'
import { createGlobalStyle } from 'styled-components'
import { Themes } from '../../constants/themes'
import { createTheme } from '../../utils/theme'
import { useSelector } from '../../utils/atom'

export const CssVariables = createGlobalStyle`
    :root {
        ${({ theme }) => Object.keys(theme).reduce((styles, prop) => `${styles}\n${prop}: ${theme[prop]};`, '')}
    }

    html, body {
        background-color: var(--background);
        color: var(--font);
    }

    input, select {
        color-scheme: var(--color-scheme);
        background-color: var(--background)
    }
`

export const Theme = () => {
    const isDark = useSelector(({ settings }) => settings?.dark)

    const theme = useMemo(() => {
        return createTheme(isDark ? Themes.DARK : Themes.DEFAULT)
    }, [isDark])

    return <CssVariables theme={theme} />
}
