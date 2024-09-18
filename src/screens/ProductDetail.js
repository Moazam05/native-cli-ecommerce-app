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
} from '../assets/images';
import Header from '../components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  selectWishlistProducts,
  setWishListProducts,
} from '../redux/wishlist/wishlistsSlice';
import useTypedSelector from '../hooks/useTypedSelector';
import {
  selectedProducts,
  incrementProductQuantity,
  decrementProductQuantity,
  setCartProducts,
} from '../redux/products/productsSlice';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const {item} = route.params;

  const wishListProducts = useTypedSelector(selectWishlistProducts);
  const cartProducts = useTypedSelector(selectedProducts);

  const [isFavorited, setIsFavorited] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [productQuantity, setProductQuantity] = useState(0);

  useEffect(() => {
    const isProductInWishlist = wishListProducts.some(
      product => product.id === item.id,
    );
    setIsFavorited(isProductInWishlist);
  }, [item.id, wishListProducts]);

  useEffect(() => {
    const productInCart = cartProducts.find(product => product.id === item.id);
    if (productInCart) {
      setIsInCart(true);
      setProductQuantity(productInCart.quantity);
    } else {
      setIsInCart(false);
      setProductQuantity(0);
    }
  }, [cartProducts, item.id]);

  const toggleFavorite = () => {
    setIsFavorited(prev => !prev);
    dispatch(setWishListProducts(item));
  };

  const addToCartHandler = () => {
    dispatch(setCartProducts(item));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={Back}
        rightIcon={CartIcon}
        title="Product Details"
        leftClick={() => navigation.goBack()}
      />
      <ScrollView>
        {/* Product Image */}
        <View style={styles.imageWrapper}>
          <Image source={{uri: item.image}} style={styles.productImage} />
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>{item.title}</Text>
            {/* Wishlist/Favorite Icon */}
            <TouchableOpacity onPress={toggleFavorite}>
              <Image
                source={isFavorited ? WishlistFill : WishlistIcon}
                style={styles.wishlistIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>

          <Text style={styles.productDescription}>{item.description}</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                source={Star}
                style={[
                  styles.starIcon,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    tintColor:
                      i < Math.floor(item.rating.rate) ? '#FFD700' : '#ddd',
                  },
                ]}
              />
            ))}
            <Text style={styles.ratingText}>({item.rating.count} reviews)</Text>
          </View>

          {/* Add to Cart / Quantity Buttons */}
          {isInCart ? (
            <View style={styles.cartActionsContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => dispatch(decrementProductQuantity(item.id))}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.cartQuantity}>{productQuantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => dispatch(incrementProductQuantity(item.id))}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={addToCartHandler}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageWrapper: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  infoContainer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  wishlistIcon: {
    width: 24,
    height: 24,
    tintColor: '#0786DAFD',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0786DAFD',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  addToCartButton: {
    backgroundColor: '#0786DAFD',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartActionsContainer: {
    marginTop: 20,
    width: '100%',
    borderColor: '#0786DAFD',
    borderWidth: 1,
    // borderRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#0786DAFD',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    width: 80,
    textAlign: 'center',
  },
  cartQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
  },
});
