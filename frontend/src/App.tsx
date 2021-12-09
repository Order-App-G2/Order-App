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


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"  element={<HomePage/>} />
        <Route path="/signIn"  element={<SignIn/>}/>
        <Route path="/signUp"  element={<SignUp/>}/>
      </Routes>
      </Layout>
  );
}

export default App;
