import React, { useState, useEffect } from "react";
import "./../datapage.scss";
import { dataRef } from '../../../firebase'
import { allFields } from './../util'

const arrays = ['activities'];

export const CompareData = () => {
    const [field, setField] = useState(allFields[0]);
    const [ratingArr, setRatingArr] = useState([]);

    const getResults = (event) => {
        console.log(event)
        dataRef
            .onSnapshot(
                querySnapshot => {
                    var ratings = {};
                    querySnapshot.forEach((doc) => {
                        if (!arrays.includes(field)) {
                            const value = doc.data()[field];
                            const rating = doc.data().rating;
                            if (Object.keys(ratings).includes(value)) {
                                ratings[value].sum += rating;
                                ratings[value].count++;
                            } else {
                                ratings[value] = {
                                    sum: rating,
                                    count: 1
                                }
                            }
                        } else {
                            const values = doc.data()[field];
                            const rating = doc.data().rating;
                            console.log(values)
                            values.forEach(value => {
                                if (Object.keys(ratings).includes(value)) {
                                    ratings[value].sum += rating;
                                    ratings[value].count++;
                                } else {
                                    ratings[value] = {
                                        sum: rating,
                                        count: 1
                                    }
                                }
                            })
                        }

                    });
                    var ratingArray = [];
                    Object.entries(ratings).forEach((rating) => {
                        const [key, value] = rating
                        rating = {
                            value: key,
                            average: value.sum / value.count
                        }
                        ratingArray.push(rating)
                    })
                    setRatingArr(ratingArray)
                },
                error => {
                    console.log(error);
                }
            )
    }

    return (
        <div>
            <h1>Which _ will make the best day?</h1>
            <select id="field" onChange={event => setField(event.target.value)}>
                {allFields.map((option) => <option value={option}>{option}</option>)}
            </select>
            <button id="getResults" onClick={(e) => getResults(e)}>Calculate!</button>
            {ratingArr.map((rating) => (<p>{rating.value}: {rating.average}</p>)
            )}
        </div>
    )
}
