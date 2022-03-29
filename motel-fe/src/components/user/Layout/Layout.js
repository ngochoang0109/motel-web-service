import { Fragment } from "react";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import { Route } from "react-router-dom";
import PostPage from "../../../page/user/PostPage/PostPage";
import Main from "./Main/Main";

const Layout = (props) => {
    return (
        <Fragment>
            <NavBar></NavBar>
            <Main>
                <Route path="/home/posts/create-post">
                    <PostPage></PostPage>
                </Route>
            </Main>
            <Footer></Footer>
        </Fragment>
    )
}

export default Layout;