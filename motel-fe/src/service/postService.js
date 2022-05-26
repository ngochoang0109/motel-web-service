import { authHeader } from "../helper/authHeader";
import callAPI from "../utils/callAPI"

const createPost = (post, images, videos) => {
    const headers = authHeader();
    let formData = new FormData();
    const json = JSON.stringify(post)
    const blob = new Blob([json], {
        type: 'application/json'
    });
    formData.append("post", blob);

    for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
    }
    for (let i = 0; i < videos.length; i++) {
        formData.append("videos", videos[i]);
    }
    return callAPI({ ...headers }, "posts", "POST", formData);
}

const getAll=()=>{
    const headers = authHeader();
    return callAPI(headers,"posts","GET");
}

const getRejectPosts=()=>{
    const headers = authHeader();
    return callAPI(headers,"posts/reject","GET");
}

const getWaitingPostsOfUser=()=>{
    const headers= authHeader();
    return callAPI(headers,"posts/wait-ing","GET");
}

const getPosts=(pageNo,sort)=>{
    const headers=authHeader();
    return callAPI(headers,`auth/posts/menu-post?pageNo=${pageNo}&pageSize=10&sort=${sort}`,"GET");
}


const getTypePosts=()=>{
    const headers= authHeader();
    return callAPI(headers,"auth/type-posts","GET");
}

const searchPostByCriteria=(url)=>{
    const headers= authHeader();
    return callAPI(headers,url,"GET");
}


const getAllWaitingPosts=()=>{
    const headers= authHeader();
    return callAPI(headers,'admin/posts/wait-ing',"GET");
}

const getDetailPostWaitingById=(id)=>{
    const headers= authHeader();
    return callAPI(headers,`admin/posts/wait-ing/${id}`,"GET");
}

const updateStatusPost=(id, status)=>{
    const headers= authHeader();
    return callAPI(headers,`admin/posts/wait-ing/approve/${id}/${status}`,"GET");
}

const getPostDetailById=(id)=>{
    const headers= authHeader();
    return callAPI(headers,`posts/${id}`,"GET");
}


export const postService = {
    createPost, 
    getAll,
    getRejectPosts,
    getWaitingPostsOfUser,
    getPosts,
    getTypePosts,
    searchPostByCriteria,
    getAllWaitingPosts,
    getDetailPostWaitingById,
    updateStatusPost,
    getPostDetailById
} 