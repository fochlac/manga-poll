import { pad } from '../../common/utils'

const minInMs = 60 * 1000
const hourInMs = 60 * minInMs
const dayInMs = 24 * hourInMs

export function formatTime (timestamp) {
    const date = new Date(Number(timestamp))
    const diff = new Date().setHours(24, 0, 0, 0) - timestamp

    if (diff < dayInMs) {
        return `${date.getHours()}:${pad(date.getMinutes())}`
    }

    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}`
}

