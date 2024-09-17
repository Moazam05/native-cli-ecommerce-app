import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Back, Cart} from '../assets/images';
import Header from '../components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  console.log('route.params', route.params.item);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={Back}
        rightIcon={Cart}
        title="Grocery App"
        leftClick={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
