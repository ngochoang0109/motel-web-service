import { combineReducers } from 'redux';
import userConstant from '../constants/userConstant';
import alertReducer from './alertReducer';
import authReducer from './auth/authReducer';
import postsReducer from './user/postsReducer';
import rejectPostsReducer from './user/rejectPostsReducer';
import waitingPostsReducer from './user/waitingPostsReducer';
import menuPostReducer from './user/menuPostReducer';

const appReducer = combineReducers({
    alertReducer,
    authReducer,
    postsReducer,
    rejectPostsReducer,
    waitingPostsReducer,
    // menuPostReducer
})

const rootReducer = (state, action) => {
    if (action.type === userConstant.LOGOUT) {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;