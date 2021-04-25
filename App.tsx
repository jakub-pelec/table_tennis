import React, { FC } from 'react';
import { View, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import Text from './source/shared/styled-components/Text/export';
import LoginPage from './source/components/LoginPage/LoginPage';


interface IProps { };

const App: FC<IProps> = (props) => {
  return (
    <Provider store={store}>
      <View>
        <LoginPage />
        <Text.Header text={'Hello world!'} />
      </View>
    </Provider>
  )
}

AppRegistry.registerComponent('app', () => App);

export default App;