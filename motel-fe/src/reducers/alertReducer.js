import * as alertConstant from '../constants/alertConstant';

const alert = (state = {
    type: '',
    message: '',
    success:false}, action) => {
    switch (action.type) {
        case alertConstant.SUCCESS:
            return {
                type: 'alert-success',
                message:action.message,
                success:action.success
            }
        case alertConstant.ERROR:
            return {
                type: 'alert-error',
                message:action.message,
                success:action.success
            }
        default:
            return state;
    }
}

export default alert;