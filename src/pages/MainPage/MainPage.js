import React, { useState, useEffect } from "react";
import { dataRef, userDoc, auth } from '../../firebase'
import _ from "lodash";
import { Loader, FormField } from 'semantic-ui-react'
import "./mainpage.scss";
import TabContent from '../TabContent'
import LoginPage from '../LoginPage'

export const MainPage = () => {

    // useEffect(() => {
    //     dataRef
    //         .get()
    //         .then(
    //             querySnapshot => {
    //                 querySnapshot.forEach((doc) => {
    //                     console.log(doc.id)
    //                     console.log(auth.currentUser.uid)
    //                     dataRef.doc(doc.id).update({ 'newActivity': FieldValue.delete });
    //                 })
    //             })
    // }, [])

    const [loggedIn, toggleLogin] = useState(auth.currentUser != null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                toggleLogin(true)
            } else {
                toggleLogin(false)
            }
            setLoading(false)
        });
    }, [auth]);

    return (
        <div className="main-container">
            {loading ?
                <Loader active />
                : (loggedIn ?
                    <TabContent />
                    : <LoginPage />)
            }
        </div>
    )
}
