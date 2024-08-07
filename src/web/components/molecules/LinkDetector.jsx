import { X } from 'preact-feather'
import { useState } from 'preact/hooks'
import styled from 'styled-components'
import { useDispatch, useSelector } from '../../utils/atom'
import { ActionLink } from '../atoms/ActionLink'
import { FlexRow } from '../atoms/Layout'

const Bar = styled(FlexRow)`
    height: 32px;
    background: var(--brand-light);
    color: var(--brand-contrast);
    padding: 0 16px 0 max(16px, calc((100vw - 800px) / 3 + 16px));
    border-bottom: solid 1px var(--brand-contrast);
`

export function LinkDetector () {
    const dispatch = useDispatch()
    const link = useSelector((store) => store.link)
    const isLoading = useSelector((store) => store.isLoading)
    const [hidden, setHidden] = useState(false)
    const [error, setError] = useState(false)
    const extLinkKey = sessionStorage.getItem('MangaScoutLinkKey')

    if (isLoading || link?.key || !extLinkKey || hidden || error) return null

    return (
        <Bar>
            <FlexRow>
                Manga-Scout extension detected.
                <ActionLink
                    style={{ textDecoration: 'underline' }}
                    light
                    onMouseDown={() => dispatch('connectToLink', extLinkKey).catch(() => setError(true))}
                >
                    Click to connect
                </ActionLink>
                .
            </FlexRow>
            <FlexRow>
                <ActionLink light onMouseDown={() => setHidden(true)}>
                    <X size={20} />
                </ActionLink>
            </FlexRow>
        </Bar>
    )
}
