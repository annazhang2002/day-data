export const sameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
}

const colors = {
    'activities': 'pink',
    'food': 'yellow',
    'exercise': 'teal',
    'peopleSaw': 'violet',
}

export const getColor = (id) => {
    return colors[id]
}

const parseIntVals = ['rating'];
const parseBooleanVals = ['hadBreakfast', 'journaled'];

export const parsedValue = (id, val, oldVal) => {
    if (parseIntVals.includes(id)) {
        return parseInt(val)
    } else if (parseBooleanVals.includes(id)) {
        return !oldVal
    } else if (id === 'date') {
        return new Date(val);
    } else {
        return val;
    }
}