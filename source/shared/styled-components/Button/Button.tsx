import React, { FC } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IProps {
    children: JSX.Element | JSX.Element[]
};

const Button: FC<IProps & TouchableOpacityProps> = (props) => {
    return <TouchableOpacity {...props} style={styles.default}>{props.children}</TouchableOpacity>
}

const styles = StyleSheet.create({
    default: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: '#f6f6f6',
        width: '100%',
        height: 51
    }
});

AppRegistry.registerComponent('button', () => Button);

export default Button;