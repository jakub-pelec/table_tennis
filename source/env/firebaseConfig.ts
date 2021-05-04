import NativeFirestore from '@react-native-firebase/firestore';
import NativeMessaging from '@react-native-firebase/messaging';
import NativeAuth from '@react-native-firebase/auth';

export const firestore = NativeFirestore();
export const auth = NativeAuth();
export const messaging = NativeMessaging();
