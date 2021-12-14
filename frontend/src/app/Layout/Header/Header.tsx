import React, { Component } from 'react'
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import HeaderCartButton from '../HeaderCartButton/HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import { logout } from "../../../redux/actions/authAction"
import logo from '../../../assets/logo2.png'
import { connect } from "react-redux";

interface HeaderProps {
  logOut: () => any,
  onShowCart: () => any,
  isLogedIn: boolean

}

interface HeaderState {

}


export class Header extends Component<HeaderProps, HeaderState> {
  render() {
    return (
      <Fragment>
        <header className={classes.header}>
          <Link className={classes.logo} to='/'> <img src={logo} />Glovo 2</Link>
          <nav className={classes.nav}>
            <ul>
              <li><Link to='/'>Home</Link></li>
              {!this.props.isLogedIn && <li> <Link to='/signIn'>Login</Link></li>}
              <li>  <Link to='/signUp'>Register</Link> </li>
              {this.props.isLogedIn && <li>  <Link to='/product'>Product</Link> </li>}
              {this.props.isLogedIn && <li onClick={this.props.logOut}> <Link to='/'>Log out</Link> </li>}
             { this.props.isLogedIn && <li> <HeaderCartButton /></li>}
            </ul>
          </nav>
        </header>
      </Fragment>
    );
  }
};

function mapStateToProps(state: any) {
  return {
    isLogedIn: state.authReducer.isLoggedIn
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    logOut: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
