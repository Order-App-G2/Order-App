import React, { Component } from 'react'
import './SignIn.css'
import { Link } from 'react-router-dom';


interface SignInProps {
}

interface SignInState {
    isLogin: boolean,
    isLoading: boolean,
    user: User,
    error: boolean,
    success: boolean
}

interface User {
    username: '',
    email: '',
    password: '',
    address?: '',
    phoneNumber?: ''

}

export const FormHeader = (props: any) => (
    <h2 id="headerTitle">{props.title}</h2>
);



export const FormButton = (props: any) => (
    <div id="button" className="row">
        <button onClick={props.onClick}>{props.title}</button>
    </div>
);

export const FormInput = (props: any) => (
    <div className="row">
        <label>{props.description}</label>
        <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
    </div>
);

const OtherMethods = (props: any) => (
    <div id="alternativeLogin">
        <label>Or sign in with:</label>
        <div id="iconGroup">
            <Facebook />
            <Twitter />
            <Google />
        </div>
    </div>
);

const Facebook = (props: any) => (
    <a href="#" id="facebookIcon"></a>
);

const Twitter = (props: any) => (
    <a href="#" id="twitterIcon"></a>
);

const Google = (props: any) => (
    <a href="#" id="googleIcon"></a>
);

const Form = (props: any) => (
    <div>
        <FormInput description="Username" placeholder="Enter your username" type="text" />
        <FormInput description="Password" placeholder="Enter your password" type="password" />
        <FormButton title="Log in" />
        <p>Need an account? <Link to={{pathname:'signUp'}} className='signUp'>Sign up</Link></p>
    </div>
);


export class SignIn extends Component<SignInProps, SignInState> {

    constructor(props: SignInProps) {
        super(props);
        this.state = {
            isLogin: false,
            isLoading: false,
            error: false,
            success: false,
            user: {
                username: '',
                email: '',
                password: '',
                address: '',
                phoneNumber: ''
            }
        }
    }


    submitHandler = (event: any) => {

    };

    render() {
        return (
            <div id="SignInForm">
                <FormHeader title="Log in to your account" />
                <Form />
                {/* <OtherMethods /> */}
            </div>

        )
    }
}

export default SignIn

