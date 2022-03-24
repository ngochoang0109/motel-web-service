import * as alertConstant from "../constants/alertConstant";

const success=(data)=>{
    return{
        type:alertConstant.SUCCESS,
        message:data.message,
        success:data.success
    }
}

const error=(data)=>{
    return{
        type:alertConstant.ERROR,
        message:data.message,
        success:data.success
    }
}

export {success,error}
