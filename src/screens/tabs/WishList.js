import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {Cart, MenuIcon} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const WishList = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        leftIcon={MenuIcon}
        rightIcon={Cart}
        title="Wish List"
        leftClick={() => {
          navigation.openDrawer();
        }}
      />
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
