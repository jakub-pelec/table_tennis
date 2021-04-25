import React, { FC } from 'react';
import {AppRegistry, StyleSheet, Text} from 'react-native';

interface IProps {
    text: string
};

const Button: FC<IProps> = ({text}) => {
    return <Text style={styles.default}>{text}</Text>
};

const styles = StyleSheet.create({
    default: {
        fontSize: 12
    }
});

AppRegistry.registerComponent('button-text', () => Button);

export default Button;