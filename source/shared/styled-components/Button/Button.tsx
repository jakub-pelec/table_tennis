import React, { FC } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IProps {
    variant: 'primary' | 'secondary' | 'cancel',
    children: JSX.Element | JSX.Element[]
};

const Button: FC<IProps & TouchableOpacityProps> = (props) => {
    return <TouchableOpacity {...props} style={[styles.default, styles[props.variant]]}>{props.children}</TouchableOpacity>
}

const styles = StyleSheet.create({
    default: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    primary: {
        backgroundColor: '#C0E218',
        color: '#ffffff',
        borderRadius: 5,
    },
    secondary: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    cancel: {
        backgroundColor: 'red',
        borderRadius: 5,
    }
});

AppRegistry.registerComponent('button', () => Button);

export default Button;