import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Product1} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';
import {Colors} from '../../../constants/colors';

const FeaturedProducts = () => {
  return (
    <View style={styles.wrap}>
      <View style={styles.productWrap}>
        <View style={styles.image}>
          <Product1 />
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.description}>Descriptiion</Text>
          <Text style={styles.price}>PKR 1200</Text>

          <View style={styles.priceWrap}>
            <Text style={styles.oldPrice}>PKR 2499</Text>
            <Text style={styles.off}>40% Off</Text>
          </View>

          <View style={styles.starWrap}>
            <Text>Rating Star</Text>
            <Text style={styles.count}>Rating Count</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FeaturedProducts;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  productWrap: {
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: '100%',
    height: 124,
  },
  card: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  title: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    fontWeight: '600',
  },
  description: {
    fontSize: 10,
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
  },
  price: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    fontWeight: '600',
  },
  priceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  oldPrice: {
    fontSize: 12,
    color: '#BBBBBB',
    textDecorationLine: 'line-through',
    fontFamily: Fonts.LIGHT,
  },
  off: {
    fontSize: 10,
    color: '#FE735C',
    marginLeft: 4,
    fontFamily: Fonts.REGULAR,
  },
  starWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  count: {
    fontSize: 10,
    color: '#A4A9B3',
    fontFamily: Fonts.REGULAR,
  },
});
