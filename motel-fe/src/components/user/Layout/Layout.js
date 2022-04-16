import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import { Route } from "react-router-dom";
import PostPage from "../../../page/user/PostPage/PostPage";
import Main from "./Main/Main";
import PrivateRoute from "./../../../common/PrivateRoute";
import { Fragment } from "react";
import PostManagementPage from "../../../page/user/PostManagementPage/PostManagementPage";
import Hierarchical from "./Main/Hierarchical/Hierarchical";
import HomePage from "../../../page/user/HomePage/HomePage";

const Layout = (props) => {
    return (
        <Fragment>
            <NavBar></NavBar>
            <Main>
                <Hierarchical></Hierarchical>
                <Route path="/home" exact>
                    <HomePage></HomePage>
                </Route>
                <PrivateRoute authenticated={props.authenticated}
                    path="/home/user/posts" componentLoggedIn={PostManagementPage}>
                </PrivateRoute>
                <PrivateRoute authenticated={props.authenticated}
                    path="/home/user/post/create-post" componentLoggedIn={PostPage}></PrivateRoute>
            </Main>
            <Footer></Footer>
        </Fragment>
    )
}

export default Layout;