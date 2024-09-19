import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Header from '../../components/Header';
import {CartIcon, MenuIcon, WishlistFill} from '../../assets/images'; // Add HeartIcon if not available
import useTypedSelector from '../../hooks/useTypedSelector';
import {
  selectWishlistProducts,
  setWishListProducts,
} from '../../redux/wishlist/wishlistsSlice';

const WishList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wishListProducts = useTypedSelector(selectWishlistProducts);

  const removeFromWishlist = item => {
    dispatch(setWishListProducts(item));
  };

  const renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <View style={styles.priceWrap}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity onPress={() => removeFromWishlist(item)}>
            <Image source={WishlistFill} style={styles.wishlistIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        leftIcon={MenuIcon}
        rightIcon={CartIcon}
        title="Wishlist Items"
        leftClick={() => navigation.openDrawer()}
      />
      <FlatList
        data={wishListProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        tab
        height
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in your wishlist</Text>
        }
      />
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  productImage: {
    width: 60,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  priceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    minHeight: 50,
  },
  productPrice: {
    fontSize: 14,
    color: '#0786DAFD',
    marginBottom: 10,
  },
  wishlistIcon: {
    width: 24,
    height: 24,
    tintColor: '#0786DAFD',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
