import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import SignIn from './app/Screens/SignIn';
import SignUp from './app/Screens/SignUp';
import HomePage from './app/Screens/HomePage';
import Layout from './app/Layout/Layout';
import { Navigate } from 'react-router-dom';
import Mealsdetails from './app/Meals/Mealsdetails';
import ProductsPage from './app/Screens/ProductsPage';
import Search from './app/Screens/Search';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/product" element={<ProductsPage />} >
        <Route path="/products/:productId" element={<Mealsdetails />} />
        </Route>
        <Route path="/Search"  element={<Search/>}/>
      </Routes>
    </Layout>
  );
}

export default App;