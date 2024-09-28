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
import {
  Logo,
  NavigationIcon,
  UserIcon,
  WishlistFill,
} from '../../assets/images'; // Add HeartIcon if not available
import useTypedSelector from '../../hooks/useTypedSelector';
import {
  selectWishlistProducts,
  setWishListProducts,
} from '../../redux/wishlist/wishlistsSlice';

const WishList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wishListProducts = useTypedSelector(selectWishlistProducts);

  const randomHeight = () => {
    return Math.floor(Math.random() * (180 - 120 + 1)) + 120;
  };
  const removeFromWishlist = item => {
    dispatch(setWishListProducts(item));
  };
  const renderItem = ({item}) => (
    <View style={[styles.productContainer, {height: randomHeight()}]}>
      <Image source={item?.image} style={styles.productImage} />
      {/* Wishlist Icon */}
      <TouchableOpacity
        style={styles.wishlistIcon}
        onPress={() => removeFromWishlist(item)}>
        <Image
          source={WishlistFill}
          style={{
            width: 18,
            height: 18,
            tintColor: '#F83758',
          }}
        />
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item?.name}</Text>
        <Text style={styles.productDescription}>{item?.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.parentWrap}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <NavigationIcon />
          </TouchableOpacity>
          <Logo />
          <UserIcon />
        </View>

        <FlatList
          data={wishListProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          // numColumns={2}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No items in your wishlist</Text>
          }
        />
      </View>
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parentWrap: {
    paddingHorizontal: 16,
  },
  topBar: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  wishlistIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#F9F9F9',
    padding: 8,
    borderRadius: 50,
  },
  productInfo: {
    padding: 8,
    backgroundColor: '#fff',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
