import React, { useState } from "react";
import { Tab } from 'semantic-ui-react'
import "./tabcontent.scss";
import LogFormPage from '../LogFormPage'
import DataPage from '../DataPage'
import TablePage from '../TablePage'

export const TabContent = () => {
    const [activeTab, setActiveTab] = useState(0);
    const panes = [
        { menuItem: 'Logging Form', render: () => <Tab.Pane><LogFormPage user changeTab={setActiveTab} /></Tab.Pane> },
        { menuItem: 'Data Analysis', render: () => <Tab.Pane><DataPage user /></Tab.Pane> },
        {
            menuItem: 'Table Data', render: () =>
                <Tab.Pane><TablePage user /></Tab.Pane>
        },
    ]

    return (
        <Tab panes={panes} activeIndex={activeTab} className="tabs-container" onTabChange={(e, { activeIndex }) => setActiveTab(activeIndex)} />
    )
}
