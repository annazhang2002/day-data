import React, { useState, useEffect } from "react";
import { dataRef } from '../../../firebase'
import { allFields, allOperators } from './../util'
import "./../datapage.scss";

export const AverageData = () => {
    const [queryData, setQueryData] = useState({
        field: allFields[0],
        operator: allOperators[0],
        value: ''
    })
    const [average, setAverage] = useState(0);

    // update input changes
    const handleChange = (event) => {
        const { id, value } = event.target;
        setQueryData({
            ...queryData,
            [id]: value,
        });
    };

    const getResults = (event) => {
        console.log(event)
        dataRef
            .where(queryData.field, queryData.operator, queryData.value)
            .onSnapshot(
                querySnapshot => {
                    var sum = 0;
                    querySnapshot.forEach((doc) => {
                        console.log("data")
                        console.log(doc.data())
                        console.log(sum)
                        const rating = doc.data().rating;
                        sum += rating;
                        console.log(rating)
                        console.log(sum)
                    });
                    setAverage(sum / querySnapshot.size)
                },
                error => {
                    console.log(error);
                }
            )
    }

    return (
        <div>
            <h1>How good will my day be if...</h1>
            <select id="field" onChange={handleChange}>
                {allFields.map((field) => <option value={field}>{field}</option>)}
            </select>
            <select id="operator" onChange={handleChange}>
                {allOperators.map((operator) => <option value={operator}>{operator}</option>)}
            </select>
            <input type="text" id="value" value={queryData.value} onChange={handleChange} />
            <button id="getResults" onClick={(e) => getResults(e)}>Calculate!</button>
            {average != 0 && <p>Rating: {average}</p>}
        </div>
    )
}
