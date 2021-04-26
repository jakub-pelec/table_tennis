import React, { FC } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IProps {
    variant: 'primary' | 'secondary',
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
        height: 51
    },
    primary: {
        backgroundColor: '#C0E218',
        color: '#ffffff',
        borderRadius: 5,
    },
    secondary: {

    }
});

AppRegistry.registerComponent('button', () => Button);

export default Button;