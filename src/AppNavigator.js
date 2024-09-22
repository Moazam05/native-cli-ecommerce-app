import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setUser, selectedUser} from './redux/auth/authSlice'; // Assuming you have setUser action
import Main from './screens/Main';
import ProductDetail from './screens/Products/ProductDetail';
import Cart from './screens/Cart/Cart';
import Login from './screens/Authentication/Login';
import Signup from './screens/Authentication/Signup';
import Checkout from './screens/Cart/Checkout';
import AddressList from './screens/Address/AddressList';
import CreateAddress from './screens/Address/CreateAddress';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Welcome from './screens/Welcome/Welcome';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const loginUser = useSelector(selectedUser);

  useEffect(() => {
    // Fetch user from AsyncStorage on app load
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          dispatch(setUser(JSON.parse(user)));
        }
      } catch (error) {
        console.error('Error retrieving user from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  // Show loading screen while checking AsyncStorage
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0786DAFD" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loginUser ? (
          <>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="AddressList"
              component={AddressList}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="CreateAddress"
              component={CreateAddress}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
