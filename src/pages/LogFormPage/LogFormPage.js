import React, { useState } from "react";
import { dataRef, userDoc, auth } from '../../firebase'
import { parsedValue, getColor } from './util';
import _ from "lodash";
import { Input, Button, Checkbox, Form, Label, Icon } from 'semantic-ui-react'
import { defaultDataState, dataFields } from '../../static/data'
import "./logformpage.scss";

export const LogFormPage = () => {
    const [data, setData] = useState(defaultDataState);

    // add the logged data to firebase
    const addData = () => {
        // console.log(_.omit(data, ['newActivity', 'newExercise', 'newPerson', 'newFood', '']))
        const removeNews = _.omit(data, ['newActivity', 'newExercise', 'newPerson', 'newFood', ''])
        const addUser = { ...removeNews, user: auth.currentUser.uid }
        console.log(addUser)
        dataRef
            .add(addUser)
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
            <Form.Field inline>
                <label>Date</label>
                <Input type="date" id="date" value={data.date.toISOString().split('T')[0]} onChange={handleChange} />
            </Form.Field>
            {Object.entries(dataFields).map(([key, value]) => {
                if (value.type === 'array') {
                    return (
                        <div style={{ marginBottom: '20px' }} key={key}>
                            <Form.Group style={{ flexDirection: 'column' }}>
                                <Form.Field inline>
                                    <label>{value.name}</label>
                                    <Input type="text" id={value.new} value={data[value.new] || ""} onChange={handleChange} onClick={(e) => addToDataArray(e, value.new)} label={<Button id={key} onClick={(e) => addToDataArray(e, value.new)}>Add {value.add}</Button>} labelPosition='right' />
                                </Form.Field>
                                <div style={{ flexDirection: 'row' }}>
                                    {data[key].map((item, index) =>
                                        <Label key={index} color={getColor(key)} style={{ paddingTop: '.78571429em', paddingBottom: '.78571429em', marginTop: '5px' }}>
                                            {item}
                                            <Icon name='delete' onClick={() => deleteFromArray(item, key)} />
                                        </Label>)}
                                </div>
                            </Form.Group>
                        </div>
                    );
                } else if (value.type === 'number') {
                    return (<Form.Field inline key={key}>
                        <label>{value.name}</label>
                        <Input type={value.type} min={value.min} max={value.max} id={key} value={data[key]} onChange={handleChange} />
                    </Form.Field>)
                } else if (value.type === 'checkbox') {
                    return (<Form.Field inline key={key}>
                        <label>{value.name}</label>
                        <Checkbox type={value.type} id={key} checked={data[key]} onChange={handleChange} />
                    </Form.Field>)
                } else {
                    return (<Form.Field inline key={key}>
                        <label>{value.name}</label>
                        <Input placeholder={value.name} type={value.type} id={key} value={data[key]} onChange={handleChange} />
                    </Form.Field>)
                }
            })}
            <Button primary onClick={addData}>Add Day</Button>
        </Form>
    )
}
