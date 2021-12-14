import { useContext } from 'react';

import classes from './MealItem.module.css';
import MealItemForm from './MealsItemForm';

const MealItem = (props: any) => {

    if(props == undefined || props == null){
        return <p>Loading...</p>
    }
     const price = `$${props.price.toFixed(2)}`;

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.long_description}>{props.long_description}</div>
                <div>{props.price}</div>
            </div>
            <div>
                <MealItemForm {...props} />
            </div>
        </li>
    );
};

export default MealItem;