import React, { Component } from 'react'
import CartIcon from '../../Components/Cart/CartIcon'
import classes from './HeaderCartButton.module.css';

export interface HeaderCartButtonProps {
  amount: number;
}
export class HeaderCartButton extends Component<HeaderCartButtonProps> {
    
onClick = () => {

}
    render() {
        return (
            <button className={'button'} onClick={this.onClick}>
            <span className={classes.icon}>
              <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{this.props.amount}</span>
          </button>
        )
    }
}

export default HeaderCartButton
