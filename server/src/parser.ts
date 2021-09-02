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
    const fetchFunction = parserMap[source.type] || parserMap[defaultType]
    return fetchFunction(source)
}

export function parseSourceLink (link) {
    const parser = linkParserList.find(({parseCondition}) => parseCondition(link))

    if (!parser) {
        console.log(`Could not find parser for url "${link}".`)
    }

    return parser && parser.parseLink(link)
}

export function checkSourceType (type) {
    return !!parserMap[type]
}