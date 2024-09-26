import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {
  CartIcon,
  MenuIcon,
  Heart,
  Star,
  SearchIcon,
  ClearIcon,
  NavigationIcon,
  UserIcon,
  Logo,
} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import useTypedSelector from '../../hooks/useTypedSelector';
import {useDispatch} from 'react-redux';
import {
  selectedProducts,
  setCartProducts,
  incrementProductQuantity,
  decrementProductQuantity,
} from '../../redux/products/productsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginModal from '../../components/LoginModal';
import {Colors} from '../../constants/colors';

const OldHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartProducts = useTypedSelector(selectedProducts);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (searchText === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  }, [searchText, products]);

  const getProducts = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Set both products and filteredProducts initially
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Stop loading after the request is finished
    }
  };

  const addToCartHandler = async item => {
    const status = await AsyncStorage.getItem('IS_LOGGED_IN');
    console.log('status', status);

    // console.log('status', status);

    // if (status === null) {
    //   Alert.alert('Please login to add products to cart');
    // }

    // return;

    const productInCart = cartProducts.find(product => product.id === item.id);

    if (productInCart) {
      dispatch(incrementProductQuantity(item.id)); // Increment product quantity if it's already in the cart
    } else {
      dispatch(setCartProducts({...item, quantity: 1})); // Add product to the cart with initial quantity 1
    }
  };

  const renderProduct = ({item}) => {
    const productInCart = cartProducts.find(product => product.id === item.id);

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.productItem}
        onPress={() => {
          navigation.navigate('ProductDetail', {item});
        }}>
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image source={{uri: item.image}} style={styles.itemImage} />
          ) : (
            <Text>No Image Available</Text>
          )}
          <TouchableOpacity style={styles.heartIconContainer}>
            <Image source={Heart} style={styles.heartIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              source={Star}
              // eslint-disable-next-line react-native/no-inline-styles
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

        {productInCart ? (
          <View style={styles.cartActionsContainer}>
            <TouchableOpacity
              style={styles.decrementButton}
              onPress={() => dispatch(decrementProductQuantity(item.id))}>
              <Text style={styles.cartActionText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.cartQuantity}>{productInCart.quantity}</Text>

            <TouchableOpacity
              style={styles.incrementButton}
              onPress={() => dispatch(incrementProductQuantity(item.id))}>
              <Text style={[styles.cartActionText, styles.textAlignRight]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCartHandler(item)}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  // Salman
  return (
    <View style={styles.container}>
      {/* New */}
      <Header
        leftIcon={MenuIcon}
        rightIcon={CartIcon}
        title="Grocery App"
        leftClick={() => {
          navigation.openDrawer();
        }}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      ) : (
        <>
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}

      {/* Modal */}
      <LoginModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onLoginPress={() => {
          setIsModalVisible(false);
          navigation.navigate('Login');
        }}
        onSignupPress={() => {
          setIsModalVisible(false);
          navigation.navigate('Signup');
        }}
      />
    </View>
  );
};

export default OldHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BG,
  },
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user: {
    marginRight: 10,
  },
  wrap: {
    width: '100%',
  },
  searchContainer: {
    paddingRight: 25,
    paddingLeft: 15,
  },
  searchBar: {
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    elevation: 3,
    height: 45,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingLeft: 15,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#BBBBBB',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  // jj
  listContainer: {
    padding: 10,
    paddingBottom: 100,
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
    width: '100%',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: '#0786DAFD',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginTop: 10,
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
});
