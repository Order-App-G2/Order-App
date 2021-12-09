import React, { Component } from 'react'
import CartIcon from '../../Components/Cart/CartIcon'
import classes from './HeaderCartButton.module.css';


export class HeaderCartButton extends Component {
    
onClick = () => {

}
    render() {
        return (
            <button className={'button'} onClick={this.onClick}>
            <span className={classes.icon}>
              <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{8}</span>
          </button>
        )
    }
}

export default HeaderCartButton
