import React, { Component } from 'react'
import {
    Routes,
    Route
} from "react-router";
import SignIn from './app/Screens/SignIn';
import SignUp from './app/Screens/SignUp';
import App from './App';
import HomePage from './app/Screens/HomePage';


// const rootElement = document.getElementById("root");
export class AppRoutes extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="logIn" element={<SignIn />} > */}
                    <Route path="signIn" element={<SignIn />} />
                    <Route path="signUp" element={<SignUp />} />
                {/* </Route> */}
            </Routes>
        )
    }
}

export default AppRoutes
