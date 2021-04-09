export const sameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
}

const parseIntVals = ['rating'];
const parseBooleanVals = ['hadBreakfast', 'journaled'];

export const parsedValue = (id, val) => {
    if (parseIntVals.includes(id)) {
        return parseInt(val)
    } else if (parseBooleanVals.includes(id)) {
        return 'true' === val
    } else {
        return val;
    }
}