import React, { FC } from 'react';
import { Image, StyleSheet, View, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import Button from '../../shared/styled-components/Button/Button';
import Input from '../../shared/styled-components/Input/Input';
import Text from '../../shared/styled-components/Text/export';
import icons from '../../assets/export';


interface IProps {};

const LoginPage: FC<IProps> = () => {
    return (
        <>
            <Image style={styles.backgroundStyle} source={icons.background} />
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingViewStyle}
                behavior='height'
            >
                <ScrollView centerContent style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                }}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: Dimensions.get('window').height - 50,
                    }}
                >
                    <Image source={icons.logo} />
                    <Input placeholder={"Username"} />
                    <Input placeholder={"Password"} secureTextEntry />
                    <View style={styles.checkboxContainer}>
                        <Text.Paragraph text={"keep me logged in"}></Text.Paragraph>
                        <CheckBox style={styles.signIcons}></CheckBox>
                    </View>
                    <View style={styles.ButtonsContainer}>
                        <View style={styles.signInButtonContainer}>
                            <Button variant={'primary'} onPress={() => console.log("sign in clicked")}><Text.Button variant={'primary'} text={"sign in"} /></Button>
                        </View>
                        <Button variant={'secondary'} onPress={() => console.log("register clicked")}><Text.Header text={"register"} /></Button>
                        <Button variant={'secondary'} onPress={() => console.log("facebook clicked")}><Text.Paragraph text={"sign in with facebook"} /><Image style={styles.signIcons} source={icons.facebook_icon} /></Button>
                        <Button variant={'secondary'} onPress={() => console.log("google clicked")}><Text.Paragraph text={"sign in with google"} /><Image style={styles.signIcons} source={icons.google_icon} /></Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    signIcons: {
        position: 'absolute',
        right: 0,
    },
    ButtonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
    },
    backgroundStyle: {
        position: 'absolute',
        zIndex: 0,
    },
    keyboardAvoidingViewStyle: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    checkboxContainer: {
        display: 'flex',
        width: '75%',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        marginTop: '10%',
        marginBottom: '10%',
    },
    signInButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        marginBottom: '10%',
    }
});

export default LoginPage
