import {Fragment, useState } from 'react';
import './Layout.css'
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
        {/* <div className='footer'>
          cretated   
        </div>   */}
     </div>
  );
};

export default Layout;
