import React, { Component } from 'react'
import classes from './HomePage.module.css';
import { connect } from "react-redux";
import CustomerHomePage from './CustomerHomePage';
import  AddProduct  from './AddProduct';
import CourierHomePage from './CourierHomePage';

type UserType = 'courier' | 'partner' | 'customer';
interface HomePageProps {
    userType: UserType;
    isLogedIn: boolean
}

interface HomePageState {

}


export class HomePage extends Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps) {
        super(props);

        this.state = {

        }
    }

    renderHome = () => {
        if(!this.props.isLogedIn) {
            return <CustomerHomePage />;
        }
        switch (this.props.userType) {
            case 'customer':
                return  this.props.isLogedIn && <CustomerHomePage />;
            case 'partner':
                return this.props.isLogedIn && <AddProduct />
            case 'courier':
                return this.props.isLogedIn && <CourierHomePage />
            default:
                return <CustomerHomePage />;
        }
    }

    render() {
        return (
            <div className={classes.homePageWrapper}>
           { this.renderHome()}
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        userType: state.authReducer.type,
        isLogedIn: state.authReducer.isLoggedIn
    };
}
function mapDispatchToProps(dispatch: any) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
