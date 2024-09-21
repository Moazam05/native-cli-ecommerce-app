import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {Back} from '../assets/images';
import {useNavigation} from '@react-navigation/native';

const CreateAddress = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={Back}
        title="Create Address"
        leftClick={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

export default CreateAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});
