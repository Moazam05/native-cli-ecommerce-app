// React Imports
import React, {useRef, useState} from 'react';
// React Native Imports
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
// React Navigation
import {useNavigation} from '@react-navigation/native';
// Safe Area View
import {SafeAreaView} from 'react-native-safe-area-context';
// Swiper
import Swiper from 'react-native-swiper';
// Constants
import {onboarding} from '../../constants'; // Update the path as needed
import {ActiveSlide} from '../../assets/images'; // Update the path as needed

const Welcome = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity
        onPress={() => navigation.replace('Login')}
        style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={index => setActiveIndex(index)}
        showsPagination={false} // Hide the default pagination
      >
        {onboarding.map(item => (
          <View key={item.id} style={styles.slide}>
            <item.image />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </Swiper>

      {/* Navigation and Pagination */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => swiperRef.current?.scrollBy(-1)}>
          <Text style={styles.prev}>Prev</Text>
        </TouchableOpacity>

        {/* Custom Pagination */}
        <View style={styles.pagination}>
          {onboarding.map((_, index) => (
            <View key={index} style={styles.dotWrapper}>
              {activeIndex === index ? (
                <ActiveSlide />
              ) : (
                <View style={styles.dot} />
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => {
            if (isLastSlide) {
              navigation.replace('Login');
            } else {
              swiperRef.current?.scrollBy(1);
            }
          }}>
          <Text style={styles.next}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    width: '100%',
    alignItems: 'flex-end',
    padding: 20,
  },
  skipText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#858585',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotWrapper: {
    marginHorizontal: 4,
  },
  dot: {
    width: 12,
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
  },
  prev: {
    fontSize: 16,
    color: '#C4C4C4',
  },
  next: {
    fontSize: 16,
    color: '#F83758',
  },
});
