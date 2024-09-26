import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Beauty,
  ClearIcon,
  Fashion,
  Logo,
  NavigationIcon,
  SearchIcon,
  UserIcon,
  Kids,
  Mens,
  Womens,
  Banner1,
  RightArrow,
} from '../../assets/images';
import {Colors} from '../../constants/colors';
import OldHome from './OldHome';
import {Fonts} from '../../constants/fonts';
import {categoriesData} from '../../constants';

const Home = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <NavigationIcon />
        </TouchableOpacity>
        <Logo />
        <View style={styles.user}>
          <UserIcon />
        </View>
      </View>
      <View style={styles.wrap}>
        <View style={styles.searchContainer}>
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
                <Image source={ClearIcon} style={styles.icon} />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.featured}>All Featured</Text>

          <View style={styles.categories}>
            <FlatList
              data={categoriesData}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity>
                  <View style={styles.categoryWrap}>
                    <item.image />
                    <Text style={styles.categoryName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.banner}>
            <View style={styles.bannerImg}>
              <Banner1 />
              <View style={styles.textContainer}>
                <Text style={styles.discountText}>50-40% OFF</Text>
                <Text style={styles.productText}>Now in (product)</Text>
                <Text style={styles.colorText}>All colors</Text>
                <TouchableOpacity style={styles.shopNowBtn}>
                  <Text style={styles.shopNowText}>Shop Now</Text>
                  <View style={styles.rightArrow}>
                    <RightArrow />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* New */}
      <OldHome />
    </View>
  );
};

export default Home;

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
    // marginRight: 5,
  },
  wrap: {
    width: '100%',
  },
  searchContainer: {
    paddingHorizontal: 16,
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
  featured: {
    fontFamily: Fonts.SEMIBOLD,
    fontSize: 18,
    color: Colors.BLACK,
  },
  categories: {
    marginTop: 16,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
  },
  categoryWrap: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryName: {
    color: '#21003D',
    marginTop: 5,
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
  },
  banner: {
    marginVertical: 16,
    position: 'relative',
  },
  bannerImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    left: 25,
  },
  discountText: {
    fontSize: 20,
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
  },
  productText: {
    fontSize: 12,
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
    marginTop: 5,
    marginBottom: 5,
  },
  colorText: {
    fontSize: 12,
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
    marginBottom: 5,
  },
  shopNowBtn: {
    borderColor: Colors.WHITE,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  shopNowText: {
    color: Colors.WHITE,
    fontFamily: Fonts.SEMIBOLD,
    fontSize: 12,
  },
  rightArrow: {
    marginTop: 2,
  },
});
