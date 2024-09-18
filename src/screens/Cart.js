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
import useTypedSelector from '../hooks/useTypedSelector';
import {
  selectedProducts,
  removeProduct,
  incrementProductQuantity,
  decrementProductQuantity,
} from '../redux/products/productsSlice';
import {useDispatch} from 'react-redux';
import Header from '../components/Header';
import {Back, CartIcon, DeleteIcon} from '../assets/images';

const Cart = () => {
  const navigation = useNavigation();
  const cartProducts = useTypedSelector(selectedProducts);
  const dispatch = useDispatch();

  const handleRemoveProduct = id => {
    dispatch(removeProduct(id));
  };

  const calculateTotal = () => {
    return cartProducts
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  const renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <View style={styles.productMeta}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </View>

        <View style={styles.productActions}>
          <View style={styles.cartActionsContainer}>
            <TouchableOpacity
              style={styles.decrementButton}
              onPress={() => dispatch(decrementProductQuantity(item.id))}>
              <Text style={styles.cartActionText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.cartQuantity}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.incrementButton}
              onPress={() => dispatch(incrementProductQuantity(item.id))}>
              <Text style={[styles.cartActionText, styles.textAlignRight]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleRemoveProduct(item.id)}>
            <Image style={styles.deleteIcon} source={DeleteIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
        renderItem={renderItem}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty</Text>
        }
      />
      {/* <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => {}}>
          <Text style={styles.checkoutText}>Place Order</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  productList: {
    padding: 15,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  productImage: {
    width: 60,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0786DAFD',
  },
  cartActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 70,
    borderColor: '#0786DAFD',
    marginTop: 10,
    borderBottomWidth: 1,
  },
  decrementButton: {
    backgroundColor: 'white',
    borderColor: '#0786DAFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  incrementButton: {
    backgroundColor: 'white',
    borderColor: '#0786DAFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartActionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0786DAFD',
  },
  cartQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 10,
    width: 30,
  },

  quantityButton: {
    backgroundColor: '#fff',
    borderColor: '#0786DAFD',
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#0786DAFD',
  },

  deleteIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginTop: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: '#0786DAFD',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },

  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
