import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Button from '../../shared/styled-components/Button/Button';
import Input from '../../shared/styled-components/Input/Input';
import Text from '../../shared/styled-components/Text/export';
import logo from '../../assets/logo.png';

interface IProps {

};

const LoginPage: FC<IProps> = () => {
    return (
        <View style={styles.firstLoginView}>
            <Image source={logo} />
            <Input />
            <Input />
        </View>
    )
}

const styles = StyleSheet.create({
    firstLoginView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    }
});

export default LoginPage
