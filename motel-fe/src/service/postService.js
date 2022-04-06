import { authHeader } from "../helper/authHeader";
import callAPI from "../utils/callAPI"

const headers = authHeader();


const createPost = (post, images, videos) => {
    let formData = new FormData();
    const json=JSON.stringify(post)
    const blob = new Blob([json], {
        type: 'application/json'
    });
    formData.append("post",blob);

    for (let i = 0; i < images.length; i++) {
        formData.append("images",images[i]);
    }
    for (let i = 0; i < videos.length; i++) {
        formData.append("videos",videos[i]);
    }
    
    return callAPI({...headers}, "posts", "POST", formData);
}


export const postService = {
    createPost
} 