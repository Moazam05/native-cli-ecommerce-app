import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Banner1, RightArrow} from '../../../assets/images';
import {Colors} from '../../../constants/colors';
import {Fonts} from '../../../constants/fonts';

const Banners = () => {
  return (
    <View style={styles.banner}>
      <View style={styles.bannerImg}>
        <Banner1 />
        <View style={styles.textContainer}>
          <Text style={styles.discountText}>50-40% OFF</Text>
          <Text style={styles.productText}>Now in (product)</Text>
          <Text style={styles.colorText}>All colors</Text>
          <TouchableOpacity style={styles.shopNowBtn}>
            <Text style={styles.shopNowText}>Shop Now</Text>
            <View style={styles.rightArrow}>
              <RightArrow />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Banners;

const styles = StyleSheet.create({
  banner: {
    marginVertical: 16,
    position: 'relative',
  },
  bannerImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    left: 25,
  },
  discountText: {
    fontSize: 20,
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
  },
  productText: {
    fontSize: 12,
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
    marginTop: 5,
    marginBottom: 5,
  },
  colorText: {
    fontSize: 12,
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
    marginBottom: 5,
  },
  shopNowBtn: {
    borderColor: Colors.WHITE,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  shopNowText: {
    color: Colors.WHITE,
    fontFamily: Fonts.SEMIBOLD,
    fontSize: 12,
  },
  rightArrow: {
    marginTop: 2,
  },
});
