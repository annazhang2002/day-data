import { colors, parseIntVals, parseBooleanVals } from './data'

export const sameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
}

export const getColor = (id) => {
    return colors[id]
}

export const parsedValue = (id, val, oldVal) => {
    if (parseIntVals.includes(id)) {
        return parseInt(val)
    } else if (parseBooleanVals.includes(id)) {
        return !oldVal
    } else if (id === 'date') {
        return new Date(val + " ");
    } else {
        return val;
    }
}