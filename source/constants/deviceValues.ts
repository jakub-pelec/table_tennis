import { Dimensions, Platform } from "react-native";

export const DIMENSIONS = {
    nativeWidth: Dimensions.get('window').width,
    nativeHeight: Dimensions.get('window').height,
    nativeFontScale: Dimensions.get('window').fontScale,
    nativeScale: Dimensions.get('window').scale
}

export const OS = Platform.OS;