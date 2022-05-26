import { combineReducers } from 'redux';
import userConstant from '../constants/userConstant';
import alertReducer from './alertReducer';
import authReducer from './auth/authReducer';
import postsReducer from './user/postsReducer';
import rejectPostsReducer from './user/rejectPostsReducer';
import waitingPostsReducer from './waitingPostsReducer';
import menuPostReducer from './user/menuPostReducer';
import typePostsReducer from './typePostsReducer';
import userInfor from './user/userInfor';
import postAdmin from './admin/post';
import postUser from './user/postUser';
import relatedPosts from './relatedPosts';
import newLeastPosts from './newLeastPosts';

const appReducer = combineReducers({
    alertReducer,
    authReducer,
    postsReducer,
    rejectPostsReducer,
    waitingPostsReducer,
    menuPostReducer,
    typePostsReducer,
    userInfor,
    postAdmin,
    postUser,
    relatedPosts,
    newLeastPosts
})

const rootReducer = (state, action) => {
    if (action.type === userConstant.LOGOUT) {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;