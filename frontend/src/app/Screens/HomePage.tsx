import React, { Component } from 'react'
import classes from './HomePage.module.css';
import mealsImage from '../../assets/meals.jpg'
import MealsSummary from '../Meals/MealsSummary';
import Modal from '../Components/Modal/Modal';
import Card from '../Components/Card/Card'
import Meals from '../Meals/Meals';

export class HomePage extends Component {

    render() {
        return (
            <div className="homePage">
                <div className={classes['main-image']}>
                    <div className={classes.container}>
                        <img src={mealsImage} alt='A table full of delicious food!' />
                    </div>
                </div>
                <div className={classes.homePage}>
                    <MealsSummary/>
                   home page
                </div>
            </div>
        )
    }
}

export default HomePage
