import {Action} from 'redux';
import {SIGN_IN, SIGN_OUT} from '../actions/types';

export const INITIAL_STATE = {
    isAuthenticated: false
}

export default (state = INITIAL_STATE, action: Action): typeof INITIAL_STATE => {
    switch(action.type) {
        case SIGN_IN:
            return {...state, isAuthenticated: true};
        case SIGN_OUT:
            return {...state, isAuthenticated: false};
        default:
            return state;
    } 
}

