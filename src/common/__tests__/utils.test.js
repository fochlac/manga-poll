import { decodeHTMLEntities, executeOnce, extractMostFrequentValue, getHost, pad, randomId } from '../utils'

describe('utils', () => {
    describe('extractMostFrequentValue', () => {
        it('should extract the most frequent value', () => {
            expect(extractMostFrequentValue(['asd', 'asd', 'dsa', '', null, undefined])).toEqual('asd')
            expect(extractMostFrequentValue(['asd', 'dsa', 'dsa', '', null, undefined])).toEqual('dsa')
        })
    })

    describe('pad', () => {
        it('should extract the most frequent value', () => {
            expect(pad(2, 5)).toEqual('00002')
            expect(pad(22)).toEqual('22')
            expect(pad(222)).toEqual('222')
            expect(pad(2)).toEqual('02')
            expect(pad(2, 0)).toEqual('2')
        })
    })

    describe('getHost', () => {
        it('should extract the most frequent value', () => {
            expect(getHost('https://reaperscans.com/series/my-oppa-is-too-innocent/chapter-20/')).toEqual('reaperscans.com')
            expect(getHost('https://www.gruppenhaus.de/ferienhaus')).toEqual('gruppenhaus.de')
        })
    })

    describe('decodeHTMLEntities', () => {
        it('should extract the most frequent value', () => {
            expect(decodeHTMLEntities('<a>test&nbsp;test</a>')).toMatch(/test\stest/)
            expect(decodeHTMLEntities('hallo <a>test&nbsp;&ndash;test</a> <script>alert("test")</script')).toMatch(/hallo\stest\s–test /)
        })
    })

    describe('randomId', () => {
        it('return different values', () => {
            for (let i = 0; i < 1000; i++) {
                expect(randomId()).not.toEqual(randomId())
            }

            expect(randomId(5)).toHaveLength(5)
            expect(randomId(15)).toHaveLength(15)
            expect(randomId(55)).toHaveLength(55)
        })
    })

    describe('executeOnce', () => {
        it('should only execute the callback once regardless how often called', () => {
            const spy1 = jest.fn()
            const spy2 = jest.fn()
            const wrapped1 = executeOnce(spy1)
            const wrapped2 = executeOnce(spy2)

            wrapped1()
            expect(spy1).toHaveBeenCalledTimes(1)
            expect(spy2).toHaveBeenCalledTimes(0)

            wrapped2()
            expect(spy1).toHaveBeenCalledTimes(1)
            expect(spy2).toHaveBeenCalledTimes(1)

            wrapped2()
            wrapped1()
            wrapped2()
            wrapped1()
            expect(spy1).toHaveBeenCalledTimes(1)
            expect(spy2).toHaveBeenCalledTimes(1)
        })
    })
})
