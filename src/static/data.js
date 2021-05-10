
export const dataFields = {
    food: {
        type: 'array',
        name: 'Food:',
        new: 'newFood',
        add: 'Food',
    },
    activities: {
        type: 'array',
        name: 'Activities:',
        new: 'newActivity',
        add: 'Activity',
    },
    exercise: {
        type: 'array',
        name: 'Exercise:',
        new: 'newExercise',
        add: 'Exercise',
    },
    hadBreakfast: {
        type: 'checkbox',
        name: 'Had Breakfast?',
    },
    journaled: {
        type: 'checkbox',
        name: 'Did I Journal?',
    },
    showered: {
        type: 'checkbox',
        name: 'Did I Shower?',
    },
    dressup: {
        type: 'checkbox',
        name: 'Did I Dress Up or Feel Cute?',
    },
    skincare: {
        type: 'checkbox',
        name: 'Did I Do My Skincare Routine?',
    },
    peopleSaw: {
        type: 'array',
        name: 'People I Saw:',
        new: 'newPerson',
        add: 'Person',
    },
    readingTime: {
        type: 'number',
        name: 'Reading Time (in minutes):',
        min: 0,
        max: 3600,
    },
    weather: {
        type: 'text',
        name: 'Weather:',
    },
    rating: {
        type: 'number',
        name: 'How would you rate today?',
        min: 0,
        max: 10
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
    readingTime: 0,
    weather: '',
}