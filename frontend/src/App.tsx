import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import SignIn from './app/Screens/SignIn';
import SignUp from './app/Screens/SignUp';
import HomePage from './app/Screens/HomePage';
import Layout from './app/Layout/Layout';
import AddProduct from './app/Screens/AddProduct';
import Search from './app/Screens/Search';
import CardPage from './app/Screens/CardPage';
import PartnerProductList from './app/Screens/PartnerProductList';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/addProduct" element={<AddProduct />} ></Route>
        <Route path="/myProducts" element={<PartnerProductList />} />
        <Route path="/card" element={<CardPage />} >
        </Route>
        <Route path="/Search"  element={<Search/>}/>
      </Routes>
    </Layout>
  );
}

export default App;