import { BOOKMARKS, URL_LIST } from '../../constants/routes'
import { useSelector } from '../../utils/atom'
import { MangaFeed } from '../views/MangaFeed'
import { MangaList } from '../views/MangaList'

export function Router () {
    const route = useSelector((state) => state.route)
    switch (route?.key) {
    case URL_LIST:
        return <MangaFeed />
    case BOOKMARKS:
        return <MangaList />
    default:
        return <MangaFeed />
    }
}
