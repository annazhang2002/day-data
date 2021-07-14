import React, { useState } from "react";
import "./../datapage.scss";
import { dataRef, auth } from '../../../firebase'
import { allFields, arrayFields, fieldSelectionOptions, allRatingFields } from './../util'
import { Dropdown, Button, Grid } from 'semantic-ui-react'
import _ from "lodash";

export const CompareData = () => {
    const [field, setField] = useState(allFields[0]);
    const [ratingField, setRatingField] = useState(allRatingFields[0].value);
    const [ratingArr, setRatingArr] = useState([]);
    console.log(allRatingFields)
    console.log(ratingField)

    const getResults = (event) => {
        dataRef
            .where('user', '==', auth.currentUser.uid)
            .onSnapshot(
                querySnapshot => {
                    var ratings = {};
                    querySnapshot.forEach((doc) => {
                        const values = doc.data()[field];
                        const rating = doc.data()[ratingField];
                        if (!arrayFields.includes(field)) {
                            if (Object.keys(ratings).includes(values)) {
                                ratings[values].sum += rating;
                                ratings[values].count++;
                            } else {
                                ratings[values] = {
                                    sum: rating,
                                    count: 1
                                }
                            }
                        } else {
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
                    ratingArray = _.reverse(_.sortBy(ratingArray, 'average'))
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
            <Grid stackable columns={3}>
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
                        <Dropdown
                            placeholder='Rating Field'
                            fluid
                            selection
                            options={allRatingFields}
                            id="ratingField"
                            onChange={(event, { value }) => setRatingField(value)} />
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
