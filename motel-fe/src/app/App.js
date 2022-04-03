import { Route } from "react-router-dom";
import Layout from "../components/user/Layout/Layout";
import RegisterPage from "./../page/RegisterPage/RegisterPage";
import LoginPage from "./../page/LoginPage/LoginPage";
import UserProfile from "../page/UserProfile/UserProfile";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
function App() {

  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/home"></Redirect>
      </Route>
      <Route path="/home">
        <Layout></Layout>
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/user/1" exact>
        <UserProfile />
      </Route>
    </Switch>

  );
}

export default App;