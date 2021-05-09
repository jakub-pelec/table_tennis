import { auth, firestore, messaging } from '@env/firebaseConfig';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import NativeMessaging, {
    FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { Dispatch } from 'redux';
import {
    FETCH_USERS,
    KEEP_UNSUBSCRIPTION,
    KEEP_UNSUBSCRIPTION_USERS,
    SHOW_POPUP,
    SIGN_IN,
    SIGN_OUT,
    SUBSCRIBE,
    UNSUBSCRIBE,
    UNSUBSCRIBE_USERS,
    FETCH_LIVE_GAMES
} from './types';
import axios from 'axios';
import { createApiUrl } from '../utils/createApiUrl';
import { API_PATH } from '@constants/apiPaths';
import { COLLECTIONS } from '@constants/collections';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { APP_STATE } from '@typings/redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROUTES } from '@constants/routes';
import { LiveGameDocument } from '@reducers/fetch';

interface IHandlers {
    callback: (s?: any) => void;
    errorCallback: (s: ReactNativeFirebase.NativeFirebaseError) => void;
}
interface ICreateAccountParams extends IHandlers {
    email: string;
    password: string;
    username: string;
}

interface ISignInParams extends IHandlers {
    email: string;
    password: string;
}

interface ISubscribeUserData {
    id: string;
    dispatch: Dispatch;
}

interface UserDocument {
    username: string;
    rating: number;
    id: string;
}

interface ISubscribeUsers {
    dispatch: Dispatch;
    id: string;
}

type IPostLoginAction = ISubscribeUsers & ISubscribeUserData;

interface IChallengeParams {
    from: string;
    to: string;
}

interface IAcceptChallengeParams {
    push: (s: string) => void,
    id: string
}

export const createAccount = ({
    email,
    password,
    username,
    callback,
    errorCallback,
}: ICreateAccountParams) => async (dispatch: Dispatch) => {
    try {
        const authStatus = await messaging.requestPermission();
        const authorized =
            authStatus &&
            authStatus === NativeMessaging.AuthorizationStatus.AUTHORIZED &&
            NativeMessaging.AuthorizationStatus.PROVISIONAL;
        let token: string = '';
        if (authorized) {
            token = await messaging.getToken();
        }
        const response = await axios.post(createApiUrl(API_PATH.createAccount), {
            email,
            password,
            username,
            token,
        });
        if (response.status === 200) {
            console.log(response.data);
            const firestoreID = response.data.firestoreID;
            postLoginAction({ id: firestoreID, dispatch });
            callback();
        }
    } catch (e) {
        errorCallback(e);
    }
};

export const signIn = ({
    email,
    password,
    callback,
    errorCallback,
}: ISignInParams) => async (dispatch: Dispatch) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        const token = await auth.currentUser?.getIdTokenResult();
        const firestoreID = token?.claims.firestoreID;
        postLoginAction({ id: firestoreID, dispatch });
        callback();
    } catch (e) {
        errorCallback(e);
    }
};

export const createForegroundMessagesHandler = () => async (
    dispatch: Dispatch,
) => {
    const unsubscribe = await messaging.onMessage(
        async (
            remoteMessage: FirebaseMessagingTypes.RemoteMessage,
        ): Promise<any> => {
            console.log(remoteMessage);
            dispatch({
                type: SHOW_POPUP,
                payload: {
                    open: true,
                    title: remoteMessage.notification?.title || '',
                    body: remoteMessage.notification?.body || '',
                    payload: { challengeID: remoteMessage.data?.challengeID || '' },
                },
            });
        },
    );
    return unsubscribe;
};

const subscribeUserData = ({ id, dispatch }: ISubscribeUserData) => {
    const unsubscribe = firestore
        .collection(COLLECTIONS.USERS)
        .doc(id)
        .onSnapshot((snapshot: any) => {
            if (snapshot.exists) {
                const data = snapshot.data();
                dispatch({ type: SUBSCRIBE, payload: data });
            }
            dispatch({ type: KEEP_UNSUBSCRIPTION, payload: unsubscribe.toString() });
        });
};

const subscribeUsers = ({ id: ownId, dispatch }: ISubscribeUsers) => {
    try {
        const unsubscribe = firestore
            .collection(COLLECTIONS.USERS)
            .onSnapshot((snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
                const data: UserDocument[] = [];
                snapshot.docs.forEach(
                    (doc: FirebaseFirestoreTypes.DocumentSnapshot) => {
                        const docData: any = doc.data();
                        const { username, rating } = docData;
                        const id = doc.id;
                        if (id !== ownId) {
                            data.push({ username, rating, id });
                        }
                    },
                );
                dispatch({ type: FETCH_USERS, payload: data });
            });
        dispatch({
            type: KEEP_UNSUBSCRIPTION_USERS,
            payload: unsubscribe.toString(),
        });
    } catch (e) {
        //TODO: handle error
        console.log(e);
    }
};

const subscribeLiveGames = ({ id: ownId, dispatch }: ISubscribeUsers) => {
    try {
        const unsubscribe = firestore
            .collection(COLLECTIONS.LIVE_GAMES)
            .where('to', '==', ownId)
            .onSnapshot((snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
                const data: LiveGameDocument[] = [];
                snapshot.docs.forEach(
                    (doc: FirebaseFirestoreTypes.DocumentSnapshot) => {
                        const docData = doc.data() as LiveGameDocument;
                        data.push(docData);
                    },
                );
                dispatch({ type: FETCH_LIVE_GAMES, payload: data });
            });
        // dispatch({
        //     type: KEEP_UNSUBSCRIPTION_USERS,
        //     payload: unsubscribe.toString(),
        // });
    } catch (e) {
        //TODO: handle error
        console.log(e);
    }
};

const postLoginAction = ({ id, dispatch }: IPostLoginAction) => {
    subscribeUserData({ id, dispatch });
    subscribeUsers({ id, dispatch });
    subscribeLiveGames({id, dispatch});
    dispatch({ type: SIGN_IN, payload: id });
};

export const logout = ({ callback, errorCallback }: IHandlers) => async (
    dispatch: Dispatch,
    getState: () => APP_STATE,
) => {
    try {
        const { unsubscribe: fetchMethodString } = getState().fetch;
        const { unsubscribe: usersMethodString } = getState().users;
        const unsubscribeFetch = new Function(fetchMethodString);
        const unsubscribeUsers = new Function(usersMethodString);
        await AsyncStorage.clear();
        unsubscribeFetch();
        unsubscribeUsers();
        dispatch({ type: UNSUBSCRIBE });
        dispatch({ type: UNSUBSCRIBE_USERS });
        dispatch({ type: SIGN_OUT });
        await auth.signOut();
        callback();
    } catch (e) {
        errorCallback(e);
    }
};

export const createChallenge = async ({ from, to }: IChallengeParams) => {
    try {
        const response = await axios.post(createApiUrl(API_PATH.createChallenge), {
            from,
            to,
        });
        if (response.status === 200) {
            console.log(`challenge created with id: ${response.data.challengeID}`);
        }
    } catch (e) {
        console.log(e);
    }
};

export const acceptChallenge = async({ push, id }: IAcceptChallengeParams) => {
    try {
        await axios.post(createApiUrl(API_PATH.acceptChallenge), {challengeID: id});
        return push(ROUTES.IN_GAME);
    } catch(e) {
        //TODO: handle error
        console.log(e);
    } 
}

export const rejectChallenge = async({ id }: {id: string}) => {
    try {
        return await axios.post(createApiUrl(API_PATH.rejectChallenge), {challengeID: id});
    } catch(e) {
        //TODO: handle error
        console.log(e);
    } 
}