import { useContext } from 'react';

import classes from './MealItem.module.css';
// import MealItemForm from './MealsItemForm';
import { Meal } from '../Interfaces';
import Card from '../Components/Card/Card';
import { connect } from "react-redux";


export interface MealItemsProps extends Meal {
    onClick?: () => void;
    isLogedIn: boolean
}
const MealItem = (props: MealItemsProps) => {

    if (props == undefined || props == null) {
        return <p>Loading...</p>
    }

    let price = `$${props.price.toFixed(2)}`;
    return (
        <Card>
            <li className={classes.meal} onClick={props.onClick}>
                <div>
                    <div className='description'>
                        <h3>{props.title}</h3>
                        <div className={classes.description}>{props.category}</div>
                        <div className={classes.long_description}>{props.content}</div>
                        <div>{price}</div>
                    </div>
                  {props.isLogedIn && <div className='buttons'><button className={classes.add}>+ Add</button></div>}
                </div>
        </li>
                </Card >
    );
};

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


export default connect(mapStateToProps, mapDispatchToProps)(MealItem);