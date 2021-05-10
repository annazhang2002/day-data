import { dataFields } from '../../static/data'
import _ from "lodash";

export const allFields = Object.keys(dataFields);
export const allOperators = ['==', '<', '<=', '>', '>=', '!=', 'array-contains'];
export const arrayFields = _.filter(Object.entries(dataFields), ([value]) => value.type === 'array').map(([key]) => key);

export const fieldSelectionOptions = Object.entries(dataFields).map(([key, value]) => {
    return {
        'key': key,
        'text': value.name.substring(0, value.name.length - 1),
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
