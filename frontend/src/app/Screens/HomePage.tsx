import React, { Component } from 'react'
import classes from './HomePage.module.css';
import mealsImage from '../../assets/meals.jpg'
import MealsSummary from '../Meals/MealsSummary';
import Modal from '../Components/Modal/Modal';
import Card from '../Components/Card/Card'
// import Meals from '../Meals/Meals';
import { AvailableMeals } from '../Interfaces';
import { connect } from "react-redux";
import MealItem from '../Meals/MealItem';
import { Navigate } from 'react-router'
import CustomerHomePage from './CustomerHomePage';
import { AddProduct } from './AddProduct';

type UserType = 'courier' | 'partner' | 'customer';
interface HomePageProps{
    userType: UserType;
}

interface HomePageState {

}


export class HomePage extends Component<HomePageProps, HomePageState > {

    constructor(props: HomePageProps){
        super(props);
        
        this.state = {
            
        }
    }

    renderHome = () => {
        switch(this.props.userType){
            case 'customer':
                return <CustomerHomePage />;
            case 'partner':
                return <AddProduct/>
            default:
                return <Navigate replace to='signIn' />;
        }
    }

    render() {
        return (
            this.renderHome()
        )
    }
}

function mapStateToProps(state: any) {
    return {
     userType: state.authReducer.type
    };
}
function mapDispatchToProps(dispatch: any) {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
