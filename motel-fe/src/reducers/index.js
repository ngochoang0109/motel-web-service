import { combineReducers } from 'redux';
import userConstant from '../constants/userConstant';
import alertReducer from './alertReducer';
import authReducer from './auth/authReducer';
import postsReducer from './postsReducer';

const appReducer = combineReducers({
    alertReducer,
    authReducer,
    postsReducer
})

const rootReducer = (state, action) => {
    if (action.type === userConstant.LOGOUT) {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;