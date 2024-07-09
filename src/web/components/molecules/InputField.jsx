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
    margin-right: 16px;
    position: relative;
    flex-shrink: 1
`
const ClearButton = styled.span`
position:absolute;
right: 5px;
bottom: 4px;
cursor: pointer;
`
const Select = styled.select`
    width: 100%;
    margin-top: 6px;
`

const FieldGroup = ({ label, style, children }) => {
    return (
        <InputWrapper style={style}>
            <Label style={{margin: '0 0 -1px 2px'}}>{label}</Label>
            {children}
        </InputWrapper>
    )
}

const InputField = ({ value, onChange, placeholder, label }) => {
    return (
        <FieldGroup label={label}>
            <Input value={value} onInput={(e) => onChange(e.target.value)} placeholder={placeholder} />
            {!!value?.length && <ClearButton onClick={() => onChange('')}>x</ClearButton>}
        </FieldGroup>
    )
}
const SelectField = ({ value, onChange, label, options }) => {
    return (
        <FieldGroup label={label} style={{width: 200}}>
            <Select onChange={(e) => onChange(e.target.value)}>
                {options.map((option) => (
                    <option key={option.value} value={option.value} selected={value === option.value}>{option.label}</option>
                ))}
            </Select>
        </FieldGroup>
    )
}

export {
    SelectField,
    InputField,
    FieldGroup
}
