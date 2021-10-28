jest.mock('fs', () => {
    const createMock = () => {
        let promise = Promise.resolve()
        let resolve = () => null
        let reject = () => null
        const mockFunction = jest.fn(() => promise)
        mockFunction.getPromise = () => promise
        mockFunction.resetPromise = () => {
            promise = new Promise((res, rej) => {
                resolve = res
                reject = rej
            })
            return promise
        }
        mockFunction.resolvePromise = (val) => resolve(val)
        mockFunction.rejectPromise = (val) => reject(val)
    }

    return {
        promises: {
            writeFile: createMock(),
            copyFile: createMock()
        }
    }
})

describe('createWrite', () => {
    it('should write every 500 ms')
})
