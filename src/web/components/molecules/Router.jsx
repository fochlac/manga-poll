import { Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { BOOKMARKS, IMPRESSUM, SETTINGS, URL_LIST } from '../../constants/routes'
import { useSelector } from '../../utils/atom'
import { Impressum } from '../views/Impressum'
import { MangaFeed } from '../views/MangaFeed'
import { MangaList } from '../views/MangaList'
import { SettingsView } from '../views/Settings'

export const OVERLAY_HIDE_TIMEOUT = 0.2

export function useOverlayDelay (fn, dependencies) {
    useEffect(() => {
        setTimeout(() => fn(), OVERLAY_HIDE_TIMEOUT)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)
}

export function Router ({ isExtension }) {
    const route = useSelector((state) => state.route)
    const [hideOverlay, setHideOverlay] = useState(false)
    const [visibleOverlay, setVisibleOverlay] = useState(route?.overlay)
    const overlayId = route?.overlay
    useEffect(() => {
        if (overlayId !== visibleOverlay) {
            if (visibleOverlay) {
                setHideOverlay(true)
                setTimeout(() => {
                    setHideOverlay(false)
                    setVisibleOverlay(overlayId)
                }, OVERLAY_HIDE_TIMEOUT * 1000)
            }
            else {
                setVisibleOverlay(overlayId)
            }
        }
    }, [setHideOverlay, overlayId, setVisibleOverlay, visibleOverlay])

    let view
    switch (route?.key) {
    case URL_LIST:
        view = <MangaFeed />
        break
    case BOOKMARKS:
        view = <MangaList small={isExtension} />
        break
    default:
        view = <MangaFeed />
        break
    }
    let overlay
    switch (visibleOverlay) {
    case SETTINGS:
        overlay = <SettingsView isExtension={isExtension} hideOverlay={hideOverlay} />
        break
    case IMPRESSUM:
        overlay = <Impressum hideOverlay={hideOverlay} />
        break
    default:
        overlay = null
        break
    }
    return (
        <Fragment>
            {overlay}
            {view}
        </Fragment>
    )
}
