import React, { FC } from 'react';
import { AppRegistry, StyleSheet, Text, TextProps } from 'react-native';

interface IProps {
    variant: 'primary' | 'secondary' | 'homepage',
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
        fontSize: 30,
    },
    secondary: {},
    homepage: {
        fontSize: 30,
        fontFamily: 'Baloo2-Bold',
        color: 'black',
        textAlign: 'left',
        maxWidth: '75%'
    },
});

AppRegistry.registerComponent('button-text', () => Button);

export default Button;