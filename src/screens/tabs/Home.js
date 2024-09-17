import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {Cart, MenuIcon} from '../../assets/images';

const Home = () => {
  return (
    <View>
      <Header leftIcon={MenuIcon} rightIcon={Cart} title="Grocery App" />
    </View>
  );
};

export default Home;
