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
import {Back, Cart, WishlistFill, WishlistIcon} from '../assets/images';
import Header from '../components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  selectWishlistProducts,
  setWishListProducts,
} from '../redux/wishlist/wishlistsSlice';
import useTypedSelector from '../hooks/useTypedSelector';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const wishListProducts = useTypedSelector(selectWishlistProducts);
  const {item} = route.params;

  console.log('wishListProducts', wishListProducts);

  // State to toggle favorite icon
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const isProductInWishlist = wishListProducts.some(
      product => product.id === item.id,
    );
    console.log('isProductInWishlist', isProductInWishlist);
    setIsFavorited(isProductInWishlist);
  }, [item.id, wishListProducts]);

  const toggleFavorite = () => {
    setIsFavorited(prev => !prev);
    dispatch(setWishListProducts(item));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={Back}
        rightIcon={Cart}
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
                source={require('../assets/images/star.png')} // Assuming star.png is your star icon
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

          {/* Add to Cart Button */}
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
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
});
