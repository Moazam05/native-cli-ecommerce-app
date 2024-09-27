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
  ClearIcon,
  Logo,
  NavigationIcon,
  SearchIcon,
  UserIcon,
} from '../../assets/images';
import {categoriesData} from '../../constants';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import Banners from '../Home/components/Banners';
import OldHome from './OldHome';

const Home = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity>
      <View style={styles.categoryWrap}>
        <item.image />
        <Text style={styles.categoryName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categoriesData}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={
        <View style={styles.parentWrap}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <NavigationIcon />
            </TouchableOpacity>
            <Logo />
            <UserIcon />
          </View>

          {/* Search Bar */}
          <View style={styles.wrap}>
            <View>
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
            </View>

            {/* Categories */}
            <Text style={styles.featured}>All Featured</Text>
            <View style={styles.categories}>
              <FlatList
                data={categoriesData}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderCategoryItem}
              />
            </View>

            {/* Banners */}
            <Banners />
          </View>
        </View>
      }
      showsVerticalScrollIndicator={false}
      renderItem={null} // Since categories are part of ListHeaderComponent
      ListFooterComponent={<OldHome />} // Old Home will come at the end
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BG,
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

  wrap: {
    width: '100%',
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
    marginBottom: 10,
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
