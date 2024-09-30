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
        <Text style={styles.sectionTitle}>Order Payment Details</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Order Amounts</Text>
          <Text style={styles.detailValue}>
            Rs. {thousandSeparator(calculateTotal())}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Delivery Fee</Text>
          <Text style={styles.free}>Free</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Order Total</Text>
          <Text style={styles.detailValue}>
            Rs. {thousandSeparator(calculateTotal())}
          </Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#CACACA',
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
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    marginBottom: 25,
    marginTop: 35,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
  },
  line: {
    height: 1,
    backgroundColor: '#C6C6C6',
    marginVertical: 20,
  },
  free: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.PRIMARY,
  },
});
