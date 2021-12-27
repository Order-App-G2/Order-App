import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeFromCard , createOrder} from '../../redux/actions/userAction';
import { orderProduct } from '../../services/user.service';
import CartItem, { CardItemProps } from '../Components/Cart/CartItem';
import { FormButton } from './SignIn';
import './CardPage.css'

interface CardPageProps {
    cardItems: any[]; 
    removeFromCard: (index: number) => any;
    createOrder: (partner_id: number , orders: orderProduct[]) => any
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

    handleSubmit = () => {
    const partner_id =  this.props.cardItems[0].partner_id
    const orders : any[] = []
        this.props.cardItems.map((item)=>{
            return (
                
                orders.push({
                product_id: item.product_id, 
                quantity: 1
            })
            )

        })
        this.props.createOrder(partner_id, orders)
    }

    render() {
        return (
            <div className='cardItems'>
                <div className='items'>
                {this.renderCardItems()}
                <FormButton title='Submit' onClick={this.handleSubmit}/>
            </div>
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
        createOrder: (partner_id: number , orders: orderProduct[]) => dispatch(createOrder(partner_id, orders)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage)
