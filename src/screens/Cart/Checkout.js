import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {leftArrow} from '../../assets/images';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedProducts} from '../../redux/products/productsSlice';
import {thousandSeparator} from '../../utils';

const Checkout = () => {
  const navigation = useNavigation();
  const cartProducts = useTypedSelector(selectedProducts);

  const calculateTotal = () => {
    return cartProducts
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Home');
            }
          }}>
          <Image source={leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <Text style={styles.h}>H</Text>
      </View>

      <View style={styles.wrap}>
        <View>
          <Text>Order Payment Details</Text>

          <View>
            <Text>Order Amounts</Text>
            <Text> Rs. {thousandSeparator(calculateTotal())}</Text>
          </View>

          <View>
            <Text>Delivery Fee</Text>
            <Text> Free </Text>
          </View>
        </View>

        <View style={styles.line} />

        <View>
          <Text>Order Total</Text>
          <Text> Rs. {thousandSeparator(calculateTotal())}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BG,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backIcon: {
    width: 10,
    height: 19,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
  },
  h: {
    opacity: 0,
  },
  wrap: {
    paddingHorizontal: 16,
  },
});
