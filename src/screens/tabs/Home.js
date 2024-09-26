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
} from '../../assets/images';
import {Colors} from '../../constants/colors';
import OldHome from './OldHome';
import {Fonts} from '../../constants/fonts';

const categoriesData = [
  {
    id: 1,
    name: 'Beauty',
    image: <Beauty />,
  },
  {
    id: 2,
    name: 'Fashion',
    image: <Fashion />,
  },
  {
    id: 3,
    name: 'Kids',
    image: <Kids />,
  },
  {
    id: 4,
    name: 'Mens',
    image: <Mens />,
  },
  {
    id: 5,
    name: 'Womens',
    image: <Womens />,
  },
];

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
                    {item.image}
                    <Text style={styles.categoryName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
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
    marginRight: 5,
  },
  wrap: {
    width: '100%',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingRight: 25,
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
});
