import _ from "lodash";

export const dataFields = {
    date: {
        type: 'date',
        name: 'Date: ',
        tableHeader: 'Date',
        editInTable: false,
    },
    rating: {
        type: 'number',
        name: 'How happy were you today?',
        min: 0,
        max: 10,
        tableHeader: 'Happiness',
        editInTable: true,
    },
    excitement: {
        type: 'number',
        name: 'How exciting was today?',
        min: 0,
        max: 10,
        tableHeader: 'Excitement',
        editInTable: true,
    },
    stress: {
        type: 'number',
        name: 'How stressed were you today?',
        min: 0,
        max: 10,
        tableHeader: 'Stress',
        editInTable: true,
    },
    activities: {
        type: 'array',
        name: 'Activities:',
        new: 'newActivity',
        add: 'Activity',
        tableHeader: 'Activities',
        editInTable: true,
    },
    hadBreakfast: {
        type: 'checkbox',
        name: 'Had Breakfast?',
        tableHeader: 'Breakfast',
        editInTable: true,
    },
    dressup: {
        type: 'checkbox',
        name: 'Did I Dress Up or Feel Cute?',
        tableHeader: 'Dressed Up',
        editInTable: true,
    },
    exercise: {
        type: 'array',
        name: 'Exercise:',
        new: 'newExercise',
        add: 'Exercise',
        tableHeader: 'Exercise',
        editInTable: true,
    },
    food: {
        type: 'array',
        name: 'Food:',
        new: 'newFood',
        add: 'Food',
        tableHeader: 'Food',
        editInTable: true,
    },
    journaled: {
        type: 'checkbox',
        name: 'Did I Journal?',
        tableHeader: 'Journaled',
        editInTable: true,
    },
    peopleSaw: {
        type: 'array',
        name: 'People I Saw:',
        new: 'newPerson',
        add: 'Person',
        tableHeader: 'People I Saw',
        editInTable: true,
    },
    readingTime: {
        type: 'number',
        name: 'Reading Time (in minutes):',
        min: 0,
        max: 3600,
        tableHeader: 'Reading Time',
        editInTable: true,
    },
    showered: {
        type: 'checkbox',
        name: 'Did I Shower?',
        tableHeader: 'Showered',
        editInTable: true,
    },
    skincare: {
        type: 'checkbox',
        name: 'Did I Do My Skincare Routine?',
        tableHeader: 'Skincare',
        editInTable: true,
    },
    weather: {
        type: 'text',
        name: 'Weather:',
        tableHeader: 'Weather',
        editInTable: true,
    },
}

export const defaultDataState = {
    activities: [],
    date: new Date(),
    dressup: false,
    exercise: [],
    food: [],
    hadBreakfast: false,
    journaled: false,
    newActivity: '',
    newExercise: '',
    newFood: '',
    newPerson: '',
    peopleSaw: [],
    showered: false,
    skincare: false,
    rating: 5,
    excitement: 5,
    stress: 5,
    readingTime: 0,
    weather: '',
}


export const colors = {
    'activities': 'pink',
    'food': 'yellow',
    'exercise': 'teal',
    'peopleSaw': 'violet',
}

export const getColor = (id) => {
    return colors[id]
}

export const parseIntVals = Object.keys(_.pickBy(dataFields, (field) => field.type === 'number'));
export const parseBooleanVals = Object.keys(_.pickBy(dataFields, (field) => field.type === 'checkbox'));