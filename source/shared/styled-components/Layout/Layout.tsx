import React, {FC} from 'react';
import {AppRegistry, View, StyleSheet} from 'react-native';

interface IProps {};

const Layout: FC<IProps> = (props) => {
    return (
        <View style={styles.default}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    default: {
        width: '75%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('layout', () => Layout);

export default Layout;