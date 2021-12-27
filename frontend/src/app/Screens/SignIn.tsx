import React, { Component } from 'react'
import './SignIn.css'
import ReCAPTCHA from "react-google-recaptcha";
import { Link, Navigate, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { login } from '../../redux/actions/authAction';

const SITE_KEY = '6LcHrMwdAAAAAFKVQ5pBwMZx28GPNN7oJue2i05s'

interface SignInProps {
    login: (username: any, password: any, reCaptchaToken: any) => any,
    isLogedIn: boolean
}

interface SignInState {
    isLogin: boolean,
    isLoading: boolean,
    error: boolean,
    success: boolean,
    userName: string,
    password: string,
    reCaptchaToken: string | null
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
        <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
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
            userName: '',
            password: '',
            reCaptchaToken: ''
        }
    }

    submitHandler = (event: any) => {

        event.preventDefault();

        this.setState({
            success: false,
        });

        this.props.login(this.state.userName, this.state.password, this.state.reCaptchaToken)
            .then(() => {
                this.setState({
                    success: true,
                });
            })
            .catch(() => {
                this.setState({
                    success: false,
                });
            });

    };

    handleRecaptchaChange = (token: string | null) => {
        this.setState({
            reCaptchaToken: token
        })
    }


    returnFormLogIn = () => {
        return (<>
            <FormHeader title="Log in to your account" />
            <FormInput description="Username" placeholder="Enter your username" type="text" onChange={(e: any) => { this.setState({ userName: e.target.value }) }} />
            <FormInput description="Password" placeholder="Enter your password" type="password" onChange={(e: any) => { this.setState({ password: e.target.value }) }} />
            <div className='reCaptcha'> <ReCAPTCHA onChange={this.handleRecaptchaChange} size="normal" sitekey={SITE_KEY} /> </div>
            <FormButton title="Log in" onClick={this.submitHandler} />
            <p className='redirectToSignUp'>Need an account ? <Link to={{ pathname: '/signUp' }} className='signUp'> Sign up</Link></p>
        </>)
    }

    render() {
        return (
            <div id="SignInForm">
                {!this.props.isLogedIn && this.returnFormLogIn()}
                {this.props.isLogedIn && <FormHeader title="You are already loged In" />}
                {this.props.isLogedIn && <Navigate replace to={{ pathname: '/' }} />}
            </div>

        )
    }
}
function mapStateToProps(state: any) {
    return {
        isLogedIn: state.authReducer.isLoggedIn
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        login: (username: any, password: any, reCaptchaToken: any) => dispatch(login(username, password, reCaptchaToken)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

