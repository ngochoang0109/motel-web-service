import { Route } from "react-router-dom";
import Layout from "../components/user/Layout/Layout";
import RegisterPage from "./../page/RegisterPage/RegisterPage";
import LoginPage from "./../page/LoginPage/LoginPage";
import { Switch } from "react-router-dom";
function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Layout></Layout>
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
    </Switch>

  );
}

export default App;