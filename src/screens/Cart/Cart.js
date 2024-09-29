import React, {useEffect, useState} from 'react';
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
  AddTwoIcon,
  Back,
  CartIcon,
  DeleteIcon,
  EditTwoIcon,
  leftArrow,
  LocationIcon,
  NavigationIcon,
} from '../../assets/images';
import {Fonts} from '../../constants/fonts';
import {Colors} from '../../constants/colors';
import {selectAddress} from '../../redux/address/addressSlice';
import RatingStar from '../../components/RatingStar';

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartProducts = useTypedSelector(selectedProducts);
  const addressList = useTypedSelector(selectAddress);

  const [address, setAddress] = useState('');

  useEffect(() => {
    if (addressList.length) {
      const defaultAddress = addressList.find(add => add.isDefault);
      setAddress(defaultAddress || {});
    }
  }, [addressList]);

  console.log('addressList', addressList);
  console.log('address', address);

  const handleRemoveProduct = id => {
    dispatch(removeProduct(id));
  };

  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.productContainer}>
          <View style={styles.prWrap}>
            <View style={styles.innerWrapTwo}>
              {/* take 30% */}
              <Image source={item?.image} style={styles.productImage} />
              {/* Take 70% */}
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <View style={styles.variantWrap}>
                  <Text style={styles.variantTitle}>Variations:</Text>
                  <Text style={styles.variantValue}>Black</Text>
                </View>

                <View style={styles.ratingWrap}>
                  <Text style={styles.rating}>{item.rating}</Text>

                  <RatingStar rating={item?.rating} size={12} />
                </View>

                <View style={styles.priceWrap}>
                  <Text style={styles.productPrice}>${item.price}</Text>
                  <View>
                    <Text style={styles.off}>upto 50% off</Text>
                    <Text style={styles.offPrice}>400</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.lineTwo]} />
            <View style={styles.orderWrap}>
              <Text style={styles.totalOr}>Total Orders</Text>
              <Text style={styles.totalOrderPrice}>300</Text>
            </View>
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

      <View style={styles.addressWrap}>
        <View style={styles.addAddress}>
          <View style={styles.innerWrap}>
            <Text style={styles.tagTitle}>Address:</Text>
            <Image source={EditTwoIcon} style={styles.editIcon} />
          </View>

          <Text style={styles.tagTitleTwo}>MM Alam Road Lahore</Text>
          <View style={styles.contactWrap}>
            <Text style={styles.tagTitleTwo}>Contact:</Text>
            <Text style={styles.tagTitleTwo}>+992 123 4567</Text>
          </View>
        </View>

        <View style={styles.addressTwo}>
          <Image source={AddTwoIcon} style={styles.addIcon} />
        </View>
      </View>

      <View style={styles.shoppingWrap}>
        <Text style={styles.shoppingTitle}>Shopping List</Text>
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
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  addressWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 15,
  },
  addAddress: {
    width: '77%',
    backgroundColor: Colors.WHITE,
    borderRadius: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    height: 75,
  },
  innerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  editIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    top: -3,
  },
  addressTwo: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    height: 75,
  },
  addIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  tagTitle: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    marginBottom: 6,
  },
  tagTitleTwo: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
  },
  contactWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  shoppingWrap: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
  },
  shoppingTitle: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
  },

  productContainer: {
    paddingHorizontal: 16,
  },
  prWrap: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 12,
  },
  innerWrapTwo: {
    flexDirection: 'row',
  },
  productImage: {
    width: 125,
    height: 125,
    borderRadius: 10,
  },
  productDetails: {
    marginLeft: 12,
  },
  productTitle: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    marginTop: 6,
  },
  variantWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  variantTitle: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
  },
  variantValue: {
    fontSize: 10,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#0E0808',
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  priceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 15,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    borderWidth: 1,
    borderColor: '#CACACA',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },

  off: {
    fontSize: 10,
    fontFamily: Fonts.MEDIUM,
    color: '#EB3030',
  },
  offPrice: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: '#A7A7A7',
    textDecorationLine: 'line-through',
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  rating: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
  },

  lineTwo: {
    height: 1,
    backgroundColor: '#C6C6C6',
    marginVertical: 12,
  },
  orderWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalOr: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
  },
  totalOrderPrice: {
    fontSize: 12,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
  },
});
