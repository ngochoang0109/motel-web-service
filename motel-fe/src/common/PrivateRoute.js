
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";



const PrivateRoute = ({ authenticated,path,componentLoggedIn: Component}) => (
  <Route
    path={path}
    render={props=>authenticated ? (<Component/>) : (<Redirect to="/login"></Redirect>)}
  ></Route>
);

export default PrivateRoute