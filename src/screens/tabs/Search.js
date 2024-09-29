import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectSearchbarText} from '../../redux/searchbar/searchbarSlice';
import {
  ClearIcon,
  Logo,
  NavigationIcon,
  SearchIcon,
  UserIcon,
} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {featuredProducts} from '../../constants';
import {thousandSeparator} from '../../utils';
import {Fonts} from '../../constants/fonts';
import {Colors} from '../../constants/colors';

const Search = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const getSearchText = useTypedSelector(selectSearchbarText);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (getSearchText) {
      setSearchText(getSearchText);
    }
  }, [getSearchText]);

  const renderProduct = ({item}) => (
    <TouchableOpacity
      style={styles.productWrap}
      onPress={() => {
        navigation.navigate('ProductDetail', {item});
      }}>
      <View style={styles.image}>
        <Image source={item.image} style={styles.imgWrap} />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>PKR {thousandSeparator(item.price)}</Text>

        <View style={styles.priceWrap}>
          <Text style={styles.oldPrice}>
            PKR {thousandSeparator(item.oldPrice)}
          </Text>
          <Text style={styles.off}>{item.off}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <NavigationIcon />
        </TouchableOpacity>
        <Logo />
        <UserIcon />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <SearchIcon />
        <TextInput
          placeholder="Search any product.."
          style={styles.searchInput}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          placeholderTextColor="#BBBBBB"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <ImageBackground source={ClearIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Products*/}
      <FlatList
        ref={flatListRef}
        data={featuredProducts}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderProduct}
        snapToAlignment="center"
        decelerationRate="fast"
        numColumns={2}
        key={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  topBar: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  productWrap: {
    backgroundColor: Colors.WHITE,
    width: 170,
    marginHorizontal: 5,
    borderRadius: 4,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  imgWrap: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  card: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  title: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    fontWeight: '600',
  },
  priceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  oldPrice: {
    fontSize: 12,
    color: '#BBBBBB',
    textDecorationLine: 'line-through',
    fontFamily: Fonts.LIGHT,
  },
  off: {
    fontSize: 10,
    color: '#FE735C',
    marginLeft: 4,
    fontFamily: Fonts.REGULAR,
  },
  listContainer: {
    paddingBottom: 100,
  },
});
