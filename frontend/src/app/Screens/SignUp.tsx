import React, { Component } from 'react'
import { FormHeader, FormInput, FormButton } from './SignIn';
import './SignUp.css'
import { Link } from 'react-router-dom';
import courierImg from '../../assets/courier.png'
import rest from '../../assets/rest.png'
import eat from '../../assets/eating.png'
import axios from 'axios';
import { connect } from "react-redux";
import { registerCustomer, registerCourier, registerPartner } from '../../redux/actions/authAction';
// import { isEmail } from 'validator';

interface SignUpProps {
    registerCustomer: (username: any, password: any, email: any, phone_number: any, address: any) => any,
    registerPartner: (username: any, password: any, email: any) => any,
    registerCourier: (username: any, password: any, email: any) => any
}

interface SignUpState {
    userName: string,
    email: string,
    phoneNumber: string,
    address: string,
    password: string,
    partnerUserName: string,
    partnerEmail: string,
    partnerPassword: string,
    courierUsername: string,
    courierEmail: string,
    courierPassword: string,
    error: boolean,
    success: boolean,
    succsessRegisterCourier: boolean,
    successRegisterPartner: boolean,
    courierClicked: boolean,
    partnerClicked: boolean,
    custumerClicked: boolean,


}

const Courier = (props: any) => (
    <img src={courierImg} id="img" onClick={props.onClick} />
);

const Partner = (props: any) => (
    <img src={rest} id="img" onClick={props.onClick} />
);

const Customer = (props: any) => (
    <img src={eat} id="img" onClick={props.onClick} />
);

export class SignUp extends Component<SignUpProps, SignUpState> {
    constructor(props: SignUpProps) {
        super(props);

        this.handleSubmitCustomerForm = this.handleSubmitCustomerForm.bind(this)

        this.state = {
            userName: '',
            email: '',
            phoneNumber: '',
            address: '',
            password: '',
            partnerUserName: '',
            partnerEmail: '',
            partnerPassword: '',
            courierUsername: '',
            courierEmail: '',
            courierPassword: '',
            error: false,
            success: false,
            succsessRegisterCourier: false,
            successRegisterPartner: false,
            courierClicked: false,
            custumerClicked: false,
            partnerClicked: false,


        }
    }

    handleCourierClick = () => {
        this.setState({
            courierClicked: true
        })
    }

    handleParnerClick = () => {
        this.setState({
            partnerClicked: true
        })
    }

    handleCustumerClick = () => {
        this.setState({
            custumerClicked: true
        })
    }

    restartState = () => {
        this.setState({
            courierClicked: false,
            partnerClicked: false,
            custumerClicked: false
        })
    }


    handleSubmitCustomerForm = (e: Event) => {
        e.preventDefault();

        this.setState({
            success: false,
        });
        this.props.registerCustomer(this.state.userName, this.state.password, this.state.email, this.state.phoneNumber, this.state.address)

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
        this.restartState()
    }

    handleSubmitCourierForm = (e: Event) => {
        e.preventDefault();

        this.setState({
            succsessRegisterCourier: false,
        });
        this.props.registerCourier(this.state.courierUsername, this.state.courierPassword, this.state.courierEmail)
            .then(() => {
                this.setState({
                    succsessRegisterCourier: true,
                });
            })
            .catch(() => {
                this.setState({
                    succsessRegisterCourier: false
                })
            })
        this.restartState()
    }

    handleSubmitPathnerForm = (e: Event) => {
        e.preventDefault();

        this.setState({
            successRegisterPartner: false,
        });
        this.props.registerPartner(this.state.partnerUserName, this.state.partnerPassword, this.state.partnerEmail)
            .then(() => {
                this.setState({
                    successRegisterPartner: true,
                });
            })
            .catch(() => {
                this.setState({
                    successRegisterPartner: false
                })
            })
        this.restartState()
    }



    returnRegisterChoice = () => {
        return (
            <div id="alternativeLogin">
                <div id="iconGroup" >
                    {!this.state.courierClicked && !this.state.partnerClicked && !this.state.custumerClicked && <Courier onClick={this.handleCourierClick} />}
                    {!this.state.courierClicked && !this.state.partnerClicked && !this.state.custumerClicked && <Customer onClick={this.handleCustumerClick} />}
                    {!this.state.courierClicked && !this.state.partnerClicked && !this.state.custumerClicked && <Partner onClick={this.handleParnerClick} />}
                </div>
            </div>
        );
    }

    returnCustomerForm = () => {
        return (
            <div>
                <FormInput description="Username" placeholder="Enter your username" type="text" onChange={(e: any) => { this.setState({ userName: e.target.value }) }} />
                <FormInput description="Email" placeholder="Enter your email" type="text" onChange={(e: any) => { this.setState({ email: e.target.value }) }} />
                <FormInput description="PhoneNumber" placeholder="Enter your phone number" onChange={(e: any) => { this.setState({ phoneNumber: e.target.value }) }} />
                <FormInput description="Address" placeholder="Enter your address" onChange={(e: any) => { this.setState({ address: e.target.value }) }} />
                <FormInput description="Password" placeholder="Enter your password" type="password" onChange={(e: any) => { this.setState({ password: e.target.value }) }} />
                <FormButton title="Register" onClick={this.handleSubmitCustomerForm} />
            </div>
        );
    }

    returnCourierForm = () => {
        return (
            <div>
                <FormInput description="Username" placeholder="Enter your username" type="text" onChange={(e: any) => { this.setState({ courierUsername: e.target.value }) }} />
                <FormInput description="Email" placeholder="Enter your email" type="text" onChange={(e: any) => { this.setState({ courierEmail: e.target.value }) }} />
                <FormInput description="Password" placeholder="Enter your password" type="password" onChange={(e: any) => { this.setState({ courierPassword: e.target.value }) }} />
                <FormButton title="Register" onClick={this.handleSubmitCourierForm} />
            </div>
        )
    }

    returnPartnerForm = () => {
        return (
            <div>
                <FormInput description="Username" placeholder="Enter your username" type="text" onChange={(e: any) => { this.setState({ partnerUserName: e.target.value }) }} />
                <FormInput description="Email" placeholder="Enter your email" type="text" onChange={(e: any) => { this.setState({ partnerEmail: e.target.value }) }} />
                <FormInput description="Password" placeholder="Enter your password" type="password" onChange={(e: any) => { this.setState({ partnerPassword: e.target.value }) }} />
                <FormButton title="Register" onClick={this.handleSubmitPathnerForm} />
            </div>
        )
    }

    render() {
        return (
            <div id="SignUpForm">
                <div className="SignUpBorder">
                    <FormHeader title="Register as" />
                    {this.returnRegisterChoice()}
                    {this.state.courierClicked && this.returnCourierForm()}
                    {this.state.custumerClicked && this.returnCustomerForm()}
                    {this.state.partnerClicked && this.returnPartnerForm()}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state: any) {
    return {

    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        registerCustomer: (username: any, password: any, email: any, phone_number: any, address: any) => dispatch(registerCustomer(username, password, email, phone_number, address)),
        registerPartner: (username: any, password: any, email: any) => dispatch(registerPartner(username, password, email)),
        registerCourier: (username: any, password: any, email: any) => dispatch(registerCourier(username, password, email))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
