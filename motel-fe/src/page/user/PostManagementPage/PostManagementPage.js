import * as alertAction from './../../../actions/alertAction';
import * as alertConstant from './../../../constants/alertConstant';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import MenuBar from "../../../components/user/Layout/Main/MenuBar/MenuBar";
import Posts from "../../../components/user/Layout/Main/Posts/Posts";

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

    return (
        <>
            <div className="content">
                <Route path="/home/user/posts/list-posts" exact>
                    <MenuBar></MenuBar>
                    <Posts></Posts>
                </Route>

            </div>
        </>
    )
}

export default PostManagementPage;