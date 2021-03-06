import React, { useState, useEffect } from "react";
import { dataRef, auth } from '../../firebase'
import _ from "lodash";
import { Button, Checkbox, Icon, Confirm } from 'semantic-ui-react'
import "./tablepage.scss";
import { dataFields } from '../../static/data'
import { parsedValue } from '../../static/util';
import { ListTags } from '../../components/ListTags/ListTags'
import { FieldInput } from "../../components/FieldInput/FieldInput";

export const TablePage = () => {
    const [tableValues, setTableValues] = useState([]);
    const [editField, setEditField] = useState({
        rowIndex: 0,
        fieldName: "rating",
        fieldValue: 5,
        inUse: false,
    })
    const [loading, setLoading] = useState(true);
    const [newListItem, setNewListItem] = useState();
    const [showModal, setShowModal] = useState(false);
    const [rowToDelete, setRowToDelete] = useState();

    useEffect(() => {
        console.log("use effect to get table data")
        dataRef
            .where('user', '==', auth.currentUser.uid)
            .orderBy('date', 'desc')
            .onSnapshot(
                querySnapshot => {
                    var queryTableValues = {};
                    querySnapshot.forEach((doc) => {
                        const row = doc.data();
                        var newRowValues = {};
                        Object.entries(dataFields).map(([key, value]) => {
                            const fieldValue = row[key];
                            newRowValues[key] = {
                                header: value.tableHeader,
                                cellValue: fieldValue instanceof Object && fieldValue.seconds ? new Date(fieldValue.seconds * 1000) : fieldValue,
                                show: true,
                                type: value.type,
                            }
                        })
                        queryTableValues[doc.id] = newRowValues;
                    });
                    setTableValues(queryTableValues)
                    console.log(queryTableValues)
                    setLoading(false)
                },
                error => {
                    console.log(error);
                }
            )
    }, [loading]);

    const displayValue = (value, key) => {
        if (Array.isArray(value)) {
            return (
                <ListTags data={value} fieldKey={key} />
            )
        } else if (value instanceof Date) {
            return value.toDateString();
        } else if (typeof value == "boolean") {
            return <Checkbox checked={value} disabled />
        }
        return value
    }

    const toggleEditCell = (rowIndex, fieldName, fieldValue) => {
        setEditField({
            rowIndex,
            fieldName,
            fieldValue,
            inUse: !editField.inUse
        })
    }

    const onInputChanged = (event, field) => {
        setEditField({ ...editField, fieldValue: parsedValue(field, event.target.value, editField.fieldValue) })
    }

    const submitChange = (id, fieldName, oldValue, newFieldValue) => {
        dataRef.doc(id).update({ [fieldName]: parsedValue(fieldName, newFieldValue, oldValue) }).then(() => {
            toggleEditCell();
            setLoading(true);
        });
    }

    const removeValueFromArray = (itemVal) => {
        setEditField({ ...editField, fieldValue: _.without(editField.fieldValue, itemVal) })
    }

    const addValuetoArray = (e, newProp) => {
        setEditField({ ...editField, fieldValue: _.concat(editField.fieldValue, (newListItem)) })
        setNewListItem("")
    }

    const deleteRow = (rowId) => {
        dataRef.doc(rowId).delete().then(() => {
            console.log("Document successfully deleted!");
            setShowModal(false)
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    return (
        <div>
            <h1>Table Data</h1>
            {!loading && tableValues && (
                <table className="ui celled table">
                    <thead>
                        <tr>
                            {Object.values(Object.values(tableValues)[0]).map((field, index) => {
                                return (<th key={index} className="col-name">{field.header}</th>)
                            })}
                            <th>Delete Row</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(tableValues).map(([rowId, row]) => {
                            return (
                                <tr key={rowId}>
                                    {Object.entries(row).map(([key, value]) => {
                                        return (
                                            <td data-label={key} key={key + rowId} >
                                                {editField.inUse && editField.fieldName === key && editField.rowIndex === rowId ?
                                                    <div className="ui action input">
                                                        <FieldInput
                                                            dataValue={dataFields[key]}
                                                            fieldKey={key}
                                                            dataFromKey={editField.fieldValue}
                                                            handleChange={(event) => onInputChanged(event)}
                                                            onArrayInputChanged={(e) => setNewListItem(e.target.value)}
                                                            onDeleteFromArray={(itemValue) => removeValueFromArray(itemValue)}
                                                            newArrayValue={newListItem}
                                                            addToDataArray={addValuetoArray} />
                                                        <Button onClick={() => submitChange(rowId, key, value.cellValue, editField.fieldValue)}>Done</Button>
                                                    </div>
                                                    : <div className="custom-cell">
                                                        <div className="cell-value">
                                                            {displayValue(value.cellValue, key)}
                                                        </div>
                                                        {value.show && <Button className="edit-btn" size="mini" onClick={() => toggleEditCell(rowId, key, value.cellValue)}><i className="edit icon edit-icon"></i></Button>}
                                                    </div>
                                                }
                                            </td>)
                                    })}
                                    <td><Button><Icon name='delete' onClick={() => { setRowToDelete(rowId); setShowModal(true) }} /></Button></td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            )}
            <Button onClick={() => auth.signOut()}>Logout</Button>
            <Confirm
                open={showModal}
                content='Are you sure you want to delete this row?'
                confirmButton="Delete"
                onCancel={() => setShowModal(false)}
                onConfirm={() => deleteRow(rowToDelete)}
                size='mini'
            />
        </div>
    )
}
