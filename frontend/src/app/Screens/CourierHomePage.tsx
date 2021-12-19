import React, { Component } from 'react'
import classes from './HomePage.module.css';
import mealsImage from '../../assets/meals.jpg'
import MealsSummary from '../Meals/MealsSummary';
import Modal from '../Components/Modal/Modal';
import Card from '../Components/Card/Card'
import { AvailableMeals } from '../Interfaces';
import MealItem from '../Meals/MealItem';

interface CourierHomePageProps {
}

interface CourierHomePageState {

}


export default class CourierHomePage extends Component<CourierHomePageProps, CourierHomePageState > {


    render() {
        return (
            <div className="homePage">
                hi courier page 
            </div>
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
