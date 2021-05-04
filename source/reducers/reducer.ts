import { combineReducers } from 'redux';
import authReducer from './authReducer';
import fetchReducer from './fetchReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    auth: authReducer,
    fetch: fetchReducer,
    users: usersReducer
})