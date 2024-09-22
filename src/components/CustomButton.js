import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../constants/colors';
import {Fonts} from '../constants/fonts';

const CustomButton = ({name, onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={styles.loginButton}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: Fonts.SEMIBOLD,
  },
});
