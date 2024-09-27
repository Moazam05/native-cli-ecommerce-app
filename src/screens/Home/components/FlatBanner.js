import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {FlatHeel, RightArrow} from '../../../assets/images';
import {Image} from 'react-native-svg';
import {Fonts} from '../../../constants/fonts';
import {Colors} from '../../../constants/colors';

const FlatBanner = () => {
  return (
    <View style={styles.wrap}>
      <View>
        <Image source={FlatHeel} style={styles.banner} />
      </View>
      <View>
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
  },
  banner: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: '#232327',
  },
  tagline: {
    fontSize: 10,
    fontFamily: Fonts.REGULAR,
    color: '#232327',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#F83758',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 8,
    width: 100,
    gap: 8,
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
