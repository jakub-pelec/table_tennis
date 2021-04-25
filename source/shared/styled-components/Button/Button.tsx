import React, {FC} from 'react';
import {AppRegistry, StyleSheet, TouchableWithoutFeedback} from 'react-native';

interface IProps {
    children: JSX.Element
};

const Button: FC<IProps> = ({children}) => {
    return <TouchableWithoutFeedback style={styles.default}>{children}</TouchableWithoutFeedback>
}

const styles = StyleSheet.create({
    default: {}
});

AppRegistry.registerComponent('button', () => Button);

export default Button;