import {combineReducers} from 'redux';
import alertReducer from './alertReducer';
import registerReducer from './auth/registerReducer';

const rootReducer=combineReducers({
    alertReducer
})

export default rootReducer;