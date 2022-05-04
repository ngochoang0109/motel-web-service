import { Route } from "react-router-dom";
import MenuBar from "../../../components/user/MenuBar/MenuBar";
import Posts from "./../../../components/user/Posts/Posts";
import { Redirect } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';

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
                <Posts></Posts>
            </Route>
        </div>
    )
}

export default PostManagementPage;