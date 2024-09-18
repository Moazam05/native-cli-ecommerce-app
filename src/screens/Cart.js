import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {
  Back,
  CartIcon,
  DeleteIcon,
  PlusIcon,
  MinusIcon,
} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import useTypedSelector from '../hooks/useTypedSelector';
import {
  selectedProducts,
  removeProduct,
  incrementProductQuantity,
  decrementProductQuantity,
} from '../redux/products/productsSlice';
import {useDispatch} from 'react-redux';

const {width} = Dimensions.get('window');

const Cart = () => {
  const navigation = useNavigation();
  const cartProducts = useTypedSelector(selectedProducts);
  const dispatch = useDispatch();

  const handleRemoveProduct = id => {
    // Dispatch action to remove product
    dispatch(removeProduct(id));
  };

  const handleIncrement = id => {
    // Dispatch action to increment product quantity
    dispatch(incrementProductQuantity(id));
  };

  const handleDecrement = id => {
    // Dispatch action to decrement product quantity
    dispatch(decrementProductQuantity(id));
  };

  const calculateTotal = () => {
    return cartProducts
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={Back}
        rightIcon={CartIcon}
        title="Your Shopping Cart"
        leftClick={() => navigation.goBack()}
      />
      <FlatList
        data={cartProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.productContainer}>
            <Image source={{uri: item.image}} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => handleDecrement(item.id)}
                  style={styles.adjustButton}>
                  <Image source={MinusIcon} style={styles.adjustIcon} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleIncrement(item.id)}
                  style={styles.adjustButton}>
                  <Image source={PlusIcon} style={styles.adjustIcon} />
                </TouchableOpacity>
              </View>
              <Text style={styles.productPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveProduct(item.id)}
              style={styles.deleteButton}>
              <Image source={DeleteIcon} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.productList}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={() => {
            /* Place order logic */
          }}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productList: {
    padding: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  adjustButton: {
    backgroundColor: '#0786DAFD',
    padding: 5,
    borderRadius: 5,
  },
  adjustIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0786DAFD',
  },
  deleteButton: {
    padding: 10,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: '#FF0000',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  placeOrderButton: {
    backgroundColor: '#0786DAFD',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
