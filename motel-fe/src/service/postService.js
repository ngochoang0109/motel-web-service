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


export const postService = {
    createPost, 
    getAll
} 