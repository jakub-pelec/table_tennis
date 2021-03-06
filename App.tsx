import React, { FC } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import Router from './source/components/Router/Router';
import DashboardPage from './source/components/DashboardPage/DashboardPage';
import RegisterPage from '@components/RegisterPage/RegisterPage';


interface IProps { };

const App: FC<IProps> = (props) => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

AppRegistry.registerComponent('app', () => App);

export default App;