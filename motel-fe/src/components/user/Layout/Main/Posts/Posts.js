import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post/Post';
import {postAction} from './../../../../../actions/postAction'

import './Posts.css';

const Posts = () => {
    const dispatch= useDispatch();
    const posts=useSelector(state=>state.postsReducer);
    const auth=useSelector(state=>state.authReducer.loggedIn);
    useEffect(()=>{
        if(auth){
            dispatch(postAction.getAllPosts());
        }
    },[]);


    const showPosts=()=>{
        var result = null;
        if (posts.content.length > 0) {
           result = posts.content.map((item, index) => {
              return <Post
                key={item.id}
                post={item}
                index={index}></Post>
           })
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