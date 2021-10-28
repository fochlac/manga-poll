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
    text-align: right;
`

export function RefreshTimer () {
    const dispatch = useDispatch()
    const [progress, setProgress] = useState('Next refresh: 0s')
    const fetchTime = useSelector((store) => store.fetchTime)
    const timer = useRef()
    useEffect(() => {
        timer.current = setInterval(() => {
            const diffToLast = Date.now() - fetchTime.lastPing
            const diffToNext = fetchTime.nextPing - Date.now()
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
        <Timer id="progress" data-before="Refresh now!" onClick={() => dispatch('triggerFetch')}>
            {progress}
        </Timer>
    )
}
