import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {GetStartedImg} from '../assets/images';
import {Colors} from '../constants/colors';
import {Fonts} from '../constants/fonts';

const PreMain = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.coverImg}>
        <GetStartedImg />
      </View>
      <Text style={styles.tagLine}>You want Authentic, here you go!</Text>
      <Text style={styles.findText}>Find it here, buy it now!</Text>

      <View style={styles.buttonText}>
        <CustomButton
          name="Get Started"
          onPress={() => navigation.navigate('Main')}
        />
      </View>
    </View>
  );
};

export default PreMain;

const styles = StyleSheet.create({
  tagLine: {
    fontSize: 34,
    color: Colors.WHITE,
    fontFamily: Fonts.SEMIBOLD,
  },

  findText: {
    fontSize: 14,
    color: '#F2F2F2',
    fontFamily: Fonts.REGULAR,
  },
});
