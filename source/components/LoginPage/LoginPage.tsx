import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Button from '../../shared/styled-components/Button/Button';
import Input from '../../shared/styled-components/Input/Input';
import Text from '../../shared/styled-components/Text/export';
import icons from '../../assets/export';

interface IProps {

};

const LoginPage: FC<IProps> = () => {
    return (
        <View style={styles.firstLoginView}>
            <Image style={styles.logoStyle} source={icons.logo} />
            <Input placeholder={"Username"} />
            <Input placeholder={"Password"} secureTextEntry />
            <Button onPress={() => console.log("sign in clicked")}><Text.Paragraph text={"sign in"} /></Button>
            <View style={styles.ButtonsContainer}>
                <Button onPress={() => console.log("register clicked")}><Text.Paragraph text={"register"} /></Button>
                <Button onPress={() => console.log("facebook clicked")}><Text.Paragraph text={"sign in with facebook"} /><Image style={styles.signIcons} source={icons.facebook_icon} /></Button>
                <Button onPress={() => console.log("google clicked")}><Text.Paragraph text={"sign in with google"} /><Image style={styles.signIcons} source={icons.google_icon} /></Button>
            </View>
        </View>
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
    logoStyle: {
        position: 'absolute',
        top: '5%',
    },
    firstLoginView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#D8E2DC',
    }
});

export default LoginPage
