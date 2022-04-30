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

const getWaitingPosts=()=>{
    const headers= authHeader();
    return callAPI(headers,"posts/wait-ing","GET");
}

const getPosts=()=>{
    const headers=authHeader();
    return callAPI(headers,"auth/posts/menu-post?pageNo=0&pageSize=10&sort=createAt","GET");
}


const getTypePosts=()=>{
    const headers= authHeader();
    return callAPI(headers,"auth/type-posts","GET");
}

const searchPostByCriteria=(url)=>{
    const headers= authHeader();
    return callAPI(headers,url,"GET");
}


export const postService = {
    createPost, 
    getAll,
    getRejectPosts,
    getWaitingPosts,
    getPosts,
    getTypePosts,
    searchPostByCriteria
} 