import styled from 'styled-components'
import { DefaultText } from './Typography'

export const Card = styled.div`
    box-shadow: 0px 3px 2px -1px rgb(0 0 0 / 20%), 0px 1px 2px 1px rgb(0 0 0 / 14%), 0px 1px 4px 1px rgb(0 0 0 / 12%);
    background: var(--background-off);
    width: calc(100% - 16px);
    margin: 4px 8px 12px;
    cursor: ${({ onClick }) => (typeof onClick === 'function' ? 'pointer' : 'default')};
`
export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-right: 16px;
    padding-left: 16px;
    max-width: 100;
    overflow: hidden;
`
export const CardActionIcon = styled.div`
    margin-left: 4px;
    display: inline-flex;
    justify-content: center;
    flex-shrink: 0;
    align-items: center;
    position: relative;
    user-select: none;
    margin-bottom: -1px;
    margin-top: -1px;
    cursor: default;

    &[data-title]:hover:before {
        content: attr(data-title);
        font-size: 10px;
        overflow: hidden;
        font-weight: 700;
        position: absolute;
        z-index: 1000;
        right: 50%;
        transform: translateX(50%);
        top: calc(100% + 12px);
        background: var(--background);
        color: #062832;
        border: #062832 solid 1px;
        text-align: center;
        padding: 2px;
        min-width: 70px;
    }
    &[data-title]:hover:after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        right: 50%;
        transform: translateX(50%);
        top: calc(100% + 8px);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 6px solid #062832;
    }
`

export const CardTextShort = styled(DefaultText)`
    max-height: 81px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 16px;
    text-align: justify;
`
