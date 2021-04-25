import React, { FC } from 'react';
import { View, AppRegistry } from 'react-native';
import Text from './source/shared/styled-components/Text/export';
import Button from './source/shared/styled-components/Button/Button';
import Input from './source/shared/styled-components/Input/Input';
import LoginPage from './source/components/LoginPage/LoginPage';

interface IProps { };

const App: FC<IProps> = (props) => {
  return (
    <View>
      <LoginPage />
      <Text.Header text={'Hello world!'} />
    </View>
  )
}

AppRegistry.registerComponent('app', () => App);

export default App;