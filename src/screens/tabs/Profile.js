import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser} from '../../redux/auth/authSlice';

const Profile = () => {
  const loginUser = useTypedSelector(selectedUser);
  console.log('loginUser', loginUser);

  return (
    <View style={styles.container}>
      <Header title="Profile" />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
