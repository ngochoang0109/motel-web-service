import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postAction } from '../../../actions/postAction';
import Post from '../Post/Post';
import * as alertAction from './../../../actions/alertAction';

const Posts = () => {

    // Handling.....
    const dispatch = useDispatch();
    const name = useParams();
    const postsWaiting = useSelector(state => state.waitingPostsReducer);
    const auth = useSelector(state => state.authReducer.loggedIn);
    const alert = useAlert();

    const alertStatus = useSelector(state => state.alertReducer);

    console.log(alertStatus);

    useEffect(() => {
        if (alertStatus.message !== '') {
            alert.show(alertStatus.message, {
                timeout: 3000,
                type: 'success',
                onClose: () => {
                    dispatch(alertAction.success({
                        type: '',
                        message: '',
                        success: false
                    }))
                }
            })
        }
    },[alertStatus])


    useEffect(() => {
        if (auth) {
            dispatch(postAction.getAllPostsWaiting());
        }
    }, []);


    const showPosts = () => {
        let result = null;
        switch (name.name) {
            case "wait-ing":
                if (postsWaiting.content.length > 0) {
                    result = postsWaiting.content.map((item, index) => {
                        return <Post
                            key={item.id}
                            post={item}
                            index={index}></Post>
                    })
                };
                break;
            default:
                break;
        }
        return result;
    }



    return (
        <div className="load-data">
            <table className="responsive-table">
                <thead>
                    <tr>
                        <th scope="col">Mã tin</th>
                        <th scope="col">Loại nhà ở</th>
                        <th scope="col">Ảnh đại diện</th>
                        <th scope="col">Tiêu đề</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Ngày đăng</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Liên lạc</th>
                        <th scope="col">Tác vụ</th>
                    </tr>
                </thead>

                <tbody>
                    {showPosts()}
                </tbody>
            </table>
        </div>)
}

export default Posts;