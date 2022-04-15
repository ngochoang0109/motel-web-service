import * as alertAction from './../../../actions/alertAction';
import * as alertConstant from './../../../constants/alertConstant';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import MenuBar from "../../../components/user/Layout/Main/MenuBar/MenuBar";
import Posts from "../../../components/user/Layout/Main/Posts/Posts";
import { Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PostManagementPage = () => {
    // const alertStatus = useSelector(state => state.alertReducer);
    // const dispatch= useDispatch();
    // useEffect(() => {
    //     if (alertStatus.success) {
    //         alert.show(alertStatus.message, {
    //             timeout: 2500,
    //             type: 'success',
    //             onClose:()=>{
    //                 dispatch(alertAction.success({
    //                     type:alertConstant.SUCCESS,
    //                     message:"",
    //                     success:false
    //                 }))
    //             }
    //         })
    //     };
    // },[alertStatus])
    const { url, path } = useRouteMatch();
    return (
        <div className="content">
            <Redirect to="/home/user/posts/show-ing"></Redirect>
            <Route path={`${path}/:name`} exact>
                <MenuBar url={url}></MenuBar>
                <Posts ></Posts>
            </Route>
        </div>
    )
}

export default PostManagementPage;