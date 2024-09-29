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
} from '../../assets/images';
import useTypedSelector from '../../hooks/useTypedSelector';
import {
  selectWishlistProducts,
  setWishListProducts,
} from '../../redux/wishlist/wishlistsSlice';
import {Fonts} from '../../constants/fonts';
import {Colors} from '../../constants/colors';
import {thousandSeparator} from '../../utils';
import RatingStar from '../../components/RatingStar';

const WishList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wishListProducts = useTypedSelector(selectWishlistProducts);

  // Randomly return 136 or 196
  const randomHeight = () => {
    return Math.random() < 0.5 ? 136 : 136;
  };

  // Function to remove item from wishlist
  const removeFromWishlist = item => {
    dispatch(setWishListProducts(item));
  };

  const renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <Image
        source={item?.image}
        style={[styles.productImage, {height: randomHeight()}]}
      />
      <TouchableOpacity
        style={styles.wishlistIcon}
        onPress={() => removeFromWishlist(item)}>
        <Image source={WishlistFill} style={styles.wishlistIconImage} />
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item?.name}</Text>
        <Text style={styles.productDescription}>{item?.description}</Text>
        <Text style={styles.price}>PKR {thousandSeparator(item?.price)}</Text>

        <View style={styles.starWrap}>
          <View>
            {/* Rating */}
            <RatingStar rating={item?.rating} size={14} />
          </View>
          <Text style={styles.count}>
            ({thousandSeparator(item?.ratingCount)})
          </Text>
        </View>
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
          key={2} // Force re-render when numColumns changes
          contentContainerStyle={styles.listContainer}
          numColumns={2} // Display two items per row
          showsVerticalScrollIndicator={false}
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
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#fff',
    width: 163,
  },
  productImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  wishlistIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F9F9F9',
    padding: 6,
    borderRadius: 50,
  },
  wishlistIconImage: {
    width: 14,
    height: 14,
    tintColor: '#F83758',
  },
  productInfo: {
    padding: 8,
    backgroundColor: '#fff',
  },
  productTitle: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 10,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  listContainer: {
    paddingBottom: 140,
  },
  price: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    marginTop: 4,
  },
  starWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  count: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: '#A4A9B3',
    marginLeft: 4,
  },
});
