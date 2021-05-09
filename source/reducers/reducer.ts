import { combineReducers } from 'redux';
import authReducer from './authReducer';
import fetchReducer from './fetchReducer';
import usersReducer from './usersReducer';
import uiReducer from './uiReducer';

export default combineReducers({
    auth: authReducer,
    fetch: fetchReducer,
    users: usersReducer,
    ui: uiReducer
})