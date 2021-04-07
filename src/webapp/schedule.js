export const createSchedule = ({ isActive = false, interval = 0, callback = Function.prototype } = {}) => {
    let nextPing = 0
    const callCallback = () => {
        if (nextPing && nextPing <= Date.now()) {
            callback()
            nextPing = nextPing + interval > Date.now() ? nextPing + interval : Date.now() + interval
        }
    }

    if (isActive && interval) {
        nextPing = 1
        callCallback()
    }

    let timer = setInterval(callCallback, 100)

    return {
        setInterval (newInterval) {
            if (typeof newInterval !== 'number') {
                throw new Error('use a number')
            }
            nextPing = nextPing - interval + newInterval
            interval = newInterval
            callCallback()
        },
        setCallback (cb) {
            callback = cb
        },
        start () {
            callback()
            nextPing = Date.now() + interval
            timer = setInterval(callCallback, 100)
        },
        stop () {
            clearInterval(timer)
            nextPing = 0
        }
    }
}
