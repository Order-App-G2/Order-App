import React, { Component } from 'react'
import classes from './HomePage.module.css';
import mealsImage from '../../assets/meals.jpg'
import Modal from '../Components/Modal/Modal';
export class HomePage extends Component {
    render() {
        return (
            <div className="homePage">
                <div className={classes['main-image']}>
                    <div className={classes.container}>
                        <img src={mealsImage} alt='A table full of delicious food!' />
                        <p className={classes.centered}>Време е да си поръчаш нещо вкусно</p>
                    </div>
                </div>
                <div className={classes.meals}>
                    all meals
                </div>
            </div>
        )
    }
}

export default HomePage
