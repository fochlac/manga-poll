import { createRef } from 'preact'
import { useRef, useState } from 'preact/hooks'
import styled from 'styled-components'
import { useSafeState } from '../../hooks/use-safe-state'
import { useDispatch, useSelector } from '../../utils/atom'
import { Alert } from '../atoms/Alert'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import { FlexColumn, FlexRow } from '../atoms/Layout'
import { ProgressIndeterminate } from '../atoms/Progress'
import { H6, SmallerText } from '../atoms/Typography'

const LinkInput = styled(Input)`
    width: 30%;
    text-align: center;
`
const LinkingColumn = styled(FlexColumn)`
    max-width: 47%;
    min-height: 100%;

    @media(max-width: 500px) {
        width: 100%;
        max-width: unset;
        margin-bottom: 16px;
        min-height: unset;
    }
`

export function LinkingSection () {
    const dispatch = useDispatch()
    const link = useSelector(({ link }) => link)
    const [{ key }, setKey] = useState({ key: '' })
    const [error, setError] = useSafeState(false)
    const [linking, setLinking] = useSafeState(false)
    const inputs = useRef([createRef(), createRef(), createRef()])

    if (link?.key) return null
    const onInput = (inputNo = 0) => (e) => {
        const input = e.target.value.replace(/\D+/g, '')
        let start = ''
        if (inputNo > 0) {
            start = key.slice(0, inputNo * 5)
        }
        const end = key.slice(inputNo * 5 + Math.max(5, input.length))
        const center = `${input}     `.slice(0, Math.max(5, input.length))
        setKey({ key: `${start}${center}${end}`.slice(0, 15) })
        const focusTarget = Math.min(inputNo + Math.floor(input.length / 5), 2)
        if (focusTarget === inputNo + 1 && key.slice(focusTarget * 5, (focusTarget + 1) * 5).replace(/\D+/g, '').length) {
            inputs.current[focusTarget].current.select()
        }
        else if (focusTarget !== inputNo) {
            inputs.current[focusTarget].current.focus()
        }
    }

    const onConnect = () => {
        if (key.length !== 15) {
            return setError(true)
        }
        setError(false)
        setLinking(true)
        dispatch('connectToLink', key)
            .then(() => setKey({key: ''}))
            .catch(() => setError(true))
            .finally(() => setLinking(false))
    }
    const onGenerate = () => {
        setError(false)
        setLinking(true)
        dispatch('createNewLink')
            .finally(() => setLinking(false))
    }

    return (
        <div>
            <H6>Link to Account</H6>
            {error && (
                <Alert>
                    <span>Error while linking – please make sure you entered the correct number.</span>
                </Alert>
            )}
            {linking && <ProgressIndeterminate />}
            <FlexRow align="space-around" flip={500}>
                <LinkingColumn>
                    <FlexRow>
                        <SmallerText>Enter an existing link-number</SmallerText>
                    </FlexRow>
                    <FlexRow>
                        <LinkInput
                            ref={inputs.current[0]}
                            value={key.slice(0, 5).replace(/\s+/g, '')}
                            onInput={onInput(0)}
                        />
                        {'-'}
                        <LinkInput
                            ref={inputs.current[1]}
                            value={key.slice(5, 10).replace(/\s+/g, '')}
                            onInput={onInput(1)}
                        />
                        {'-'}
                        <LinkInput
                            ref={inputs.current[2]}
                            value={key.slice(10, 15).replace(/\s+/g, '')}
                            onInput={onInput(2)}
                        />
                    </FlexRow>
                    <Button style={{ marginTop: 8, width: '100%' }} onClick={onConnect}>Submit</Button>
                </LinkingColumn>
                <LinkingColumn>
                    <FlexRow>
                        <SmallerText>or generate a new link-number.</SmallerText>
                    </FlexRow>
                    <Button style={{ marginTop: 'auto', width: '100%' }} onClick={onGenerate}>Generate</Button>
                </LinkingColumn>
            </FlexRow>
        </div>
    )
}
