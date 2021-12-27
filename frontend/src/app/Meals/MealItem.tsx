import { useContext } from 'react';

import classes from './MealItem.module.css';
// import MealItemForm from './MealsItemForm';
import Card from '../Components/Card/Card';
import { connect } from "react-redux";
import { addToCard } from '../../redux/actions/userAction';


export interface MealItemsProps {
    onClick?: () => void;
    isLogedIn: boolean;
    addToCard: (meal: any) => any;
    category: string , 
    partnerId: number , 
    title: string ,
    price: number, 
    product_id: number , 
    content: string
}
const MealItem = (props: MealItemsProps) => {

    if (props == undefined || props == null) {
        return <p>Loading...</p>
    }

    const handleAddToCard = () => {
        const meal: any = {
            category: props.category,
            content: props.content,
            product_id: props.product_id,
            price: props.price,
            title: props.title,
            partner_id: props.partnerId,
        }
        props.addToCard(meal);
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
                  {props.isLogedIn && <div className='buttons'><button onClick={handleAddToCard} className={classes.add}>+ Add</button></div>}
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
        addToCard: (meal: any) => dispatch(addToCard(meal))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MealItem);