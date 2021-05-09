import {SUBSCRIBE, UNSUBSCRIBE, KEEP_UNSUBSCRIPTION, FETCH_LIVE_GAMES} from '@actions/types';
import { ActionWithPayload } from '@typings/redux';
import {LiveGameDocument} from './fetch';

const initialTitles: string[] = [];
const initialLiveGames: LiveGameDocument[] = [];

export const INITIAL_STATE = {
    username: '',
    wins: 0,
    loses: 0,
    titles: initialTitles,
    duringGame: false,
    rating: 0,
    unsubscribe: '',
    liveGames: initialLiveGames
}

export default (state = INITIAL_STATE, action: ActionWithPayload<any>): typeof INITIAL_STATE => {
    switch(action.type) {
        case SUBSCRIBE:
            return {...state, ...action.payload};
        case KEEP_UNSUBSCRIPTION:
            return {...state, unsubscribe: action.payload};
        case FETCH_LIVE_GAMES:
            return {...state, liveGames: action.payload};
        case UNSUBSCRIBE:
            return INITIAL_STATE;
        default:
            return state;
    } 
}

