import React, { FC } from 'react';
import {AppRegistry, StyleSheet, Text} from 'react-native';

interface IProps {
    text: string
};

const Header: FC<IProps> = ({text}) => {
    return <Text style={styles.default}>{text}</Text>
}

const styles = StyleSheet.create({
    default: {
        fontSize: 12
    }
});

AppRegistry.registerComponent('header', () => Header);

export default Header;