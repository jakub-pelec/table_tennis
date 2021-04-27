import React, { FC, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import {connect} from 'react-redux';
import Input from '../../shared/styled-components/Input/Input';
import icons from '../../assets/export';
import Button from '../../shared/styled-components/Button/Button';
import Text from '../../shared/styled-components/Text/export';
import { RouteComponentProps } from 'react-router';
import {createAccount} from '../../actions/actions';

interface IProps extends RouteComponentProps {
    createAccount: (s: any) => void
}
interface IFormState {
    email: string,
    password: string,
    username: string,
    rePassword: string
}

type Field = 'email' | 'password' | 'rePassword' | 'username';

const RegisterPage: FC<IProps> = (props) => {
    const [data, setData] = useState<IFormState>({
        email: '',
        username: '',
        password: '',
        rePassword: ''
    });

    const handleFieldChange = (type: Field, text: string) => {
        return setData({...data, [type]: text});
    }

    const validate = (state: IFormState) => {
        // TODO: Validate form fields
        const {password, rePassword, email, username} = state;
        if(password && rePassword && email && username) {
            if(password === rePassword) {
                return true;
            }
            return false;
        }
        return false;
    }

    const handleSubmit = () => {
        // TODO: Handle backend rejection and failed validation
        if(validate(data)) {
            const callback = () => props.history.push('/dashboard');
            const {email, password, username} = data;
            return props.createAccount({email, password, username, callback});
        }
    }

    const returnToLoginPage = () => {
        return props.history.push('/');
    }
    return (
        <>
            <Image style={styles.backgroundStyle} source={icons.background} />
            <ScrollView contentContainerStyle={styles.contentContainerStyle}
                style={styles.scrollViewStyle}>
                <View style={[styles.flexCentered, styles.inputContainer]}>
                    <View style={styles.gobackButton}>
                        <Button variant={'secondary'} onPress={returnToLoginPage}><Text.Paragraph text={"go back"} /></Button>
                    </View>
                    <Input placeholder={"username"} onChangeText={(text) => handleFieldChange('username', text)} />
                    <Input placeholder={"e-mail"} onChangeText={(text) => handleFieldChange('email', text)} />
                    <Input secureTextEntry placeholder={"password"} onChangeText={(text) => handleFieldChange('password', text)} />
                    <Input secureTextEntry placeholder={"repeat password"} onChangeText={(text) => handleFieldChange('rePassword', text)} />
                    <View style={[styles.flexCentered, styles.signInButtonContainer]}>
                        <Button variant={'primary'} onPress={handleSubmit}><Text.Button variant={'primary'} text={"register"} /></Button>
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

export default connect(null, {createAccount})(RegisterPage)
