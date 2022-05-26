/* eslint-disable default-case */
import { postGuestservice } from "../../service/guest/postService"
import postConstant from './../../constants/postConstant';

const getPostDetailById = (id) => {
    return (dispatch) => {
        return postGuestservice.getPostDetailById(id)
            .then((response) => {
                return (dispatch({
                    type: postConstant.GET_POST_DETAIL,
                    data: response.data
                }))
            })
    }
}

const getRelatedPosts = (address, type, id) => {
    return (dispatch) => {
        return postGuestservice.getRelatedPosts(address, type, id)
            .then((response) => {
                return (dispatch({
                    type: postConstant.GET_RELATED_POSTS,
                    data: response.data
                }))
            })
    }
}

const getTopKNewLeastPosts = (id) => {
    return (dispatch) => {
        return postGuestservice.getNewLeastPosts(id)
            .then((response) => {
                return (dispatch({
                    type: postConstant.GET_NEW_POSTS,
                    data: response.data
                }))
            })
    }
}


const getPostsOfType = (type, pageNo, sort) => {

    let shortName;

    switch (type) {
        case 'cho-thue-phong-tro':
            shortName = 'PT';
            break;
        case 'cho-thue-can-ho':
            shortName = 'CH';
            break;
        case 'nha-cho-thue':
            shortName = 'NNC';
            break;
        default:
            shortName = 'all';
    }

    switch (sort) {
        case 'new-post':
            sort = `approvedDate`;
            break;
        case 'price-ascending':
            sort = `price`;
            break
        case 'acreage-ascending':
            sort = `acreage`;
            break
    }

    console.log(shortName)

    return (dispatch) => {
        return postGuestservice.getPostsOfType(shortName, pageNo, sort)
            .then((response) => {
                console.log(response.data)
                return (dispatch({
                    type: postConstant.GET_SHOWING_POSTS,
                    page: response.data
                }))
            });
    }
}


export const postActionGuest = {
    getPostDetailById,
    getRelatedPosts,
    getTopKNewLeastPosts,
    getPostsOfType
}