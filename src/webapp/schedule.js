export const createSchedule = ({ isActive = false, interval = 0, callback = Function.prototype, updater } = {}) => {
    let nextPing = 0
    let lastPing = 0
    const callCallback = () => {
        if (nextPing && nextPing <= Date.now()) {
            callback()
            lastPing = nextPing
            nextPing = nextPing + interval > Date.now() ? nextPing + interval : Date.now() + interval
        }
        typeof updater === 'function' && updater(lastPing, nextPing)
    }

    if (isActive && interval) {
        nextPing = Date.now() - 1
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
            lastPing = Date.now()
            nextPing = Date.now() + interval
            timer = setInterval(callCallback, 100)
        },
        stop () {
            clearInterval(timer)
            nextPing = 0
            lastPing = 0
        }
    }
}
