import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {FlatHeel, RightArrow} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';
import {Colors} from '../../../constants/colors';

const FlatBanner = () => {
  return (
    <View style={styles.wrap}>
      <Image source={FlatHeel} style={styles.banner} />

      {/* Content Overlay */}
      <View style={styles.contentWrap}>
        <Text style={styles.title}>Flat and Heels</Text>
        <Text style={styles.tagline}>Stand a chance to get rewarded</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.visit}>Visit now</Text>
          <RightArrow style={styles.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlatBanner;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: 'relative',
    marginBottom: 16,
  },
  banner: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
  },
  contentWrap: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{translateY: -50}],
    // alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: '#232327',
    marginBottom: 2,
    textAlign: 'center',
    alignItems: 'center',
  },
  tagline: {
    fontSize: 10,
    fontFamily: Fonts.REGULAR,
    color: '#232327',
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
    borderRadius: 4,
    backgroundColor: '#F83758',
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 8,
    width: 100,
  },
  visit: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.WHITE,
  },
  arrow: {
    marginTop: 2,
  },
});
