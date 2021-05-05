import React, { FC } from 'react';
import { TextInput, AppRegistry, StyleSheet, TextInputProps, View } from 'react-native';
import Text from '../Text/export';

interface IProps {
    error?: string
}

const Input: FC<IProps & TextInputProps> = (props) => {
    return (
        <View>
            <TextInput {...props} style={[styles.default, props.error ? styles.error : {}]} />
            {props.error && <View style={styles.errorContainer}><Text.Error text={props.error} /></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    errorContainer: {
        position: 'absolute',
        bottom: '-25%',
        right: 0
    },
    default: {
        paddingLeft: '10%',
        fontSize: 16,
        width: '100%',
        height: 51,
        borderBottomWidth: 1,
        borderColor: '#000000',
        borderStyle: 'solid',
        color: 'black'
    },
    error: {
        borderColor: 'red',
        color: 'red'
    }
});

AppRegistry.registerComponent('input', () => Input);

export default Input;