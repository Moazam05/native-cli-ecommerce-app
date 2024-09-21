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

const Checkout = () => {
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
              onPress={() => dispatch(decrementProductQuantity(item.id))}>
              <Text style={styles.cartActionText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.cartQuantity}>{item.quantity}</Text>

            <TouchableOpacity
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
      {/* Header outside FlatList */}
      <Header
        leftIcon={Back}
        rightIcon={CartIcon}
        title="Checkout"
        leftClick={() => navigation.goBack()}
      />

      {/* FlatList to handle scrolling of products */}
      <FlatList
        data={cartProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty</Text>
        }
        ListFooterComponent={
          /* Payment details section after product list */
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentTitle}>Payment Details</Text>
            <View style={styles.paymentDetails}>
              <Text style={styles.totalLabel}>Sub Total:</Text>
              <Text style={styles.totalAmount}>${calculateTotal()}</Text>
            </View>
            <View style={styles.discountWrap}>
              <Text style={styles.discountLabel}>Discount:</Text>
              <Text style={styles.discountAmount}>$0.00</Text>
            </View>
            <View style={styles.paymentDetails}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>${calculateTotal()}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={() => {}}>
              <Text style={styles.checkoutText}>Pay & Order</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Checkout;

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
  cartActionText: {
    fontSize: 18,
    color: '#0786DAFD',
    fontWeight: 'bold',
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
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  cartQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 10,
    width: 30,
  },
  deleteIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginTop: 10,
  },
  paymentContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  discountWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 10,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  discountLabel: {
    fontSize: 14,
    color: '#666',
  },
  discountAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#0786DAFD',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
