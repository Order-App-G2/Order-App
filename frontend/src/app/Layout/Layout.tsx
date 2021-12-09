import {Fragment, useState } from 'react';
// import CartProvider from '../../store/CartProvider';
import {Cart} from '../Components/Cart/Cart'
import Header from './Header/Header'
const Layout = (props: any) => {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
      setCartIsShown(true);
    };
  
    const hideCartHandler = () => {
      setCartIsShown(false);
    };
  
  return (
  <div>
        <Header onShowCart={showCartHandler}/>
        {props.children}     
     </div>
  );
};

export default Layout;
