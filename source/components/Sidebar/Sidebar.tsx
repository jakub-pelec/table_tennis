import Button from '@shared/styled-components/Button/Button';
import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import icons from '@assets/export';
import Text from '@shared/styled-components/Text/export';
import { logout } from '@actions/actions';
import { RouteComponentProps, withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import { ROUTES } from '@constants/routes';

interface IProps extends RouteComponentProps {
    logout: (s: any) => void
}

const Sidebar: FC<IProps> = (props) => {

    const handleLogout = () => {
        const callback = () => props.history.push(ROUTES.LOGIN);
        const errorCallback = (e: any) => console.log(e);
        props.logout({ callback, errorCallback });
    }

    return (
        <View style={styles.default}>
            <Image source={icons.google_icon} />
            <Image source={icons.google_icon} />
            <Image source={icons.google_icon} />
            <Image source={icons.google_icon} />
            <Image source={icons.google_icon} />
            <Button variant='secondary' onPress={() => handleLogout()}><Text.Paragraph text='log out' /></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    default: {
        width: '17.5%',
        backgroundColor: 'rgba(227,226,225,0.5)',
        position: 'absolute',
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

export default withRouter(connect(null, { logout })(Sidebar));