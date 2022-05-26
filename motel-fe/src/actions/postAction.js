import postConstant from './../constants/postConstant';
import { postService } from "../service/postService";
import { provinceAPI } from "../utils/provinceAPI";
import * as alertAction from './alertAction';
import * as alertConstant from './../constants/alertConstant';
import { convertTypePostUtils } from './../utils/convertTypePostUtils';

const addPostRequest = (postState, imageRequest, videoRequest) => {

    console.log(postState)

    const { title, brief, content } = postState;

    const province = provinceAPI.getProvinceByCode(postState.provinceCode);
    const district = provinceAPI.getDistrictByCode(postState.districtCode);
    const ward = provinceAPI.getWardByCode(postState.wardCode);
    const address = `${postState.streetAndNumOfHouse} - ${ward.name} - ${district.name} - ${province.name}`;

    const { acreage, airConditioner, internet, parking,
        price, deposit, tower, floor, bedroom,
        toilet, heater, fridge, furniture,
        xCoordinate, yCoordinate } = postState;



    const post = {
        title,
        brief,
        content,
        type: convertTypePostUtils.getType(postState.type)
    }

    const accommodation = {
        acreage,
        address: address,
        airConditioner,
        internet,
        parking,
        price,
        deposit,
        tower,
        floor,
        bedroom,
        toilet,
        heater,
        fridge,
        furniture,
        x: xCoordinate.toString(),
        y: yCoordinate.toString(),
    }

    const postRequest = {
        post,
        accommodation,
    }

    return (dispatch) => {
        return postService.createPost(postRequest, imageRequest.images, videoRequest.videos)
            .then((response) => {
                const alertData = {
                    type: alertConstant.SUCCESS,
                    message: "Tạo tin thành công",
                    success: true
                }
                dispatch(alertAction.success(alertData));
                return (dispatch({
                    type: postConstant.ADD_POST,
                    post: response.data
                }))
            })
    }
}

const getAllPosts = () => {
    return (dispatch) => {
        return postService.getAll()
            .then((response) => {
                return (dispatch({
                    type: postConstant.GET_POSTS,
                    page: response.data
                }))
            })
    }
}

const getRejectPosts = () => {
    return (dispatch) => {
        return postService.getRejectPosts()
            .then((response) => {
                return (dispatch({
                    type: postConstant.GET_REJECT_POSTS,
                    page: response.data
                }))
            })
            .catch()
    }
}

const getWaitingPosts = () => {
    return (dispatch) => {
        return postService.getWaitingPostsOfUser()
            .then((response) => {
                return (dispatch({
                    type: postConstant.GET_WAITING_POSTS,
                    page: response.data
                }))
            })
    }
}

const getPostsShowing = (pageNo, sort) => {
    return (dispatch) => {
        switch (sort) {
            case 'new-post':
                return postService.getPosts(pageNo, 'approvedDate')
                    .then((response) => {
                        console.log(response.data)
                        return (dispatch({
                            type: postConstant.GET_SHOWING_POSTS,
                            page: response.data
                        }))
                    });
            case 'price-ascending':
                return postService.getPosts(pageNo, 'price')
                    .then((response) => {
                        return (dispatch({
                            type: postConstant.GET_SHOWING_POSTS,
                            page: response.data
                        }))
                    });
            case 'acreage-ascending':
                return postService.getPosts(pageNo, 'acreage')
                    .then((response) => {
                        return (dispatch({
                            type: postConstant.GET_SHOWING_POSTS,
                            page: response.data
                        }))
                    });
            default:
                return;
        }

    }
}

const getTypePosts = () => {
    return (dispatch) => {
        return postService.getTypePosts()
            .then((response) => {
                return (dispatch({
                    type: postConstant.GET_TYPE_POSTS,
                    data: response.data
                }))
            })
    }
}

const getPostsBySearchCriteria = (searchCriteria, pageNo, sort) => {

    let preUrl = `auth/posts/search`;
    let page = ``;
    // eslint-disable-next-line default-case
    switch (sort) {
        case 'new-post':
            page = `&pageNo=${pageNo}&pageSize=10&sort=approvedDate`;
            break;
        case 'price-ascending':
            page = `&pageNo=${pageNo}&pageSize=10&sort=price`;
            break
        case 'acreage-ascending':
            page = `&pageNo=${pageNo}&pageSize=10&sort=acreage`;
            break
    }
    let bodyUrl = '?';
    searchCriteria.map((item) => {
        if (item.status) {
            bodyUrl !== '' ? bodyUrl = `${bodyUrl}${item.type}=${item.data}&` : bodyUrl = `?${bodyUrl}${item.type}=${item.data}&`;
            return item;
        }
        return [];
    });
    return (dispatch) => {
        console.log(`${preUrl}${bodyUrl}${page}`)
        return postService.searchPostByCriteria(`${preUrl}${bodyUrl}${page}`)
            .then((response) => {
                return dispatch({
                    type: postConstant.GET_SHOWING_POSTS,
                    page: response.data
                })
            })
    }
}

const getAllPostsWaiting = () => {
    return (dispatch) => {
        return postService.getAllWaitingPosts()
            .then((response) => {
                return (dispatch({
                    type: postConstant.GET_WAITING_POSTS,
                    page: response.data
                }))
            })
    }
}

const getPostWaitingDetailById = (id) => {
    return (dispatch) => {
        return postService.getDetailPostWaitingById(id)
            .then((response) => {
                return (dispatch({
                    type: postConstant.GET_POST_DETAIL_ADMIN,
                    data: response.data
                }))
            })
    }
}

const updateStatusPost = (id, status) => {
    return (dispatch) => {
        return postService.updateStatusPost(id, status)
            .then((response) => {
                let alertData;
                if (response.data) {
                    alertData = {
                        type: alertConstant.SUCCESS,
                        message: "Duyệt bài thành công",
                        success: response.data
                    }
                }
                else {
                    alertData = {
                        type: alertConstant.SUCCESS,
                        message: "Từ chối thành công",
                        success: response.data
                    }
                }
                return (dispatch(alertAction.success(alertData)))
            })
            .catch((error) => {
                const alertData = {
                    type: alertConstant.ERROR,
                    message: error.data.message,
                    success: error.success
                }
                return (dispatch(alertAction.success(alertData)))
            })
    }
}

const getPostDetailById = (id) => {
    return (dispatch) => {
        return postService.getPostDetailById(id)
            .then((response) => {
                return (dispatch({
                    type: postConstant.GET_POST_DETAIL,
                    data: response.data
                }))
            })
    }
}


export const postAction = {
    addPostRequest,
    getAllPosts,
    getRejectPosts,
    getWaitingPosts,
    getPostsShowing,
    getTypePosts,
    getPostsBySearchCriteria,
    getAllPostsWaiting,
    getPostWaitingDetailById,
    getPostDetailById,
    updateStatusPost
}