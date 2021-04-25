import React, { FC } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IProps {
    children: JSX.Element
};

const Button: FC<IProps & TouchableOpacityProps> = (props) => {
    return <TouchableOpacity {...props} style={styles.default}>{props.children}</TouchableOpacity>
}

const styles = StyleSheet.create({
    default: {}
});

AppRegistry.registerComponent('button', () => Button);

export default Button;