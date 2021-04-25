import React, {FC} from 'react';
import {TextInput, AppRegistry, StyleSheet} from 'react-native';

interface IProps {}

const Input: FC<IProps> = (props) => {
    return (
        <TextInput style={styles.default} />
    )
}

const styles = StyleSheet.create({
    default: {}
});

AppRegistry.registerComponent('input', () => Input);

export default Input;