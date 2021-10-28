import { BOOKMARKS, URL_LIST } from '../../constants/routes'
import { useSelector } from '../../utils/atom'
import { SourceList } from '../views/Bookmarks'
import { ChapterList } from '../views/ChapterListNew'

export function Router () {
    const route = useSelector((state) => state.route)
    switch (route?.key) {
    case URL_LIST:
        return <ChapterList />
    case BOOKMARKS:
        return <SourceList />
    default:
        return <ChapterList />
    }
}
