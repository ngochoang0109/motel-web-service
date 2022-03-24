import {combineReducers} from 'redux';
import alertReducer from './alertReducer';
import authReducer from './auth/authReducer';

const rootReducer=combineReducers({
    alertReducer,
    authReducer
})

export default rootReducer;