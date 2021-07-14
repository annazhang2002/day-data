import React from "react";
import "./datapage.scss";
import { CompareData } from './components/CompareData.js'
import { AverageData } from './components/AverageData.js'
import { Divider } from 'semantic-ui-react'

export const DataPage = () => {
    return (
        <div>
            <AverageData />
            <Divider />
            <CompareData />
        </div>
    )
}
