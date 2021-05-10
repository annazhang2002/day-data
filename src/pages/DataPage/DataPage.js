import React, { useState, useEffect } from "react";
import { dataRef, firestore } from '../../firebase'
import _ from "lodash";
import "./datapage.scss";
import { CompareData } from './components/CompareData.js'
import { AverageData } from './components/AverageData.js'
import { Divider } from 'semantic-ui-react'

const dataTypes = ['average', 'compare'];

export const DataPage = () => {
    const [dataType, setDataType] = useState(dataTypes[0]);

    return (
        <div>
            <AverageData />
            <Divider />
            <CompareData />
        </div>
    )
}
