import {AUTH_STATE} from '../reducers/auth';
import { FETCH_STATE } from '../reducers/fetch';
import {Action} from 'redux';

export interface APP_STATE {
    auth: AUTH_STATE,
    fetch: FETCH_STATE
}

export interface ActionWithPayload<T> extends Action {
    payload: T;
} 
