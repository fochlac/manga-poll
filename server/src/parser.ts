declare global {
    interface Parser {
        type: string;
        fetchFunction: (source: Source) => Promise<Partial<Url>[]>;
        parseLink: (body: string, link: string) => Partial<Source>;
        parseCondition: (body: string, link: string) => boolean;
    }
}

const parserMap = {}
const linkParserList = []
let defaultLinkParser

export function registerParser ({ type, fetchFunction, parseLink, parseCondition }: Parser) {
    parserMap[type] = fetchFunction
    linkParserList.push({ parseLink, parseCondition })
    if (type === 'madaro') {
        defaultLinkParser = parseLink
    }
}

export function fetchChapterList (source: Source) {
    const fetchFunction = parserMap[source.type] || parserMap['madaro']
    return fetchFunction(source)
}

export function parseSourceLink (body, link) {
    const parser = linkParserList.find(({parseCondition}) => parseCondition(link, body))

    return parser && parser.parseLink(body, link)
}