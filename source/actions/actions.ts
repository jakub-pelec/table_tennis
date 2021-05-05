import {auth, firestore, messaging} from '@env/firebaseConfig';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import NativeMessaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import {Dispatch} from 'redux';
import { FETCH_USERS, KEEP_UNSUBSCRIPTION, KEEP_UNSUBSCRIPTION_USERS, SIGN_IN, SIGN_OUT, SUBSCRIBE, UNSUBSCRIBE, UNSUBSCRIBE_USERS } from './types';
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

interface UserDocument {
    username: string,
    rating: number,
    id: string
}

interface ISubscribeUsers {
    dispatch: Dispatch,
    id: string
}

type IPostLoginAction = ISubscribeUsers & ISubscribeUserData;

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
            postLoginAction({id: firestoreID, dispatch});
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
        postLoginAction({id: firestoreID, dispatch});
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

const subscribeUsers = ({id: ownId, dispatch}: ISubscribeUsers) => {
    try {
        const unsubscribe = firestore.collection(COLLECTIONS.USERS).onSnapshot((snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
            const data: UserDocument[] = [];
            snapshot.docs.forEach((doc: FirebaseFirestoreTypes.DocumentSnapshot) => {
                const docData: any = doc.data();
                const {username, rating} = docData;
                const id = doc.id;
                if(id !== ownId) {
                    data.push({username, rating, id});
                }
            })
            dispatch({type: FETCH_USERS, payload: data});
        });
        dispatch({type: KEEP_UNSUBSCRIPTION_USERS, payload: unsubscribe.toString()});
    } catch(e) {
        //TODO: handle error
        console.log(e);
    }
}

const postLoginAction = ({id, dispatch}: IPostLoginAction) => {
    subscribeUserData({id, dispatch});
    subscribeUsers({id, dispatch});
    dispatch({type: SIGN_IN, payload: id});
}

export const logout = ({callback, errorCallback}: IHandlers) => async(dispatch: Dispatch, getState: () => APP_STATE) => {
    try {
        const {unsubscribe: fetchMethodString} = getState().fetch;
        const {unsubscribe: usersMethodString} = getState().users;
        const unsubscribeFetch = new Function(fetchMethodString);
        const unsubscribeUsers = new Function(usersMethodString);
        await AsyncStorage.clear();
        unsubscribeFetch();
        unsubscribeUsers();
        dispatch({type: UNSUBSCRIBE});
        dispatch({type: UNSUBSCRIBE_USERS});
        dispatch({type: SIGN_OUT});
        await auth.signOut();
        callback();
    } catch(e) {
        errorCallback(e);
    }
}