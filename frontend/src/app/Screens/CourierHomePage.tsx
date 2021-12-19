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

    private readonly mealsMockupData: AvailableMeals = [
        {
            title: 'McDonalds Burger',
            category: 'Fast Food',
            content: 'burger patty',
            price: 5.2,
        }
    ]
    renderAvailableMeals = () => {
        return this.mealsMockupData.map(meal=>{
            return <MealItem title={meal.title} price={meal.price} category={meal.category} content={meal.content} />
        });
    }

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
                   {this.renderAvailableMeals()}
                </div>
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
