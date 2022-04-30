import postConstant from './../constants/postConstant';
import { postService } from "../service/postService";
import { provinceAPI } from "../utils/provinceAPI";
import * as alertAction from './alertAction';
import * as alertConstant from './../constants/alertConstant';

const addPostRequest = (postState, imageRequest, videoRequest) => {

    console.log(postState)

    const { title, brief, content, phone } = postState;

    const province = provinceAPI.getProvinceByCode(postState.provinceCode);
    const district = provinceAPI.getDistrictByCode(postState.districtCode);
    const ward = provinceAPI.getWardByCode(postState.wardCode);
    const address = `${postState.streetAndNumOfHouse}/${ward.name}/${district.name}/${province.name}`;

    const { acreage, airConditioner, internet, parking,
        price, deposit, tower, floor, bedroom, 
        toilet, heater, fridge, furniture,
        xCoordinate, yCoordinate } = postState;

    const getType = () => {
        switch (postState.type) {
            case postConstant.NHA_NGUYEN_CAN_TYPE:
                return 1;
            case postConstant.PHONG_TRO_TYPE:
                return 2;
            case postConstant.CAN_HO_TYPE:
                return 3;
            default:
                return 1;
        }
    }

    const post = {
        title,
        brief,
        content,
        phone,
        type: getType()
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
        x:parseFloat(xCoordinate.toFixed(8)),
        y:parseFloat(yCoordinate.toFixed(8)),
    }

    const postRequest = {
        post,
        accommodation,
    }

    console.log(postRequest);

    return (dispatch) => {
        return postService.createPost(postRequest,imageRequest.images,videoRequest.videos)
                    .then((response)=>{
                        const alertData = {
                            type: alertConstant.SUCCESS,
                            message: "Tạo tin thành công",
                            success: true
                        }
                        dispatch(alertAction.success(alertData));
                        return (dispatch({
                            type: postConstant.ADD_POST,
                            post:response.data
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
            .catch();
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
        return postService.getWaitingPosts()
            .then((response) => {
                return (dispatch({
                    type: postConstant.GET_WAITING_POSTS,
                    page: response.data
                }))
            })
            .catch()
    }
}

const getPostsShowing = () => {
    return (dispatch) => {
        return postService.getPosts()
            .then((response) => {
                return (dispatch({
                    type: postConstant.GET_SHOWING_POSTS,
                    page: response.data
                }))
            })
            .catch()
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

const getPostsBySearchCriteria = (searchCriteria) => {

    console.log(searchCriteria)

    let preUrl = `auth/posts/search`;
    let page = `&pageNo=0&pageSize=10&sort=createAt`;
    let bodyUrl = '?';
    searchCriteria.map((item) => {
        if (item.status) {
            bodyUrl !== '' ? bodyUrl = `${bodyUrl}${item.type}=${item.data}&` : bodyUrl = `?${bodyUrl}${item.type}=${item.data}&`;
            return item;
        }
        return [];
    });
    return (dispatch) => {
        return postService.searchPostByCriteria(`${preUrl}${bodyUrl}${page}`)
            .then((response) => {
                console.log(response.data);
                return dispatch({
                    type: postConstant.GET_SHOWING_POSTS,
                    page: response.data
                })
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
    getPostsBySearchCriteria
}