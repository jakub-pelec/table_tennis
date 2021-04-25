import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../../shared/styled-components/Button/Button'
import Input from '../../shared/styled-components/Input/Input'
import Text from '../../shared/styled-components/Text/export';

interface IProps {

};

const LoginPage: FC<IProps> = () => {
    return (
        <View style={styles.firstLoginView}>
            <Text.Header style={styles.logo} text={"ping pong"} />
            <Input style={styles.firstLoginInput} />
            <Input style={styles.firstLoginInput} />
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        fontSize: 64,
    },
    firstLoginView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    firstLoginInput: {
        marginTop: 30,
        fontSize: 16,
        backgroundColor: 'red',
        width: '75%',
        height: 59,
        borderColor: '#F8EDEB',
        borderStyle: 'solid',
        borderRadius: 5,
    }
});

export default LoginPage
