import React, { useState } from "react";
import { dataRef, auth } from '../../../firebase'
import { allFields, allOperators, fieldSelectionOptions, operatorSelectionOptions } from './../util'
import "./../datapage.scss";
import { Dropdown, Input, Button, Grid } from 'semantic-ui-react'

export const AverageData = () => {

    const [queryData, setQueryData] = useState({
        field: allFields[0],
        operator: allOperators[0],
        value: ''
    })
    const [average, setAverage] = useState({
        happiness: 0,
        excitement: 0,
        stress: 0,
    });

    // update input changes
    const handleChange = (event, value, id) => {
        setQueryData({
            ...queryData,
            [id]: value,
        });
    };

    const getResults = (event) => {
        dataRef
            .where('user', '==', auth.currentUser.uid)
            .where(queryData.field, queryData.operator, queryData.value)
            .onSnapshot(
                querySnapshot => {
                    var happiness = 0;
                    var excitement = 0;
                    var stress = 0;
                    querySnapshot.forEach((doc) => {
                        happiness += doc.data().rating;
                        excitement += doc.data().excitement;
                        stress += doc.data().stress;
                    });
                    setAverage({
                        happiness: happiness / querySnapshot.size,
                        excitement: excitement / querySnapshot.size,
                        stress: stress / querySnapshot.size,
                    })
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
            {average.happiness !== 0 && <h3>Happiness: {average.happiness}</h3>}
            {average.excitement !== 0 && <h3>Excitement: {average.excitement}</h3>}
            {average.stress !== 0 && <h3>Stress: {average.stress}</h3>}
        </div>
    )
}
