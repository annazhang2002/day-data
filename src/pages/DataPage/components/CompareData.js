import React, { useState } from "react";
import "./../datapage.scss";
import { dataRef, auth } from '../../../firebase'
import { allFields, arrayFields, fieldSelectionOptions } from './../util'
import { Dropdown, Button, Grid } from 'semantic-ui-react'

export const CompareData = () => {
    const [field, setField] = useState(allFields[0]);
    const [ratingArr, setRatingArr] = useState([]);

    const getResults = (event) => {
        dataRef
            .where('user', '==', auth.currentUser.uid)
            .onSnapshot(
                querySnapshot => {
                    var ratings = {};
                    querySnapshot.forEach((doc) => {
                        if (!arrayFields.includes(field)) {
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
            <Grid stackable columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Dropdown
                            placeholder='Field'
                            fluid
                            selection
                            options={fieldSelectionOptions}
                            id="field"
                            onChange={(event, { value }) => setField(value)} />
                    </Grid.Column>
                    <Grid.Column>
                        <Button id="getResults" onClick={(e) => getResults(e)}>Calculate!</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {ratingArr.map((rating) => (<h3>{rating.value}: {rating.average}</h3>)
            )}
        </div>
    )
}
