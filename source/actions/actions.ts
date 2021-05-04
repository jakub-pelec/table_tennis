import {auth, firestore, messaging} from '@env/firebaseConfig';
import NativeMessaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import firebase from 'firebase';
import {Dispatch} from 'redux';
import { SIGN_IN, SUBSCRIBE } from './types';
import axios from 'axios';
import { createApiUrl } from '../utils/createApiUrl';
import { API_PATH } from '@constants/apiPaths';
import { COLLECTIONS } from '@constants/collections';
import { Alert } from 'react-native';

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
        const authStatus = await messaging.requestPermission();
        const authorized = authStatus && authStatus === NativeMessaging.AuthorizationStatus.AUTHORIZED && NativeMessaging.AuthorizationStatus.PROVISIONAL;
        let token: string = '';
        if(authorized) {
            token = await messaging.getToken();
        }
        const response = await axios.post(createApiUrl(API_PATH.createAccount), {email, password, username, token});
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

//TODO: Import and invoke in Dashboard (after login) and treat returned function as cleanup (useEffect)
export const createForegroundMessagesHandler = async() => {
    const unsubscribe = await messaging.onMessage(async(remoteMessage: FirebaseMessagingTypes.RemoteMessage): Promise<any> => {
        Alert.alert(JSON.stringify(remoteMessage));
    });
    return unsubscribe;
}

const subscribeUserData = ({id, dispatch}: ISubscribeUserData) => {
    //TODO: Unsubscribe on logout to prevent unnecessary data fetch
    const unsubscribe = firestore.collection(COLLECTIONS.USERS).doc(id).onSnapshot(snapshot => {
        if(snapshot.exists) {
            const data = snapshot.data();
            dispatch({type: SUBSCRIBE, payload: data});
        }
    });
}