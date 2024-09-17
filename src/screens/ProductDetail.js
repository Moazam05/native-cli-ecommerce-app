import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Back, Cart, WishlistFill, WishlistIcon} from '../assets/images';
import Header from '../components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract the product details from the route
  const {item} = route.params;

  // State to toggle favorite icon
  const [isFavorited, setIsFavorited] = useState(false);

  // Function to handle favorite icon toggle
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={Back}
        rightIcon={Cart}
        title="Product Details"
        leftClick={() => {
          navigation.goBack();
        }}
      />

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
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // Wrapping the image to add padding or margin
  imageWrapper: {
    backgroundColor: '#fff',
    padding: 20, // Adding padding around the image
    marginBottom: 10, // Spacing between the image and the details section
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  infoContainer: {
    padding: 20,
    borderTopLeftRadius: 20, // Adding a smooth radius on top corners
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
    tintColor: '#FF6F61',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F61',
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
    backgroundColor: '#FF6F61',
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
