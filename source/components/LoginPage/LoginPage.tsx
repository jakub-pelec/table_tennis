import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, View, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import Button from '../../shared/styled-components/Button/Button';
import Input from '../../shared/styled-components/Input/Input';
import Text from '../../shared/styled-components/Text/export';
import icons from '../../assets/export';
import { signIn, createAccount } from '../../actions/actions';
import { RouteComponentProps } from 'react-router';
import { useForm } from 'react-hook-form';


interface IProps extends RouteComponentProps {
    signIn: (s: any) => void,
    createAccount: (s: any) => void
};

interface IFormState {
    email: string,
    password: string
}

type Field = 'email' | 'password';

const LoginPage: FC<IProps> = (props) => {
    const [data, setData] = useState<IFormState>({ email: '', password: '' });

    const handleFieldChange = (type: Field, value: string) => {
        return setData({ ...data, [type]: value });
    }

    const validate = (state: IFormState) => {
        /*
            TODO: Validate fields, acceptance criteria:
                    - email must be a valid email
        */
        const { email, password } = state;
        return email && password;
    }

    const handleSignIn = () => {
        /*
            TODO: Handle failed validation and backend rejection, acceptance criteria:
                - backend:
                    - wrong password
                    - non-existent email
                    - too many request (spam prevention)
                    - other (server issue)
                - validation:
                    - visual feedback for user
        */
        if (validate(data)) {
            const callback = () => props.history.push('/dashboard');
            return props.signIn({ ...data, callback });
        }
    }

    const redirectToRegisterPage = () => {
        return props.history.push('/register');
    }
    return (
        <>
            <Image style={styles.backgroundStyle} source={icons.background} />
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingViewStyle}
                behavior='height'
            >
                <ScrollView centerContent style={styles.scrollViewStyle}
                    contentContainerStyle={styles.contentContainerStyle}>
                    <View style={styles.mainContainer}>
                        <Image source={icons.logo} />
                        <Input placeholder={"Username"} onChangeText={(text) => handleFieldChange('email', text)} />
                        <Input placeholder={"Password"} secureTextEntry onChangeText={(text) => handleFieldChange('password', text)} />
                        <View style={styles.checkboxContainer}>
                            <Text.Paragraph text={"keep me logged in"}></Text.Paragraph>
                            <CheckBox style={styles.signIcons}></CheckBox>
                        </View>
                        <View style={styles.ButtonsContainer}>
                            <View style={styles.signInButtonContainer}>
                                <Button variant={'primary'} onPress={handleSignIn}><Text.Button variant={'primary'} text={"sign in"} /></Button>
                            </View>
                            <Button variant={'secondary'} onPress={redirectToRegisterPage}><Text.Header text={"register"} /></Button>
                            <Button variant={'secondary'} onPress={() => console.log("facebook clicked")}><Text.Paragraph text={"sign in with facebook"} /><Image style={styles.signIcons} source={icons.facebook_icon} /></Button>
                            <Button variant={'secondary'} onPress={() => console.log("google clicked")}><Text.Paragraph text={"sign in with google"} /><Image style={styles.signIcons} source={icons.google_icon} /></Button>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height - 50,
    },
    mainContainer: {
        width: '75%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    ButtonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
        width: '100%',
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

export default connect(null, { signIn, createAccount })(LoginPage);
