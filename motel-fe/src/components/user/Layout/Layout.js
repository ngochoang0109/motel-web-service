import NavBar from "./../NavBar/NavBar";
import { Route } from "react-router-dom";
import PostPage from "../../../page/user/PostPage/PostPage";
import Main from './../Main/Main';
import PrivateRoute from "./../../../common/PrivateRoute";
import { Fragment } from "react";
import PostManagementPage from "../../../page/user/PostManagementPage/PostManagementPage";
import HomePage from "../../../page/user/HomePage/HomePage";
import Footer from './../Footer/Footer';

const Layout = (props) => {
    return (
        <Fragment>
            <NavBar></NavBar>
            <Main>
                {/* <Hierarchical></Hierarchical> */}
                <Route path="/home" exact>
                    <HomePage></HomePage>
                </Route>
                <PrivateRoute authenticated={props.authenticated}
                    path="/home/user/posts" componentLoggedIn={PostManagementPage}>
                </PrivateRoute>
                <PrivateRoute authenticated={props.authenticated}
                    path="/home/user/post/create-post" componentLoggedIn={PostPage}></PrivateRoute>
                <PrivateRoute authenticated={props.authenticated}
                    path="/home/user/post/edit-post/:id" componentLoggedIn={PostPage}></PrivateRoute>
            </Main>
            <Footer></Footer>
        </Fragment>
    )
}

export default Layout;