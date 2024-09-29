import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import useTypedSelector from '../../hooks/useTypedSelector';
import {
  selectedProducts,
  removeProduct,
  incrementProductQuantity,
  decrementProductQuantity,
} from '../../redux/products/productsSlice';
import {useDispatch} from 'react-redux';
import Header from '../../components/Header';
import {
  Back,
  CartIcon,
  DeleteIcon,
  leftArrow,
  LocationIcon,
  NavigationIcon,
} from '../../assets/images';
import {Fonts} from '../../constants/fonts';
import {Colors} from '../../constants/colors';

const Cart = () => {
  const navigation = useNavigation();
  const cartProducts = useTypedSelector(selectedProducts);
  const dispatch = useDispatch();

  const handleRemoveProduct = id => {
    dispatch(removeProduct(id));
  };

  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.productContainer}>
          <Image source={item?.image} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>{item?.name}</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Shopping Bag</Text>
        <Text style={styles.h}>H</Text>
      </View>

      <View style={styles.line} />

      <View style={styles.address}>
        <Image source={LocationIcon} style={styles.location} />
        <Text style={styles.addressTitle}>Delivery Address</Text>
      </View>

      {/* FlatList to handle scrolling of products */}
      <FlatList
        data={cartProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your shopping bag is empty</Text>
        }
        ListFooterComponent={
          /* Payment details section after product list */
          <View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {
                navigation.navigate('Checkout');
              }}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  location: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  addressTitle: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    marginLeft: 6,
  },
});
