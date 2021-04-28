import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import icons from '../../assets/export'

interface IProps {
}

const Sidebar: FC<IProps> = () => {
    return (
        <View style={styles.default}>
            <Image source={icons.google_icon} />
            <Image source={icons.google_icon} />
            <Image source={icons.google_icon} />
            <Image source={icons.google_icon} />
            <Image source={icons.google_icon} />
            <Image source={icons.google_icon} />
        </View>
    )
}

const styles = StyleSheet.create({
    default: {
        width: '17.5%',
        backgroundColor: 'rgba(203,203,202,0.5)',
        height: '100%',
        marginRight: '2.5%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    }
})

export default Sidebar;
