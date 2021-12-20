import React, { Component } from 'react'
import './SignIn.css'
import { Link, Navigate, NavLink } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { login } from '../../redux/actions/authAction';

interface SignInProps {
    login: (username: any, password: any) => any,
    isLogedIn: boolean
}

interface SignInState {
    isLogin: boolean,
    isLoading: boolean,
    error: boolean,
    success: boolean,
    userName: string,
    password: string
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
        }
    }

    submitHandler = (event: any) => {

        event.preventDefault();

        this.setState({
            success: false,
        });

        this.props.login(this.state.userName, this.state.password)
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

    returnFormLogIn = () => {
        return (<div>
            <FormHeader title="Log in to your account" />
            <FormInput description="Username" placeholder="Enter your username" type="text" onChange={(e: any) => { this.setState({ userName: e.target.value }) }} />
            <FormInput description="Password" placeholder="Enter your password" type="password" onChange={(e: any) => { this.setState({ password: e.target.value }) }} />
            <FormButton title="Log in" onClick={this.submitHandler} />
            <p className='redirectToSignUp'>Need an account ? <Link to={{ pathname: '/signUp' }} className='signUp'> Sign up</Link></p>
        </div>)
    }

    render() {
        return (
            <div id="SignInForm">
                {!this.props.isLogedIn && this.returnFormLogIn()}
                {this.props.isLogedIn && <FormHeader title="You are already loged In" />}
                {this.props.isLogedIn && <Navigate replace to={{ pathname: '/' }}/>}
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
        login: (username: any, password: any) => dispatch(login(username, password)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

