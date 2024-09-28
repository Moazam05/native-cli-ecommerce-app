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
  console.log('wishListProducts', wishListProducts);

  const removeFromWishlist = item => {
    dispatch(setWishListProducts(item));
  };

  const renderItem = ({item}) => <></>;

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
          tab
          height
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
});
