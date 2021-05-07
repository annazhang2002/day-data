import React, { useState, useEffect } from "react";
import { dataRef } from '../../firebase'
import _ from "lodash";
import { Tab } from 'semantic-ui-react'
import "./mainpage.scss";
import LogFormPage from '../LogFormPage'
import DataPage from '../DataPage'

export const MainPage = () => {
    const [loggedToday, setLoggedToday] = useState(false);

    // check if there has been a log today
    useEffect(() => {
        dataRef
            .orderBy('date', 'desc')
            .limit(1)
            .onSnapshot(
                querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        const mostRecentDate = doc.data().date.toDate();
                        // if (sameDay(mostRecentDate, new Date())) {
                        //     setLoggedToday(true);
                        // } else {
                        //     setLoggedToday(false);
                        // }
                    });
                },
                error => {
                    console.log(error);
                }
            )
    })

    const panes = [
        { menuItem: 'Logging Form', render: () => <Tab.Pane><LogFormPage /></Tab.Pane> },
        { menuItem: 'Data Analysis', render: () => <Tab.Pane><DataPage /></Tab.Pane> },
        { menuItem: 'Table Data', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]

    return (
        <div className="main-container">
            <Tab panes={panes} className="tabs-container" />
        </div>
    )
}
