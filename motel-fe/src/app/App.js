import { Route } from "react-router-dom";
import Layout from "../components/user/Layout/Layout";
import RegisterPage from "./../page/RegisterPage/RegisterPage";
import LoginPage from "./../page/LoginPage/LoginPage";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import LayoutAdmin from "../components/admin/Layout/Layout";

function App() {

  const isAuthenticated= useSelector(state=>state.authReducer.loggedIn);
  const currentUser=useSelector(state=>state.authReducer.user);

  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/home"></Redirect>
      </Route>
      <Route path="/home">
        <Layout authenticated={isAuthenticated} currentUser={currentUser}></Layout>
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/admin" exact>
        <Redirect to="/admin/home"></Redirect>
      </Route>
      <Route path="/admin/home">
        <LayoutAdmin></LayoutAdmin>
      </Route>
    </Switch>

  );
}

export default App;