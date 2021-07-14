import { dataFields } from '../../static/data'
import _ from "lodash";

export const allFields = Object.keys(dataFields);
export const allOperators = ['==', '<', '<=', '>', '>=', '!=', 'array-contains'];
export const arrayFields = _.filter(Object.entries(dataFields), ([key, value]) => value.type === 'array').map(([key]) => key);
export const allRatingFields = _.filter(Object.entries(dataFields), ([key, value]) => value.ratingField).map(([key, value]) => {
    return {
        'key': key,
        'text': value.tableHeader,
        'value': key,
        'id': 'field',
    }
})

export const fieldSelectionOptions = Object.entries(dataFields).map(([key, value]) => {
    return {
        'key': key,
        'text': value.tableHeader,
        'value': key,
        'id': 'field',
    }
});

export const operatorSelectionOptions = allOperators.map((operator) => {
    return {
        'key': operator,
        'text': operator,
        'value': operator,
        'id': 'operator',
    }
})
