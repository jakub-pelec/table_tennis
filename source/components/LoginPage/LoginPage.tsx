import React, { FC } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import {
    Image,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Button from '@shared/styled-components/Button/Button';
import Text from '@shared/styled-components/Text/export';
import icons from '@assets/export';
import { signIn } from '@actions/actions';
import { RouteComponentProps } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@schemas/schemas';
import Layout from '@shared/styled-components/Layout/Layout';
import FormInput from '@shared/formComponents/FormInput/FormInput';
import { ROUTES } from '@constants/routes';
import { DIMENSIONS } from '@constants/deviceValues';

interface IProps extends RouteComponentProps {
    signIn: (s: any) => void;
}

const LoginPage: FC<IProps> = props => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const redirectToRegisterPage = () => {
        return props.history.push(ROUTES.REGISTER);
    };

    const onSubmit = (data: any) => {
        const { email, password } = data;
        const callback = () => props.history.push(ROUTES.DASHBOARD);
        const errorCallback = (error: firebase.FirebaseError) => Alert.alert(error.message);
        props.signIn({ email, password, callback, errorCallback })
    }

    return (
        <>
            <Image style={styles.backgroundStyle} source={icons.background} />
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingViewStyle}
                behavior="height">
                <ScrollView
                    centerContent
                    style={styles.scrollViewStyle}
                    contentContainerStyle={styles.contentContainerStyle}>
                    <Layout>
                        <Image source={icons.logo} />
                        <FormInput control={control} inputContainerStyle={styles.inputContainer} name='email' errorMessage={errors && errors.email && errors.email.message} placeholder='Email' />
                        <FormInput control={control} inputContainerStyle={styles.inputContainer} name='password' errorMessage={errors && errors.password && errors.password.message} placeholder='Password' innerProps={{ secureTextEntry: true }} />
                        <View style={styles.checkboxContainer}>
                            <Text.Paragraph text={'keep me logged in'}></Text.Paragraph>
                            <CheckBox style={styles.signIcons}></CheckBox>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <View style={styles.signInButtonContainer}>
                                <Button variant={'primary'} onPress={handleSubmit(onSubmit)}>
                                    <Text.Button variant={'primary'} text={'sign in'} />
                                </Button>
                            </View>
                            <Button variant={'secondary'} onPress={redirectToRegisterPage}>
                                <Text.Header text={'register'} />
                            </Button>
                            <Button
                                variant={'secondary'}
                                onPress={() => console.log('facebook clicked')}>
                                <Text.Paragraph text={'sign in with facebook'} />
                                <Image style={styles.signIcons} source={icons.facebook_icon} />
                            </Button>
                            <Button
                                variant={'secondary'}
                                onPress={() => console.log('google clicked')}>
                                <Text.Paragraph text={'sign in with google'} />
                                <Image style={styles.signIcons} source={icons.google_icon} />
                            </Button>
                        </View>
                    </Layout>
                </ScrollView>
            </KeyboardAvoidingView>

        </>
    );
};

const styles = StyleSheet.create({
    contentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: DIMENSIONS.nativeHeight - 50,
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
    buttonsContainer: {
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
    },
    inputContainer: {
        width: '100%'
    }
});

export default connect(null, { signIn })(LoginPage);
