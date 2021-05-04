import React, { FC } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import {connect} from 'react-redux';
import icons from '@assets/export';
import Button from '@shared/styled-components/Button/Button';
import Text from '@shared/styled-components/Text/export';
import { RouteComponentProps } from 'react-router';
import {createAccount} from '@actions/actions';
import { useForm } from 'react-hook-form';
import {registerSchema} from '@schemas/schemas';
import {yupResolver} from '@hookform/resolvers/yup';
import Layout from '@shared/styled-components/Layout/Layout';
import FormInput from '@shared/form-components/FormInput/FormInput';
import { ROUTES } from '@constants/routes';
import { DIMENSIONS } from '@constants/deviceValues';
import { ReactNativeFirebase } from '@react-native-firebase/app';

interface IProps extends RouteComponentProps {
    createAccount: (s: any) => void
}

interface IFormState {
    email: string,
    password: string,
    username: string,
    rePassword: string
}

const RegisterPage: FC<IProps> = (props) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = (data: IFormState) => {
        const {email, password, username} = data;
        const callback = () => props.history.push(ROUTES.DASHBOARD);
        const errorCallback = (error: ReactNativeFirebase.NativeFirebaseError) => Alert.alert(error.message); 
        props.createAccount({email, password, username, callback, errorCallback});
    }

    const returnToLoginPage = () => {
        return props.history.push(ROUTES.LOGIN);
    }
    return (
            <ScrollView contentContainerStyle={styles.contentContainerStyle}
                style={styles.scrollViewStyle}>
                <Layout>
                    <View style={[styles.flexCentered, styles.inputContainer]}>
                        <View style={styles.gobackButton}>
                            <Button variant={'secondary'} onPress={returnToLoginPage}><Text.Paragraph text={"go back"} /></Button>
                        </View>
                        <FormInput control={control} inputContainerStyle={styles.inputContainer} name='username' errorMessage={errors && errors.username && errors.username.message} placeholder='Username' />
                        <FormInput control={control} inputContainerStyle={styles.inputContainer} name='email' errorMessage={errors && errors.email && errors.email.message} placeholder='Email' />
                        <FormInput control={control} inputContainerStyle={styles.inputContainer} name='password' errorMessage={errors && errors.password && errors.password.message} placeholder='Password' innerProps={{secureTextEntry: true}} />
                        <FormInput control={control} inputContainerStyle={styles.inputContainer} name='rePassword' errorMessage={errors && errors.rePassword && errors.rePassword.message} placeholder='Confirm password' innerProps={{secureTextEntry: true}} />
                        <View style={[styles.flexCentered, styles.signInButtonContainer]}>
                            <Button variant={'primary'} onPress={handleSubmit(onSubmit)}><Text.Button variant={'primary'} text={"register"} /></Button>
                        </View>
                        <Button variant={'secondary'} onPress={() => console.log("facebook clicked")}><Text.Paragraph text={"sign in with facebook"} /><Image style={styles.signIcons} source={icons.facebook_icon} /></Button>
                        <Button variant={'secondary'} onPress={() => console.log("google clicked")}><Text.Paragraph text={"sign in with google"} /><Image style={styles.signIcons} source={icons.google_icon} /></Button>
                    </View>
                </Layout>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    gobackButton: {
        width: '25%'
    },
    contentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: DIMENSIONS.nativeHeight - 50,
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
        width: '100%'
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
