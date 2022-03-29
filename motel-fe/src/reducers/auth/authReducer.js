import userConstant from "../../constants/userConstant";

let user = JSON.parse(localStorage.getItem('tokenUser'));
const initialState = user ? { loggedIn: true, user} : {};

const authReducer=(state=initialState, action)=>{
    switch(action.type){
        case userConstant.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user:action.user
            };
        case userConstant.LOGOUT:
            return {
                loggedIn:false
            }
        case userConstant.LOGIN_FAILURE:
            return {
                loggedIn:false,
                message:action.message
            }
        default:
            return state;
    }

}

export default authReducer;