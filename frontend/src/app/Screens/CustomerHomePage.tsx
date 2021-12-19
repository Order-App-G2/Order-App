import React, { Component } from 'react';
import classes from './HomePage.module.css';
import mealsImage from '../../assets/meals.jpg';
import { connect } from "react-redux";
import MealsSummary from '../Meals/MealsSummary';
import Modal from '../Components/Modal/Modal';
import Card from '../Components/Card/Card';
import { getProduct } from './../../redux/actions/userAction';
import { Meal } from '../Interfaces';
import MealItem from '../Meals/MealItem';

interface CustomerHomePageProps {
    getProduct: () => any, 
    products: Meal[]
}

interface CustomerHomePageState {

}


export class CustomerHomePage extends Component<CustomerHomePageProps, CustomerHomePageState> {

    componentDidMount() {
        this.props.getProduct()
    }

    renderAvailableMeals = () => {
        return this.props.products.map((meal: Meal) => {
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
                    <MealsSummary />
                    {this.renderAvailableMeals()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        userType: state.authReducer.type, 
        products: state.userReducer.allProducts
    };
}
function mapDispatchToProps(dispatch: any) {
    return {
        getProduct: () => dispatch(getProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHomePage)