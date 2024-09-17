import React from 'react';
import AppNavigator from './src/AppNavigator';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

// Ignore specific warnings
LogBox.ignoreLogs(['ReactImageView: Image source "null" doesn\'t exist']);

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
