import { Fragment } from "react";
import { Link } from "react-router-dom";

import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import logo from "../../../assets/logo2.png";

const Header = (props: any) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <Link className={classes.logo} to="/">
          {" "}
          <img src={logo} />
          Glovo 2
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {" "}
              <Link to="/signIn">Login</Link>
            </li>
            <li>
              {" "}
              <Link to="/signUp">Register</Link>
            </li>
            <li>
              {" "}
              <Link to="/Search">Search</Link>
            </li>
            <li>
              {" "}
              <HeaderCartButton />
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
