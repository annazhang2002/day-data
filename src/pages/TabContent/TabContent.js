import React, { useEffect, useContext } from "react";
import { dataRef, auth } from '../../firebase'
import _ from "lodash";
import { Tab, Button } from 'semantic-ui-react'
import "./tabcontent.scss";
import LogFormPage from '../LogFormPage'
import DataPage from '../DataPage'

export const TabContent = () => {
    // check if there has been a log today
    // useEffect(() => {
    //     dataRef
    //         .orderBy('date', 'desc')
    //         .limit(1)
    //         .onSnapshot(
    //             querySnapshot => {
    //                 querySnapshot.forEach((doc) => {
    //                     const mostRecentDate = doc.data().date.toDate();
    //                     // if (sameDay(mostRecentDate, new Date())) {
    //                     //     setLoggedToday(true);
    //                     // } else {
    //                     //     setLoggedToday(false);
    //                     // }
    //                 });
    //             },
    //             error => {
    //                 console.log(error);
    //             }
    //         )
    // })

    const panes = [
        { menuItem: 'Logging Form', render: () => <Tab.Pane><LogFormPage user /></Tab.Pane> },
        { menuItem: 'Data Analysis', render: () => <Tab.Pane><DataPage user /></Tab.Pane> },
        {
            menuItem: 'Table Data', render: () =>
                <Tab.Pane><Button onClick={() => auth.signOut()}>Logout</Button></Tab.Pane>
        },
    ]

    return (
        <Tab panes={panes} className="tabs-container" />
    )
}
