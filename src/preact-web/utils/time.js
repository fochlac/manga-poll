import { pad } from '../../common/utils'

const minInMs = 60 * 1000
const hourInMs = 60 * minInMs
const dayInMs = 24 * hourInMs

export function formatTime (timestamp) {
    const diff = Date.now() - timestamp

    if (diff < dayInMs) {
        return ''
    }

    const date = new Date(Number(timestamp))
    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}`
}

