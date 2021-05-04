import { FETCH_USERS, KEEP_UNSUBSCRIPTION_USERS, UNSUBSCRIBE_USERS } from '@actions/types';
import { ActionWithPayload } from '@typings/redux';

interface UserDocument {
    username: string,
    rating: number,
    id: string
}


export const INITIAL_STATE = {
    allUsers: [] as UserDocument[],
    unsubscribe: ''
}

export default (state = INITIAL_STATE, action: ActionWithPayload<any>): typeof INITIAL_STATE => {
    switch(action.type) {
        case FETCH_USERS:
            return {...state, allUsers: action.payload};
        case KEEP_UNSUBSCRIPTION_USERS:
            return {...state, unsubscribe: action.payload};
        case UNSUBSCRIBE_USERS:
            return INITIAL_STATE;
        default:
            return state;
    } 
}
