
import { postService } from "../service/postService";
import { provinceAPI } from "../utils/provinceAPI";

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
    console.log(postRequest,imageRequest.images,videoRequest.videos)
    return (dispatch)=>{
        return postService.createPost(postRequest,imageRequest.images,videoRequest.videos)
                    .then((response)=>{
                        console.log(response.data)
                    })
                    .catch((error)=>{

                    });
    }
}

export const postAction={
    addPostRequest
}