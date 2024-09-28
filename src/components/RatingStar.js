import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {FillStarTwo, HalfStarTwo} from '../assets/images';

const RatingStar = ({rating}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <View style={styles.wrap}>
      <View style={styles.starWrap}>
        {Array.from({length: fullStars}, (_, index) => (
          <Image
            key={`full-${index}`}
            source={FillStarTwo}
            style={styles.img}
          />
        ))}
        {hasHalfStar && <Image source={HalfStarTwo} style={styles.img} />}
      </View>
    </View>
  );
};

export default RatingStar;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  starWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  img: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});
