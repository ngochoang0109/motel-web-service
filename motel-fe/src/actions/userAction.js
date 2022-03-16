import { userService } from '../service/userService';
import * as alertAction from './alertAction';

function register(user) {
    return (dispatch) => {
        userService.registerUser(user)
            .then(response => { 
                    dispatch(alertAction.success(response.success));
                })
            .catch(error => {
                    dispatch(alertAction.error(error.success));
                });
    };
}
export const userActions = {
    register
};