import { pad } from '../../common/utils'

const minInMs = 60 * 1000
const hourInMs = 60 * minInMs
const dayInMs = 24 * hourInMs
const weekInMs = 7 * dayInMs

export function formatTime (timestamp) {
    const diff = Date.now() - timestamp
    if (diff < hourInMs) {
        return `${Math.round(diff / minInMs)} min ago`
    }
    else if (diff < dayInMs) {
        const hours = Math.round(diff / hourInMs)
        if (hours === 1) {
            return '1 hour ago'
        }
        return `${hours} hours ago`
    }
    else if (diff < weekInMs) {
        const days = Math.round(diff / dayInMs)
        if (days === 1) {
            return '1 day ago'
        }
        return `${days} days ago`
    }

    const date = new Date(Number(timestamp))
    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${String(date.getFullYear()).slice(-2)}`
}
