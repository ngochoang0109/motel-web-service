import {combineReducers} from 'redux';
import budgetReducer from './budgetReducer';

const rootReducer=combineReducers(budgetReducer)

export default rootReducer;