import styled from 'styled-components'
import { useSelector } from '../../utils/atom'
import { H5 } from './Typography'

const CoverSheet = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--brand);
    display: flex;
    color: var(--brand-contrast);
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const CoverImage = styled.img`
    border-radius: 14px;
    background-color: var(--brand);
    margin-bottom: 16px;
    width: 144px;
    height: 144px;
    margin-top: -80px;
`

export const Cover = ({children}) => {
    const isLoading = useSelector((state) => state.isLoading)
    if (!isLoading) return children

    return <CoverSheet>
        <CoverImage src="/android-chrome-144x144.png" />
        <H5>Manga-Scout</H5>
    </CoverSheet>
}
