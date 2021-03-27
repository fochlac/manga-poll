import saveAs from 'save-as'
import { parse } from './utils'

export function addImportHandlers (db) {
    const importElem = document.getElementById('import')
    const exportElem = document.getElementById('export')

    importElem.addEventListener('change', (e) => {
        const file = e.target.files[0]
        const fr = new FileReader()
        fr.addEventListener('load', () => {
            const sources = parse(fr.result, [])
            const clean = sources.filter((source) => source?.title && source.url && source.mangaId)
            if (clean.length) {
                db.sources.import(clean)
            }
            importElem.files = null
        })
        fr.readAsText(file)
    })

    exportElem.addEventListener('click', () => {
        db.sources.read()
            .then((sources) => {
                const blob = new Blob([JSON.stringify(sources)], { type: 'application/json' })
                saveAs(blob, 'mangapoll.json')
            })
    })
}

