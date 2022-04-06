import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import { Route } from "react-router-dom";
import PostPage from "../../../page/user/PostPage/PostPage";
import Main from "./Main/Main";
import PrivateRoute from "../../../common/PrivateRoute";
import { Fragment } from "react";

const Layout = (props) => {
    return (
        <Fragment>
            <NavBar></NavBar>
            <Main>
                <Route path="/home" exact>
                    <h1>This is home page</h1>
                </Route>
                <Route path="/home/user/posts" exact>
                    <h1>This is posts page</h1>
                </Route>
                <PrivateRoute authenticated={props.authenticated}
                    path="/home/user/posts/create-post" componentLoggedIn={PostPage}></PrivateRoute>
            </Main>
            <Footer></Footer>
        </Fragment>
    )
}

export default Layout;