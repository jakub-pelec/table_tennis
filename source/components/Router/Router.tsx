import React, {FC} from 'react';
import { AppRegistry } from 'react-native';
import {Route, NativeRouter, Switch} from 'react-router-native';
import LoginPage from '../LoginPage/LoginPage';

interface IProps {};

const Router: FC<IProps> = () => {
    return(
        <NativeRouter>
            <Switch>
                <Route path='/' exact component={LoginPage} />
            </Switch>
        </NativeRouter>
    )
};

AppRegistry.registerComponent('router', () => Router);

export default Router;