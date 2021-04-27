import React, { FC } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import Input from '../../shared/styled-components/Input/Input';
import icons from '../../assets/export';
import Button from '../../shared/styled-components/Button/Button';
import Text from '../../shared/styled-components/Text/export';
import { RouteComponentProps } from 'react-router';



interface IProps extends RouteComponentProps {
}

const RegisterPage: FC<IProps> = (props) => {
    return (
        <>
            <Image style={styles.backgroundStyle} source={icons.background} />
            <ScrollView contentContainerStyle={styles.contentContainerStyle}
                style={styles.scrollViewStyle}>
                <View style={[styles.flexCentered, styles.inputContainer]}>
                    <View style={styles.gobackButton}>
                        <Button variant={'secondary'} onPress={() => props.history.push("/")}><Text.Paragraph text={"go back"} /></Button>
                    </View>
                    <Input placeholder={"username"} />
                    <Input placeholder={"e-mail"} />
                    <Input secureTextEntry placeholder={"password"} />
                    <Input secureTextEntry placeholder={"repeat password"} />
                    <View style={[styles.flexCentered, styles.signInButtonContainer]}>
                        <Button variant={'primary'} onPress={() => console.log("register")}><Text.Button variant={'primary'} text={"register"} /></Button>
                    </View>
                    <Button variant={'secondary'} onPress={() => console.log("facebook clicked")}><Text.Paragraph text={"sign in with facebook"} /><Image style={styles.signIcons} source={icons.facebook_icon} /></Button>
                    <Button variant={'secondary'} onPress={() => console.log("google clicked")}><Text.Paragraph text={"sign in with google"} /><Image style={styles.signIcons} source={icons.google_icon} /></Button>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    gobackButton: {
        width: '25%'
    },
    contentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height - 50,
    },
    flexCentered: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    scrollViewStyle: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    signIcons: {
        position: 'absolute',
        right: 0,
    },
    inputContainer: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width * .75,
    },
    mainContainer: {
        width: '100%',
        height: '100%',
    },
    backgroundStyle: {
        position: 'absolute',
        zIndex: 0,
    },
    signInButtonContainer: {
        width: '75%',
        marginBottom: '10%',
        marginTop: '10%',
        marginLeft: '12.5%'
    }
})

export default RegisterPage
