import { useContext } from 'react';

import classes from './MealItem.module.css';
// import MealItemForm from './MealsItemForm';
import { Meal } from '../Interfaces';
import Card from '../Components/Card/Card'



export interface MealItemsProps extends Meal{
    onClick?: () => void;
}
const MealItem = (props: MealItemsProps) => {

    if(props == undefined || props == null){
        return <p>Loading...</p>
    }
     const price = `$${props.price.toFixed(2)}`;

    return (
            <Card>
        <li className={classes.meal} onClick={props.onClick}>
                <div>
                    <h3>{props.title}</h3>
                    <div className={classes.description}>{props.category}</div>
                    <div className={classes.long_description}>{props.content}</div>
                    <div>{props.price}</div>
                </div>
                {/* <div>
                    <MealItemForm {...props} />
                </div> */}
        </li>
                </Card>
    );
};

export default MealItem;