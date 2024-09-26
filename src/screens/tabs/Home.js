import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
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
import {Colors} from '../../constants/colors';
import OldHome from './OldHome';

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
        </View>

        <View>
          <Text>All Featured</Text>
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

  // jj
});
