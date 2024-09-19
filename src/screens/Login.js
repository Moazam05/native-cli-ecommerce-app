import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoginImg} from '../assets/images';

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={LoginImg} style={styles.coverImage} />

      <Text style={styles.tagline}>
        Welcome back! We're glad to see you again.
      </Text>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  coverImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.5,
    resizeMode: 'cover',
  },
  tagline: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
    fontWeight: '600',
  },
});
