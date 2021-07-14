import React from "react";
import { provider, auth } from '../../firebase'
import { Container, Button, Header } from 'semantic-ui-react'
import "./loginpage.scss";

export const LoginPage = () => {

    const googleSignIn = () => {
        auth.signInWithPopup(provider).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        });

    }

    return (
        <Container textAlign="center">
            <Header as='h1' className="title">Welcome to Day Data</Header>
            <Header as='h3'>An easy way to track your days and analyze which patterns lead to the best days</Header>
            <Button color='google plus' onClick={googleSignIn}>Sign in with Google</Button>
        </Container>
    )
}
