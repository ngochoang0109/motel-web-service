import userConstant from '../constants/userConstant';
import { userService } from '../service/userService';
import * as alertAction from './alertAction';
import * as alertConstant from './../constants/alertConstant';

function register(user) {
    return (dispatch) => {
        return userService.registerUser(user)
            .then((response) => {
                if (response.message === true)
                    return dispatch(alertAction.success(response));
                else
                    return dispatch(alertAction.error(response));
            })
    };
}

const login = (user) => {
    return (dispatch) => {
        return userService.loginUser(user)
            .then((response) => {
                localStorage.setItem('tokenUser', JSON.stringify(response.data));
                const alertData = {
                    type: alertConstant.SUCCESS,
                    message: "Đăng nhập thành công",
                    success: true
                }
                dispatch(alertAction.success(alertData));
                return dispatch({
                    type: userConstant.LOGIN_SUCCESS,
                    user: user
                });
            })
            .catch((error) => {
                console.log(error.response.status)
                return dispatch({
                    type: userConstant.LOGIN_FAILURE,
                    message: String(error.response.status)
                })
            })
    }
}

const logout = () => {
    return (dispatch) => {
        userService.logout();
        return dispatch({ type: userConstant.LOGOUT })
    };
}

export const userActions = {
    login,
    register,
    logout
};