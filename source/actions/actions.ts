import {auth, firestore, messaging} from '@env/firebaseConfig';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import NativeMessaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import {Dispatch} from 'redux';
import { KEEP_UNSUBSCRIPTION, SIGN_IN, SIGN_OUT, SUBSCRIBE, UNSUBSCRIBE } from './types';
import axios from 'axios';
import { createApiUrl } from '../utils/createApiUrl';
import { API_PATH } from '@constants/apiPaths';
import { COLLECTIONS } from '@constants/collections';
import { Alert } from 'react-native';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { APP_STATE } from '@typings/redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IHandlers {
    callback: (s?: any) => void,
    errorCallback: (s: ReactNativeFirebase.NativeFirebaseError) => void
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

export const createForegroundMessagesHandler = async() => {
    const unsubscribe = await messaging.onMessage(async(remoteMessage: FirebaseMessagingTypes.RemoteMessage): Promise<any> => {
        Alert.alert(JSON.stringify(remoteMessage));
    });
    return unsubscribe;
}

const subscribeUserData = ({id, dispatch}: ISubscribeUserData) => {
    const unsubscribe = firestore.collection(COLLECTIONS.USERS).doc(id).onSnapshot((snapshot: any) => {
        if(snapshot.exists) {
            const data = snapshot.data();
            dispatch({type: SUBSCRIBE, payload: data});
        }
        dispatch({type: KEEP_UNSUBSCRIPTION, payload: unsubscribe.toString()});
    });
}

export const logout = ({callback, errorCallback}: IHandlers) => async(dispatch: Dispatch, getState: () => APP_STATE) => {
    try {
        const {unsubscribe: methodString} = getState().fetch;
        await auth.signOut();
        const unsubscribe = new Function(methodString);
        await AsyncStorage.clear();
        unsubscribe();
        dispatch({type: UNSUBSCRIBE});
        dispatch({type: SIGN_OUT});
        callback();
    } catch(e) {
        errorCallback(e);
    }
}