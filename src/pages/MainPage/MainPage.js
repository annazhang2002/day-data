import React, { useState, useEffect } from "react";
import { auth } from '../../firebase'
import { Loader } from 'semantic-ui-react'
import "./mainpage.scss";
import TabContent from '../TabContent'
import LoginPage from '../LoginPage'

export const MainPage = () => {
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
    }, []);

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
