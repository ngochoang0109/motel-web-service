import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Post from '../Post/Post';
import { postAction } from './../../../../../actions/postAction'

import './Posts.css';

const Posts = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const postsShowing = useSelector(state => state.postsReducer);
    const postsReject = useSelector(state => state.rejectPostsReducer);
    const postsWaiting = useSelector(state => state.waitingPostsReducer);
    const auth = useSelector(state => state.authReducer.loggedIn);
    useEffect(() => {
        if (auth) {

            dispatch(postAction.getAllPosts());

            dispatch(postAction.getRejectPosts());

            dispatch(postAction.getWaitingPosts());

        }
    }, []);


    const showPosts = () => {
        var result = null;

        switch (name) {
            case "show-ing":
                if (postsShowing.content.length > 0) {
                    result = postsShowing.content.map((item, index) => {
                        return <Post
                            key={item.id}
                            post={item}
                            index={index}></Post>
                    })
                }
                break;
            case "reject":
                if (postsReject.content.length > 0) {
                    result = postsReject.content.map((item, index) => {
                        return <Post
                            key={item.id}
                            post={item}
                            index={index}></Post>
                    })
                }
                break;
            case "wait-approve":
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
                        <th scope="col">Ảnh đại diện</th>
                        <th scope="col">Tiêu đề</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Ngày đăng</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Tác vụ</th>
                    </tr>
                </thead>

                <tbody>
                    {showPosts()}
                </tbody>
            </table>
        </div>
    )
};

export default Posts;