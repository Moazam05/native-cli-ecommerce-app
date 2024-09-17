import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  HomeFill,
  HomeIcon,
  NotificationFill,
  NotificationIcon,
  SearchIcon,
  UserFill,
  UserIcon,
  WishlistFill,
  WishlistIcon,
} from '../assets/images';
import Home from './tabs/Home';
import Notification from './tabs/Notification';
import Search from './tabs/Search';
import User from './tabs/User';
import Wishlist from './tabs/WishList';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      {selectedTab === 0 ? (
        <Home />
      ) : selectedTab === 1 ? (
        <Search />
      ) : selectedTab === 2 ? (
        <Wishlist />
      ) : selectedTab === 3 ? (
        <Notification />
      ) : (
        <User />
      )}

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(0)}>
          <Image
            source={selectedTab === 0 ? HomeFill : HomeIcon}
            style={styles.bottomTabIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(1)}>
          <Image source={SearchIcon} style={styles.bottomTabIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(2)}>
          <Image
            source={selectedTab === 2 ? WishlistFill : WishlistIcon}
            style={styles.bottomTabIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(3)}>
          <Image
            source={selectedTab === 3 ? NotificationFill : NotificationIcon}
            style={styles.bottomTabIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(4)}>
          <Image
            source={selectedTab === 4 ? UserFill : UserIcon}
            style={styles.bottomTabIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: '#0786DAFD',
    backgroundColor: '#fff',
  },

  bottomTab: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabIcon: {
    width: 24,
    height: 24,
  },
});
