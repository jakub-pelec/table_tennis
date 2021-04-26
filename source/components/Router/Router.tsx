import React, { FC } from 'react';
import { AppRegistry } from 'react-native';
import { Route, NativeRouter, Switch } from 'react-router-native';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

interface IProps { };

const Router: FC<IProps> = () => {
    return (
        <NativeRouter>
            <Switch>
                <Route path='/' exact component={LoginPage} />
                <Route path='/register' exact component={RegisterPage} />
            </Switch>
        </NativeRouter>
    )
};

AppRegistry.registerComponent('router', () => Router);

export default Router;