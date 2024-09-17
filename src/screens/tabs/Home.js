import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {Cart, MenuIcon} from '../../assets/images';

const Home = () => {
  return (
    <View style={styles.container}>
      <Header leftIcon={MenuIcon} rightIcon={Cart} title="Grocery App" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
