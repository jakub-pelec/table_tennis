import {SHOW_POPUP, HIDE_POPUP, CLEAR} from '@actions/types';
import { ActionWithPayload } from '@typings/redux';

const clearPopup = {
    open: false,
    title: '',
    body: '',
    payload: {}
}

export const INITIAL_STATE = {
    popup: clearPopup
}

export default (state = INITIAL_STATE, action: ActionWithPayload<any>): typeof INITIAL_STATE => {
    switch(action.type) {
        case SHOW_POPUP:
            return {...state, popup: action.payload};
        case HIDE_POPUP:
            return {...state, popup: clearPopup};
        case CLEAR:
            return INITIAL_STATE;
        default:
            return state;
    } 
}

