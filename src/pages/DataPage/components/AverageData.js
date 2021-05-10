import React, { useState, useEffect } from "react";
import { dataRef, auth, userDoc } from '../../../firebase'
import { allFields, allOperators, fieldSelectionOptions, operatorSelectionOptions } from './../util'
import "./../datapage.scss";
import { Dropdown, Input, Button, Grid } from 'semantic-ui-react'

export const AverageData = () => {

    const [queryData, setQueryData] = useState({
        field: allFields[0],
        operator: allOperators[0],
        value: ''
    })
    const [average, setAverage] = useState(0);

    // update input changes
    const handleChange = (event, value, id) => {
        console.log(event)
        console.log(value)
        console.log(id)
        setQueryData({
            ...queryData,
            [id]: value,
        });
    };

    const getResults = (event) => {
        console.log(event)
        dataRef
            .where('user', '==', auth.currentUser.uid)
            .where(queryData.field, queryData.operator, queryData.value)
            .onSnapshot(
                querySnapshot => {
                    var sum = 0;
                    console.log(querySnapshot)
                    querySnapshot.forEach((doc) => {
                        const rating = doc.data().rating;
                        sum += rating;
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
            <Grid stackable columns={4}>
                <Grid.Row>
                    <Grid.Column>
                        <Dropdown
                            placeholder='Field'
                            fluid
                            selection
                            options={fieldSelectionOptions}
                            id="field"
                            onChange={(event, { value }) => handleChange(event, value, 'field')} />
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown
                            placeholder='Operator'
                            fluid
                            selection
                            options={operatorSelectionOptions}
                            id="operator"
                            onChange={(event, { value }) => handleChange(event, value, 'operator')} />
                    </Grid.Column>
                    <Grid.Column>
                        <Input placeholder="Value" fluid type="text" id="value" value={queryData.value} onChange={(event, { value }) => handleChange(event, value, 'value')} />
                    </Grid.Column>
                    <Grid.Column>
                        <Button id="getResults" onClick={(e) => getResults(e)}>Calculate!</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {average != 0 && <h3>Rating: {average}</h3>}
        </div>
    )
}
