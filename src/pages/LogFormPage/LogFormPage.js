import React, { useState } from "react";
import { dataRef, auth } from '../../firebase'
import { parsedValue } from '../../static/util';
import _ from "lodash";
import { Button, Form } from 'semantic-ui-react'
import { defaultDataState, dataFields } from '../../static/data'
import "./logformpage.scss";
import { FieldInput } from "../../components/FieldInput/FieldInput";

export const LogFormPage = () => {
    const [data, setData] = useState(defaultDataState);

    // add the logged data to firebase
    const addData = () => {
        var finalData = _.omit(data, ['newActivity', 'newExercise', 'newPerson', 'newFood', ''])
        finalData = { ...finalData, user: auth.currentUser.uid }
        console.log(finalData)
        dataRef
            .add(finalData)
            .then((_doc) => {
                setData(defaultDataState);
            })
            .catch((error) => {
                console.log("bad" + error)
            });
    }

    // update input log
    const handleChange = (event) => {
        const { id, value } = event.target;
        setData({
            ...data,
            [id]: parsedValue(id, value, data[id]),
        });
    };

    const addToDataArray = (event, input) => {
        const { id } = event.target;

        if (event.detail !== 0 && data[input] !== "") {
            setData({
                ...data,
                [id]: _.concat(data[id], [data[input]]),
                [input]: '',
            });
        }
    }

    const deleteFromArray = (value, key) => {
        setData({
            ...data,
            [key]: _.without(data[key], value)
        })
    }

    return (
        <Form>
            {Object.entries(dataFields).map(([key, value]) => {
                return <Form.Field inline key={key}>
                    <label>{value.name}</label>
                    <FieldInput
                        dataValue={value}
                        fieldKey={key}
                        dataFromKey={data[key]}
                        handleChange={handleChange}
                        onDeleteFromArray={(item) => deleteFromArray(item, key)}
                        newArrayValue={data[value.new]}
                        addToDataArray={addToDataArray} />
                </Form.Field>

            })}
            <Button primary onClick={addData}>Add Day</Button>
        </Form>
    )
}
