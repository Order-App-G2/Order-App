import { IFoodItem } from "./IFoodItem";
import '../../Screens/Search.css';

const FoodItem = (props: { food: IFoodItem }) => {
    const { food } = props;
    return (
        <div className="food">
            <div className="title">
                <img src={food.thumbnail || 'http://localhost:3000/placeholder.jpg'} alt={food.title} />
                <p>{food.title}</p>
            </div>
            {food.ingredients &&
                <ul>
                    {food.ingredients.split(',').map(ingredient => <li>{ingredient}</li>)}
                </ul>
            }
            <a href={food.href} target="_bla">View Food</a>
        </div>
    )
};

export default FoodItem;