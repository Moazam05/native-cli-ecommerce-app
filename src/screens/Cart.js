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
import {selectedProducts, removeProduct} from '../redux/products/productsSlice';
import {useDispatch} from 'react-redux';
import Header from '../components/Header';
import {Back, CartIcon, DeleteIcon} from '../assets/images';

const Cart = () => {
  const navigation = useNavigation();
  const cartProducts = useTypedSelector(selectedProducts);
  const dispatch = useDispatch();

  const handleRemoveProduct = id => {
    // Dispatch action to remove product
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
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveProduct(item.id)}
        style={styles.deleteButton}>
        <Image style={styles.deleteIcon} source={DeleteIcon} />
      </TouchableOpacity>
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
      {/* 
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => {}}>
          <Text style={styles.checkoutText}>Checkout</Text>
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
    height: 60,
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
  colorIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    marginRight: 10,
  },
  sizeText: {
    fontSize: 14,
    color: '#666',
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
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  deleteText: {
    color: '#0786DAFD',
    fontWeight: 'bold',
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
    // backgroundColor: '#ff6b6b',
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
});
