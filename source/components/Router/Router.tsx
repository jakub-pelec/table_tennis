import DashboardPage from '@components/DashboardPage/DashboardPage';
import { DIMENSIONS } from '@constants/deviceValues';
import React, { FC } from 'react';
import { AppRegistry, Image, StyleSheet } from 'react-native';
import { Route, NativeRouter, Switch } from 'react-router-native';
import { ROUTES } from '../../constants/routes';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import icons from '@assets/export';

interface IProps { };

const Router: FC<IProps> = () => {
    return (
        <>
            <Image style={styles.backgroundStyle} source={icons.background} />
            <NativeRouter>
                <Switch>
                    <Route path={ROUTES.LOGIN} exact component={LoginPage} />
                    <Route path={ROUTES.REGISTER} exact component={RegisterPage} />
                    <Route path={ROUTES.DASHBOARD} exact component={DashboardPage} />
                </Switch>
            </NativeRouter>
        </>
    )
};

const styles = StyleSheet.create({
    backgroundStyle: {
        position: 'absolute',
        zIndex: -1,
        width: DIMENSIONS.nativeWidth,
        height: DIMENSIONS.nativeHeight
    }
})

AppRegistry.registerComponent('router', () => Router);

export default Router;