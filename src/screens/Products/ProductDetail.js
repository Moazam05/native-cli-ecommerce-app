import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Back,
  CartIcon,
  Star,
  WishlistFill,
  WishlistIcon,
} from '../../assets/images';
import Header from '../../components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  selectWishlistProducts,
  setWishListProducts,
} from '../../redux/wishlist/wishlistsSlice';
import useTypedSelector from '../../hooks/useTypedSelector';
import {
  selectedProducts,
  incrementProductQuantity,
  decrementProductQuantity,
  setCartProducts,
} from '../../redux/products/productsSlice';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const {item} = route.params;

  console.log('item', item);

  const wishListProducts = useTypedSelector(selectWishlistProducts);
  const cartProducts = useTypedSelector(selectedProducts);

  const [isFavorited, setIsFavorited] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [productQuantity, setProductQuantity] = useState(0);

  // useEffect(() => {
  //   const isProductInWishlist = wishListProducts.some(
  //     product => product.id === item.id,
  //   );
  //   setIsFavorited(isProductInWishlist);
  // }, [item.id, wishListProducts]);

  // useEffect(() => {
  //   const productInCart = cartProducts.find(product => product.id === item.id);
  //   if (productInCart) {
  //     setIsInCart(true);
  //     setProductQuantity(productInCart.quantity);
  //   } else {
  //     setIsInCart(false);
  //     setProductQuantity(0);
  //   }
  // }, [cartProducts, item.id]);

  const toggleFavorite = () => {
    setIsFavorited(prev => !prev);
    dispatch(setWishListProducts(item));
  };

  const addToCartHandler = () => {
    dispatch(setCartProducts(item));
  };

  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BG,
  },
});
