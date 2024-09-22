// React Imports
import React, {useRef, useState} from 'react';
// React Native Imports
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
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
        // dot={<View style={styles.dot} />}
        // activeDot={<View style={styles.activeDot} />}
        onIndexChanged={index => setActiveIndex(index)}>
        {onboarding.map(item => {
          return (
            <View key={item.id} style={styles.slide}>
              <item.image />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          );
        })}
      </Swiper>

      {/* Next or Get Started Button */}
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (isLastSlide) {
            navigation.replace('SignUp');
          } else {
            swiperRef.current?.scrollBy(1);
          }
        }}>
        <Text style={styles.buttonText}>
          {isLastSlide ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity> */}

      <View style={styles.buttonWrap}>
        <Text style={styles.prev}>Prev</Text>
        <Text style={styles.next}>Next</Text>
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
  dot: {
    width: 32,
    height: 4,
    marginHorizontal: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  activeDot: {
    width: 32,
    height: 4,
    marginHorizontal: 4,
    backgroundColor: '#0286FF',
    borderRadius: 2,
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
  button: {
    width: '90%',
    marginBottom: 20,
    backgroundColor: '#0286FF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
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
