import React, { FC } from 'react';
import { AppRegistry, StyleSheet, Text, TextProps } from 'react-native';

interface IProps {
    text: string,
    variant: 'default' | 'homepage'
};

const Header: FC<IProps & TextProps> = (props) => {
    return <Text {...props} style={[styles.default, styles[props.variant]]}>{props.text}</Text>
}

const styles = StyleSheet.create({
    default: {
        fontSize: 24,
        fontFamily: 'Baloo2-Bold',
        color: '#4D375D'
    },
    homepage: {
        fontSize: 36,

    }
});

AppRegistry.registerComponent('header', () => Header);

export default Header;