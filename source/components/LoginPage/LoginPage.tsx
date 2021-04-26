import React, { FC } from 'react';
import { CheckBox, Image, StyleSheet, View, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import Button from '../../shared/styled-components/Button/Button';
import Input from '../../shared/styled-components/Input/Input';
import Text from '../../shared/styled-components/Text/export';
import icons from '../../assets/export';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface IProps {

};

const LoginPage: FC<IProps> = () => {
    return (
        <>
            <Image style={styles.backgroundStyle} source={icons.background} />
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%'
                }}
                behavior='height'
            >
                <Input placeholder={"Username"} />
                <Input placeholder={"Password"} secureTextEntry />
                <CheckBox></CheckBox>
                <Button onPress={() => console.log("sign in clicked")}><Text.Paragraph text={"sign in"} /></Button>
                <View style={styles.ButtonsContainer}>
                    <Button onPress={() => console.log("register clicked")}><Text.Paragraph text={"register"} /></Button>
                    <Button onPress={() => console.log("facebook clicked")}><Text.Paragraph text={"sign in with facebook"} /><Image style={styles.signIcons} source={icons.facebook_icon} /></Button>
                    <Button onPress={() => console.log("google clicked")}><Text.Paragraph text={"sign in with google"} /><Image style={styles.signIcons} source={icons.google_icon} /></Button>
                </View>
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
        // position: 'absolute',
        // bottom: '10%',
        width: '75%',
    },
    backgroundStyle: {
        position: 'absolute',
        zIndex: 0,
    },
    firstLoginView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: '#F8F1F1',
    }
});

export default LoginPage
