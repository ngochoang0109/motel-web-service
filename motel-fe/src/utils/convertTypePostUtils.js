import postConstant from "../constants/postConstant";

const getType = (type) => {
    switch (type) {
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

const getNameOfType = (type) => {
    switch (type) {
        case 1:
            return postConstant.NHA_NGUYEN_CAN_TYPE;
        case 2:
            return postConstant.PHONG_TRO_TYPE;
        case 3:
            return postConstant.CAN_HO_TYPE;
        default:
            return postConstant.NHA_NGUYEN_CAN_TYPE;
    }
}




export const convertTypePostUtils={
    getType,
    getNameOfType
};