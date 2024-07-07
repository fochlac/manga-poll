/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'preact/hooks'
import styled from 'styled-components'
import { FlexRow } from './Layout'
import { SmallerText } from './Typography'

const Slider = styled.span`
    cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
    display: block;
    width: 28px;
    height: 16px;
    background-color: ${({ checked, disabled }) => (checked && !disabled ? '#6495ed' : '#c3cbd2')};
    transition: 0.2s;
    position: relative;
    border-radius: 17px;
    flex-shrink: 0;

    &:before {
        border-radius: 50%;
        position: absolute;
        content: '';
        height: 12px;
        width: 12px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: 0.2s;
        transition: 0.2s;
        transform: ${({ checked }) => checked && 'translateX(12px)'};
    }
`

export function ToggleSwitch ({ label, initialChecked = false, onChange, disabled = false, checked }) {
    const [localChecked, setChecked] = useState(initialChecked)

    const usedChecked = checked !== undefined ? checked : localChecked
    const onClick = () => {
        if (!disabled) {
            if (checked !== undefined) {
                onChange(!usedChecked)
            }
            else {
                setChecked((checked) => {
                    onChange(!checked)
                    return !checked
                })
            }
        }
    }

    return (
        <FlexRow onClick={onClick}>
            <SmallerText>{label}</SmallerText>
            <Slider checked={usedChecked} disabled={disabled} />
        </FlexRow>
    )
}

ToggleSwitch.defaultProps = {
    defaultChecked: false,
    disabled: false
}
