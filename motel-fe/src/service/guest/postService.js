import callAPI from './../../utils/callAPI';

const getPostDetailById=(id)=>{
    return callAPI({},`auth/posts/${id}`,"GET");
}

const getRelatedPosts=(address, typeId, id)=>{
    return callAPI({},`auth/posts/related-post?type=${typeId}&address=${address}&id=${id}`,"GET");
}

const getNewLeastPosts=(id)=>{
    return callAPI({},`auth/posts/new-post/${id}`,"GET");
}

const getPostsOfType=(shortName, pageNo, sort)=>{
    console.log(`auth/posts/menu-post/posts-of-type?type=${shortName}&pageNo=${pageNo}&pageSize=10&sort=${sort}`)
    return callAPI({},`auth/posts/menu-post/posts-of-type?type=${shortName}&pageNo=${pageNo}&pageSize=10&sort=${sort}`,"GET");
}

export const postGuestservice={
    getPostDetailById,
    getRelatedPosts,
    getNewLeastPosts,
    getPostsOfType
}