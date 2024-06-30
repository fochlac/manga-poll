import styled from 'styled-components'

import { Input } from '../atoms/Input'
import { Label } from '../atoms/Typography'

const InputWrapper = styled.div`
display:flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
width: 300px;
max-width: 100%;
margin-top: 8px;
margin-bottom: -6px;
position: relative;
`
const ClearButton = styled.span`
position:absolute;
right: 5px;
bottom: 4px;
cursor: pointer;
`

const InputField = ({ value, onChange, placeholder, label }) => {
    return (
        <InputWrapper>
            <Label style={{margin: '0 0 -2px 2px'}}>{label}</Label>
            <Input value={value} onInput={(e) => onChange(e.target.value)} placeholder={placeholder} />
            {!!value?.length && <ClearButton onClick={() => onChange('')}>x</ClearButton>}
        </InputWrapper>
    )
}

export {
    InputField
}
