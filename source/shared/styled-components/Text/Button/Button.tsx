import React, { FC } from 'react';
import { AppRegistry, StyleSheet, Text, TextProps } from 'react-native';

interface IProps {
    variant: 'primary' | 'secondary',
    text: string
};

const Button: FC<IProps & TextProps> = (props) => {
    return <Text style={[styles.default, styles[props.variant]]}>{props.text}</Text>
};

const styles = StyleSheet.create({
    default: {
        fontSize: 12,
        color: '#4D375D'
    },
    primary: {
        color: 'white',
        fontFamily: 'Baloo2-Bold',
        fontSize: 24,
    },
    secondary: {

    },
});

AppRegistry.registerComponent('button-text', () => Button);

export default Button;