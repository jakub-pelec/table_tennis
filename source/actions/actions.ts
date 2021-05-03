import {auth, firestore} from '@env/firebaseConfig';
import firebase from 'firebase';
import {Dispatch} from 'redux';
import { SIGN_IN, SUBSCRIBE } from './types';
import axios from 'axios';
import { createApiUrl } from '../utils/createApiUrl';
import { API_PATH } from '@constants/apiPaths';
import { COLLECTIONS } from '@constants/collections';

interface IHandlers {
    callback: (s?: any) => void,
    errorCallback: (s: firebase.FirebaseError) => void
}
interface ICreateAccountParams extends IHandlers {
    email: string,
    password: string,
    username: string,
}

interface ISignInParams extends IHandlers{
    email: string,
    password: string,
}

interface ISubscribeUserData {
    id: string,
    dispatch: Dispatch
}

export const createAccount = ({email, password, username, callback, errorCallback}: ICreateAccountParams) => async(dispatch: Dispatch) => {
    try {
        const response = await axios.post(createApiUrl(API_PATH.createAccount), {email, password, username});
        if(response.status === 200) {
            const firestoreID = response.data.firestoreID;
            dispatch({type: SIGN_IN, payload: firestoreID});
            subscribeUserData({id: firestoreID, dispatch});
            callback();
        }
    } catch(e) {
        errorCallback(e);
    }
}

export const signIn = ({email, password, callback, errorCallback}: ISignInParams) => async(dispatch: Dispatch) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        const token = await auth.currentUser?.getIdTokenResult();
        const firestoreID = token?.claims.firestoreID;
        dispatch({type: SIGN_IN, payload: firestoreID});
        subscribeUserData({id: firestoreID, dispatch});
        callback();
    } catch(e) {
        errorCallback(e);
    }
};

const subscribeUserData = ({id, dispatch}: ISubscribeUserData) => {
    //TODO: Unsubscribe on logout to prevent unnecessary data fetch
    const unsubscribe = firestore.collection(COLLECTIONS.USERS).doc(id).onSnapshot(snapshot => {
        if(snapshot.exists) {
            const data = snapshot.data();
            dispatch({type: SUBSCRIBE, payload: data});
        }
    });
}