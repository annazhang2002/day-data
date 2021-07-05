import React from "react";
import { Input, Button, Checkbox } from 'semantic-ui-react'
import { ListTags } from '../ListTags/ListTags'

export const FieldInput = (props) => {
    const { dataValue, onDeleteFromArray, dataFromKey, fieldKey, handleChange, newArrayValue, addToDataArray, onArrayInputChanged } = props;

    if (dataValue.type === 'array') {
        return (
            <div>
                <Input
                    type="text"
                    id={dataValue.new}
                    value={newArrayValue || ""}
                    onChange={onArrayInputChanged || handleChange}
                    label={<Button id={fieldKey} onClick={(e) => addToDataArray(e, dataValue.new)}>Add {dataValue.add}</Button>}
                    labelPosition='right' />
                <ListTags data={dataFromKey} onDelete={onDeleteFromArray} fieldKey={fieldKey} />
            </div>
        );
    } else if (dataValue.type === 'number') {
        return <Input type={dataValue.type} min={dataValue.min} max={dataValue.max} id={fieldKey} value={dataFromKey} onChange={handleChange} />
    } else if (dataValue.type === 'checkbox') {
        return <Checkbox type={dataValue.type} id={fieldKey} checked={dataFromKey} onChange={handleChange} />
    } else if (dataValue.type === 'date') {
        return <Input type={dataValue.type} id={fieldKey} value={dataFromKey.toISOString().split('T')[0]} onChange={handleChange} />
    } else {
        return <Input placeholder={dataValue.name} type={dataValue.type} id={fieldKey} value={dataFromKey} onChange={handleChange} />
    }
}
