import { Fragment } from 'preact'
import styled from 'styled-components'
import { fetchOnce } from '../../utils/api-helper'
import { useDispatch, useSelector } from '../../utils/atom'
import { Link } from '../atoms/Link'
import { H6, SmallerText } from '../atoms/Typography'

const executeOnce = fetchOnce((fn) => fn())

const LinkList = styled.div`
    display: flex;
    flex-wrap: wrap;
    text-align: justify;
    margin-left: 4px;
    margin-top: 8px;
    font-size: 0.95rem;
`

export function SupportedHosts () {
    const dispatch = useDispatch()
    const hosts = useSelector((state) => state.hosts)
    executeOnce(() => dispatch('fetchHosts'))

    return (
        <Fragment>
            <H6>Supported Pages</H6>
            <LinkList>
                {hosts?.stable.map((host) => (
                    <Link key={host.name} newTab href={host.url} style={{marginRight: 4}}>
                        {host.name}
                    </Link>
                ))}
            </LinkList>
            {!!hosts?.unstable.length &&
                <SmallerText>These Pages had some problems recently – they might or might not work:</SmallerText>
            }
            <LinkList>
                {hosts?.unstable.map((host) => (
                    <Link key={host.name} newTab href={host.url} style={{marginRight: 4}}>
                        {host.name}
                    </Link>
                ))}
            </LinkList>
            <SmallerText>
                <span>Many other pages can work as well, if they use the </span>
                <Link href="https://themeforest.net/item/madara-wordpress-theme-for-manga/20849828" newTab>
                    Madara-
                </Link>
                <span> or </span>
                <Link href="https://themesia.com/mangastream-wordpress-theme/" newTab>
                    MangaStream-Theme
                </Link>
                <span> or are built using the </span>
                <Link href="https://genkan.io/groups" newTab>
                    Genkan Reader
                </Link>
                <span>.</span>
            </SmallerText>
        </Fragment>
    )
}
