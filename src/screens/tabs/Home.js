import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {Cart, MenuIcon, Heart, Star} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
      });
  };

  const renderProduct = ({item}) => {
    return (
      <View style={styles.productItem}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.image}} style={styles.itemImage} />
          <TouchableOpacity style={styles.heartIconContainer}>
            <Image source={Heart} style={styles.heartIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

        <View style={styles.ratingContainer}>
          {/* Show star rating based on the item rating value */}
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              source={Star}
              style={{
                width: 13,
                height: 13,
                tintColor:
                  i < Math.floor(item.rating.rate) ? '#FFD700' : '#ddd',
                marginRight: 2,
              }}
            />
          ))}
          <Text style={styles.ratingCount}>({item.rating.count})</Text>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={MenuIcon}
        rightIcon={Cart}
        title="Grocery App"
        leftClick={() => {
          navigation.openDrawer();
        }}
      />
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2} // To display 2 products per row
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 10,
  },
  productItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    margin: 10,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    maxWidth: Dimensions.get('window').width / 2 - 20,
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 5,
    borderRadius: 15,
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: '#0786DAFD',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingCount: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  addToCartButton: {
    backgroundColor: '#0786DAFD',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
