import {SIGN_IN, SIGN_OUT} from '@actions/types';
import { ActionWithPayload } from '@typings/redux';

export const INITIAL_STATE = {
    isAuthenticated: false,
    id: ''
}

export default (state = INITIAL_STATE, action: ActionWithPayload<any>): typeof INITIAL_STATE => {
    switch(action.type) {
        case SIGN_IN:
            return {...state, isAuthenticated: true, id: action.payload};
        case SIGN_OUT:
            return INITIAL_STATE;
        default:
            return state;
    } 
}

