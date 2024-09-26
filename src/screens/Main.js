import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './Home/HomeScreen';

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default Main;
