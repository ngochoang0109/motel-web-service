import { ERROR, SUCCESS } from "../constants/ActionType"

const success=(message)=>{
    return{
        type:SUCCESS,
        message:message
    }
}

const error=(message)=>{
    return{
        type:ERROR,
        message:message
    }
}

export const alertAction={
    success:success,
    error:error
};