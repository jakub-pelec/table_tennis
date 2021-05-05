import { AUTH_STATE } from '@reducers/auth';
import { FETCH_STATE } from '@reducers/fetch';
import { USERS_STATE } from '@reducers/users';
import {Action} from 'redux';

export interface APP_STATE {
    auth: AUTH_STATE,
    fetch: FETCH_STATE,
    users: USERS_STATE
}

export interface ActionWithPayload<T> extends Action {
    payload: T;
} 
