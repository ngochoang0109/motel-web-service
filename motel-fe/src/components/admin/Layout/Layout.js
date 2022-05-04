import { Route } from "react-router-dom";
import PostManagementPage from "../../../page/admin/PostManagementPage/PostManagementPage";
import Content from "../Content/Content";
import SlideBar from "../SlideBar/SlideBar";

const Layout = () => {
    return (<>
        <SlideBar></SlideBar>
        <Content>
            <Route path="/admin/home" exact>
                <h1>HOME PAGE</h1>
            </Route>
            <Route path="/admin/home/posts-management">
                <PostManagementPage></PostManagementPage>
            </Route>
        </Content>
    </>)
}

export default Layout;