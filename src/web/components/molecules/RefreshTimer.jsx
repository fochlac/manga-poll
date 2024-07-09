import { useEffect, useRef, useState } from 'preact/hooks'
import { useDispatch, useSelector } from '../../utils/atom'
import { ActionLink } from '../atoms/ActionLink'
import styled from 'styled-components'

const Timer = styled(ActionLink)`
    display: block;
    font-size: 14px;
    line-height: 14px;
    min-width: 110px;
    margin-right: 8px;
    text-align: left;
    position: relative;

    &:hover::before {
        content: attr(data-before);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--background);
        white-space: nowrap;
    }
`

export function RefreshTimer () {
    const dispatch = useDispatch()
    const [progress, setProgress] = useState('Next refresh: 0s')
    const fetchTime = useSelector((store) => store.fetchTime)
    const timer = useRef()
    useEffect(() => {
        timer.current = setInterval(() => {
            const diffToLast = Date.now() - (fetchTime?.lastPing ?? 0)
            const diffToNext = (fetchTime?.nextPing ?? Date.now()) - Date.now()
            let text = `Next refresh: ${Math.max(Math.ceil(diffToNext / 1000), 0)}s`
            if (diffToLast <= 2500) {
                text = 'Refreshed'
            }
            if (text !== progress) {
                setProgress(text)
            }
        }, 50)

        return () => clearInterval(timer.current)
    }, [setProgress, fetchTime, progress])

    return (
        <Timer data-before="Refresh now!" onClick={() => dispatch('triggerFetch')}>
            {progress}
        </Timer>
    )
}
