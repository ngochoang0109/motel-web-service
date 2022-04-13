import postConstant from './../constants/postConstant';
import { postService } from "../service/postService";
import { provinceAPI } from "../utils/provinceAPI";
import * as alertAction from './alertAction';
import * as alertConstant from './../constants/alertConstant';

const addPostRequest=(postState, imageRequest, videoRequest)=>{

    const coordinate=postState.xyCoordinate.split(",");
    const xCoordinate=coordinate[0];
    const yCoordinate=coordinate[1];
    const { title, brief, content, phone } = postState;

    const province= provinceAPI.getProvinceByCode(postState.provinceCode);
    const district=provinceAPI.getDistrictByCode(postState.districtCode);
    const ward= provinceAPI.getWardByCode(postState.wardCode);
    const address=`${postState.streetAndNumOfHouse}/${ward.name}/${district.name}/${province.name}`;

    const {acreage,airConditioner,electricPrice,internet,parking,price,waterPrice,deposit}=postState;
    
    const post={
        title,
        brief,
        content, 
        phone
    }

    const accommodation={
        acreage,
        address:address,
        airConditioner,
        electricPrice,
        internet,
        parking,
        price,
        waterPrice,
        deposit,
        xCoordinate:xCoordinate,
        yCoordinate:yCoordinate,
    }

    const postRequest={
        post,
        accommodation,
    }
    
    return (dispatch)=>{
        return postService.createPost(postRequest,imageRequest.images,videoRequest.videos)
                    .then((response)=>{
                        const alertData = {
                            type: alertConstant.SUCCESS,
                            message: "Tạo tin thành công",
                            success: true
                        }
                        dispatch(alertAction.success(alertData));
                        return (dispatch({
                            type: postConstant.ADD_PRODUCT,
                            post:response.data
                        }))
                    })
                    .catch((error)=>{

                    });
    }
}

const getAllPosts=()=>{
    return (dispatch)=>{
        return postService.getAll()
                .then((response)=>{
                    console.log(response.data);
                    return (dispatch({
                        type: postConstant.GET_POSTS,
                        page:response.data
                    }))
                })
                .catch();
    }
}

export const postAction={
    addPostRequest,
    getAllPosts
}