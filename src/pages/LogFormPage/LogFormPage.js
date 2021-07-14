import React, { useState } from "react";
import { dataRef, auth } from '../../firebase'
import { parsedValue } from '../../static/util';
import _ from "lodash";
import { Button, Form, Modal } from 'semantic-ui-react'
import { defaultDataState, dataFields } from '../../static/data'
import "./logformpage.scss";
import { FieldInput } from "../../components/FieldInput/FieldInput";

export const LogFormPage = (props) => {
    const [data, setData] = useState(defaultDataState);
    const [showModal, setShowModal] = useState(false);

    // add the logged data to firebase
    const addData = () => {
        var finalData = _.omit(data, ['newActivity', 'newExercise', 'newPerson', 'newFood', ''])
        finalData = { ...finalData, user: auth.currentUser.uid }
        console.log(finalData)
        dataRef
            .add(finalData)
            .then((_doc) => {
                setData(defaultDataState);
                setShowModal(true);
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
            <Modal
                size='mini'
                open={showModal}
                onClose={() => setShowModal(false)}
            >
                <Modal.Content>Day Successfully Logged!</Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={() => props.changeTab(2)}>Ok</Button>
                </Modal.Actions>
            </Modal>
        </Form>
    )
}
