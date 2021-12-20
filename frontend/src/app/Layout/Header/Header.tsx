import React, { Component } from 'react'
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import HeaderCartButton from '../HeaderCartButton/HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import { logout } from "../../../redux/actions/authAction"
import logo from '../../../assets/logo2.png'
import { connect } from "react-redux";
import { Meal } from '../../Interfaces';

interface HeaderProps {
  logOut: () => any,
  onShowCart: () => any,
  isLogedIn: boolean,
  cardItems: Meal[],
}

interface HeaderState {
  isLogedIn: boolean
}

export class Header extends Component<HeaderProps, HeaderState> {

  constructor(props: HeaderProps) {
    super(props);

    this.state = {
      isLogedIn: false
    }
  }

  handleLogOut = () => {
    this.props.logOut()
    this.setState({
      isLogedIn: false
    })
  }


  render() {
    return (
      <Fragment>
        <header className={classes.header}>
          <Link className={classes.logo} to='/'> <img src={logo} />Glovo 2</Link>
          <nav className={classes.nav}>
            <ul>
              <li><Link to='/'>Home</Link></li>
              {!this.props.isLogedIn && <li> <Link to='/signIn'>Login</Link></li>}
              {this.props.isLogedIn && <li>  <Link to='/product'>Product</Link> </li>}
              {this.props.isLogedIn && <li onClick={this.handleLogOut}> <Link to='/'>Log out</Link> </li>}
              {this.props.isLogedIn && <li> <Link to={{pathname: '/card'}}><HeaderCartButton amount={this.props.cardItems.length}/></Link></li>}
              {/* <li> <Link to="/Search">Search</Link></li> */}
            </ul>
          </nav>
        </header>
      </Fragment>
    );
  }
};

function mapStateToProps(state: any) {
  return {
    isLogedIn: state.authReducer.isLoggedIn,
    cardItems: state.userReducer.cardItems,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    logOut: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
