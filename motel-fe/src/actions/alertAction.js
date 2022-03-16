import * as alertConstant from "../constants/alertConstant";

const success=(message)=>{
    return{
        type:alertConstant.SUCCESS,
        message:message
    }
}

const error=(message)=>{
    return{
        type:alertConstant.ERROR,
        message:message
    }
}

export {success,error}
