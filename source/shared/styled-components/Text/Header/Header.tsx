import React, { FC } from 'react';
import { AppRegistry, StyleSheet, Text, TextProps } from 'react-native';

interface IProps {
    text: string
};

const Header: FC<IProps & TextProps> = (props) => {
    return <Text {...props} style={styles.default}>{props.text}</Text>
}

const styles = StyleSheet.create({
    default: {
        fontSize: 24,
        fontFamily: 'Baloo2-Bold',
        color: '#4D375D'
    }
});

AppRegistry.registerComponent('header', () => Header);

export default Header;