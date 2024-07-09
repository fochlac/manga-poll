import styled from 'styled-components'
import { useSelector } from '../../utils/atom'
import { H5 } from './Typography'
import { useEffect, useState } from 'preact/hooks'
import { Fragment } from 'preact'

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
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => setShow(true), 300)
            return () => clearTimeout(timer)
        }

        setShow(false)
    }, [isLoading])
    if (!isLoading) return children

    return <CoverSheet>
        {show && (
            <Fragment>
                <CoverImage src="/icons/manga-163-half.png" />
                <H5>Manga-Scout</H5>
            </Fragment>
        )}
    </CoverSheet>
}
