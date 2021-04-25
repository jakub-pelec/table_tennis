import React, { FC } from 'react';
import { TextInput, AppRegistry, StyleSheet, TextInputProps } from 'react-native';

interface IProps { }

const Input: FC<IProps & TextInputProps> = (props) => {
    return (
        <TextInput {...props} style={props.style} />
    )
}

const styles = StyleSheet.create({
    default: {
        // width: '50%',
        // height: '50%',
        backgroundColor: 'red',
    }
});

AppRegistry.registerComponent('input', () => Input);

export default Input;