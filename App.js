import React from 'react';
import AppNavigator from './src/AppNavigator';
import {LogBox} from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs(['ReactImageView: Image source "null" doesn\'t exist']);

const App = () => {
  return <AppNavigator />;
};

export default App;
