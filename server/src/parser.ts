declare global {
    interface Parser {
        type: string;
        fetchFunction: (source: Source) => Promise<Partial<Url>[]>;
        parseLink: (body: string) => Promise<Partial<Source>>;
        parseCondition: (body: string) => boolean;
    }
}

const defaultType = 'madara'
const parserMap = {}
const linkParserList = []
let defaultLinkParser

export function registerParser ({ type, fetchFunction, parseLink, parseCondition }: Parser) {
    parserMap[type] = fetchFunction
    linkParserList.push({ parseLink, parseCondition })
    if (type === defaultType) {
        defaultLinkParser = parseLink
    }
}

export function fetchChapterList (source: Source) {
    const type = source.type || defaultType
    const fetchFunction = parserMap[source.type]
    if (!fetchFunction) {
        throw Error(`No fetch function for parser type ${type}.`)
    }
    return fetchFunction(source)
}

export function parseSourceLink (link) {
    const parser = linkParserList.find(({parseCondition}) => parseCondition(link))

    if (!parser) {
        console.log(`Could not find parser for url "${link}", using default parser.`)
    }

    return parser ? parser.parseLink(link) : defaultLinkParser(link)
}

export function checkSourceType (type) {
    return !!parserMap[type]
}