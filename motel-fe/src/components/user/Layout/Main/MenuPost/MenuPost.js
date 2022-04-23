import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAction } from '../../../../../actions/postAction';
import PostCard from '../PostCard/PostCard';

import './MenuPost.css';
const MenuPost = () => {
    const dispatch= useDispatch();
    const showingPosts= useSelector(state=>state.menuPostReducer);
    const color= ["projcard-blue","projcard-red","projcard-green","projcard-yellow"];
    useEffect(()=>{
        dispatch(postAction.getPostsShowing());
    },[]);

    const ShowPost=()=>{
        if (showingPosts.content.length > 0) {
            let i=-1;
            return showingPosts.content.map((item, index) => {
                i++;
                if(i>3){
                    i=0;
                }
                return <PostCard
                    key={item.id}
                    post={item}
                    index={index}
                    color={color[i]}></PostCard>
            })
        }
    }

    return (
        <>
            <div className="title">
                <h1>Bài Đăng Hiện Có</h1>
            </div>
            <div className="projcard-container">
                {ShowPost()}
            </div>
        </>)
}

export default MenuPost;