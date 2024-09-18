import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {Back, CartIcon} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import useTypedSelector from '../hooks/useTypedSelector';
import {selectedProducts} from '../redux/products/productsSlice';

const Cart = () => {
  const navigation = useNavigation();
  const cartProducts = useTypedSelector(selectedProducts);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={Back}
        rightIcon={CartIcon}
        title="Your Shopping Cart"
        leftClick={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

export default Cart;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
};
