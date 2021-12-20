import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeFromCard } from '../../redux/actions/userAction';
import CartItem, { CardItemProps } from '../Components/Cart/CartItem';
import { Meal } from '../Interfaces';

interface CardPageProps {
    cardItems: Meal[]; 
    removeFromCard: (index: number) => any;
}
interface CardPageState {

}
export class CardPage extends Component<CardPageProps, CardPageState> {
    renderCardItems = () => {
        return this.props.cardItems.map((item, index)=>{
            return (
                <CartItem
                    amount={1}
                    name={item.title}
                    price={item.price}
                    key={'meal-item' + index}
                    onRemove={()=> this.props.removeFromCard(index)}
                />
            );
        })
    }
    render() {
        return (
            <div>
                {this.renderCardItems()}
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        cardItems: state.userReducer.cardItems,
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        removeFromCard: (index: number) => dispatch(removeFromCard(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage)
