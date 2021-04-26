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
        paddingLeft: '10%',
        marginTop: 30,
        fontSize: 16,
        width: '75%',
        height: 51,
        borderBottomWidth: 1,
        borderColor: '#000000',
        borderStyle: 'solid',
    }
});

AppRegistry.registerComponent('input', () => Input);

export default Input;