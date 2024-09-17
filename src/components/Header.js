import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');

const Header = ({title, leftIcon, rightIcon, leftClick, rightClick}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.btn}></TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    backgroundColor: '#0786DAFD',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
