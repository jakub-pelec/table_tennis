import React, { FC } from 'react';
import { AppRegistry } from 'react-native';
import { Route, NativeRouter, Switch } from 'react-router-native';
import { ROUTES } from '@constants/routes';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

interface IProps { };

const Router: FC<IProps> = () => {
    return (
        <NativeRouter>
            <Switch>
                <Route path={ROUTES.LOGIN} exact component={LoginPage} />
                <Route path={ROUTES.REGISTER} exact component={RegisterPage} />
            </Switch>
        </NativeRouter>
    )
};

AppRegistry.registerComponent('router', () => Router);

export default Router;