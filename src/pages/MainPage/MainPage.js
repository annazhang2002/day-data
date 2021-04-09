import React, { useState, useEffect } from "react";
import { dataRef, firestore } from '../../firebase'
import { sameDay, parsedValue } from './util';
import _ from "lodash";
import { Redirect } from "react-router-dom";
import "./mainpage.scss";

export const MainPage = () => {
    const [data, setData] = useState({
        activities: [],
        newActivity: '',
        date: new Date(),
        weather: '',
        hadBreakfast: false,
        rating: 5,
        readingTime: 0,
    })
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
                        if (sameDay(mostRecentDate, new Date())) {
                            setLoggedToday(true);
                        } else {
                            setLoggedToday(false);
                        }
                    });
                },
                error => {
                    console.log(error);
                }
            )
    })

    // add the logged data to firebase
    const addData = () => {
        dataRef
            .add(_.omit(data, ['newActivity']))
            .then((_doc) => {
                setLoggedToday(true)
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
            [id]: parsedValue(id, value),
        });
    };

    const addToDataArray = (event, input) => {
        const { id } = event.target;

        setData({
            ...data,
            [id]: _.concat(data[id], [data[input]]),
            [input]: '',
        });
    }

    const logForm = () => (
        <div>
            <p>Weather: <input type="text" id="weather" value={data.weather} onChange={handleChange} /></p>
            <p>Activites: <input type="text" id="newActivity" value={data.newActivity || ""} onChange={handleChange} />  <button id="activities" onClick={(e) => addToDataArray(e, 'newActivity')}>Add Activity</button> </p>
            {data.activities.map((item, index) => <p key={index}>{item}</p>)}
            <p>Had Breakfast? <input type="checkbox" id="hadBreakfast" value={data.hadBreakfast} onChange={handleChange} /></p>
            <p>Did you journal? <input type="checkbox" id="journaled" value={data.journaled} onChange={handleChange} /></p>
            <p>Reading Time (in minutes): <input type="number" id="readingTime" min="0" value={data.readingTime} onChange={handleChange} /></p>
            <p>How would you rate today? <input type="number" id="rating" min="1" max="10" value={data.rating} onChange={handleChange} /></p>
            <button onClick={addData}>Add Day</button>
        </div>
    );

    return (
        <div>
            {!loggedToday
                ? logForm()
                : <Redirect to="/data" />}
        </div>
    )
}
