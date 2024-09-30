import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Cash, leftArrow, MasterCard, PayPal, Visa} from '../../assets/images';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedProducts} from '../../redux/products/productsSlice';
import {thousandSeparator} from '../../utils';

const paymentMethods = [
  {
    id: 1,
    image: Visa,
    cardNo: '**** **** **** 1234',
  },
  {
    id: 2,
    image: MasterCard,
    cardNo: '**** **** **** 5678',
  },
  {
    id: 3,
    image: PayPal,
    cardNo: '**** **** **** 9012',
  },
  {
    id: 4,
    image: Cash,
    cardNo: 'Cash on Delivery',
  },
];

const Payment = () => {
  const navigation = useNavigation();
  const cartProducts = useTypedSelector(selectedProducts);

  const [selectPayment, setSelectPayment] = useState(4);

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
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.h}>H</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.totalWrap}>
        <View style={styles.wrap}>
          <Text style={styles.subTotal}>Sub Total</Text>
          <Text style={styles.subPrice}>
            Rs {thousandSeparator(calculateTotal())}
          </Text>
        </View>
        <View style={styles.wrap}>
          <Text style={styles.subTotal}>Shipping</Text>
          <Text style={styles.subPrice}>Free</Text>
        </View>

        <View style={styles.wrap}>
          <Text style={styles.total}> Total</Text>
          <Text style={styles.price}>
            Rs {thousandSeparator(calculateTotal())}
          </Text>
        </View>

        <View style={styles.lineTwo} />
      </View>

      <View>
        <Text style={styles.paymentTitle}>Payment Methods</Text>
        <View style={styles.pWrap}>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentWrap,
                selectPayment === method.id && styles.activeBorder,
              ]}
              onPress={() => {
                setSelectPayment(method.id);
              }}>
              <Image source={method.image} style={styles.payment} />
              <Text style={styles.cardNo}>{method.cardNo}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payment;

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
  line: {
    height: 1,
    backgroundColor: '#C6C6C6',
    marginTop: 6,
    marginBottom: 6,
  },
  totalWrap: {
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  subTotal: {
    color: '#A8A8A9',
    fontSize: 18,
    fontFamily: Fonts.MEDIUM,
  },
  subPrice: {
    color: '#A8A8A9',
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
  },
  total: {
    fontSize: 18,
    fontFamily: Fonts.MEDIUM,
    color: '#4C5059',
  },
  price: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
  },
  lineTwo: {
    height: 1,
    backgroundColor: '#C6C6C6',
  },
  payment: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  paymentWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    marginBottom: 15,
    marginTop: 10,
  },
  paymentTitle: {
    fontSize: 18,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    paddingHorizontal: 28,
    paddingTop: 16,
  },
  cardNo: {
    fontSize: 15,
    fontFamily: Fonts.MEDIUM,
    color: '#6E7179',
  },
  pWrap: {
    marginTop: 10,
    paddingHorizontal: 28,
  },

  activeBorder: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
});
