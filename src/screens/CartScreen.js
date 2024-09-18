import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Header} from 'react-native/Libraries/NewAppScreen';
import {CartIcon, MenuIcon} from '../assets/images';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        leftIcon={MenuIcon}
        rightIcon={CartIcon}
        title="Grocery App"
        leftClick={() => {
          navigation.openDrawer();
        }}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
