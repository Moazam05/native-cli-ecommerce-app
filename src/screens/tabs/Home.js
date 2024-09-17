import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {Cart, MenuIcon} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={MenuIcon}
        rightIcon={Cart}
        title="Grocery App"
        leftClick={() => {
          navigation.openDrawer();
        }}
      />
      <FlatList
        data={products}
        renderItem={({item, index}) => {
          return (
            <View style={styles.productItem}>
              <Image source={{uri: item.image}} style={styles.itemImage} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
});
