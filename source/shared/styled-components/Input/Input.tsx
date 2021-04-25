import React, { FC } from 'react';
import { TextInput, AppRegistry, StyleSheet, TextInputProps } from 'react-native';

interface IProps { }

const Input: FC<IProps & TextInputProps> = (props) => {
    return (
        <TextInput {...props} style={styles.default} />
    )
}

const styles = StyleSheet.create({
    default: {
        marginTop: 30,
        fontSize: 16,
        width: '75%',
        height: 59,
        borderWidth: 4,
        borderColor: '#F8EDEB',
        borderStyle: 'solid',
        borderRadius: 5,
    }
});

AppRegistry.registerComponent('input', () => Input);

export default Input;