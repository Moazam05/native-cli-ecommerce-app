import React, {act, useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BottomSearch,
  CartIcon,
  HomeFill,
  HomeIcon,
  NotificationFill,
  NotificationIcon,
  SearchIcon,
  SettingIcon,
  UserFill,
  UserIcon,
  WishlistFill,
  WishlistIcon,
} from '../../assets/images';
import Home from '../tabs/Home';
import Notification from '../tabs/Notification';
import Search from '../tabs/Search';
import Profile from '../tabs/Profile';
import Wishlist from '../tabs/WishList';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={Colors.PRIMARY_BG}
      />

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
          <Profile />
        )}

        {!isKeyboardVisible && (
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => setSelectedTab(0)}>
              <Image
                source={HomeIcon}
                style={
                  selectedTab === 0
                    ? styles.activeBottomTabIcon
                    : styles.bottomTabIcon
                }
              />
              <Text
                style={selectedTab === 0 ? styles.activeLabel : styles.label}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => setSelectedTab(1)}>
              <Image
                source={WishlistIcon}
                style={
                  selectedTab === 1
                    ? styles.activeBottomTabIcon
                    : styles.bottomTabIcon
                }
              />
              <Text
                style={selectedTab === 1 ? styles.activeLabel : styles.label}>
                Wishlist
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={selectedTab === 2 ? styles.activeCartTab : styles.cartTab}
              onPress={() => setSelectedTab(2)}>
              <Image
                source={CartIcon}
                style={
                  selectedTab === 2
                    ? styles.lastActiveBottomTabIcon
                    : styles.bottomTabIcon
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => setSelectedTab(3)}>
              <Image
                source={BottomSearch}
                style={
                  selectedTab === 3
                    ? styles.activeBottomTabIcon
                    : styles.bottomTabIcon
                }
              />
              <Text
                style={selectedTab === 3 ? styles.activeLabel : styles.label}>
                Search
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => setSelectedTab(4)}>
              <Image
                source={SettingIcon}
                style={
                  selectedTab === 4
                    ? styles.activeBottomTabIcon
                    : styles.bottomTabIcon
                }
              />
              <Text
                style={selectedTab === 4 ? styles.activeLabel : styles.label}>
                Setting
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </>
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
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#DADADA',
    borderWidth: 1,
  },

  bottomTab: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabIcon: {
    width: 19,
    height: 24,
    resizeMode: 'contain',
  },
  activeBottomTabIcon: {
    width: 19,
    height: 24,
    tintColor: '#EB3030',
    resizeMode: 'contain',
  },
  label: {
    fontSize: 12,
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
  },
  activeLabel: {
    fontSize: 12,
    color: '#EB3030',
    fontFamily: Fonts.MEDIUM,
  },

  cartTab: {
    backgroundColor: Colors.WHITE,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -25,
    left: '40%',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  activeCartTab: {
    backgroundColor: '#EB3030',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -25,
    left: '40%',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },

  lastActiveBottomTabIcon: {
    width: 19,
    height: 24,
    resizeMode: 'contain',
    tintColor: Colors.WHITE,
  },
});
