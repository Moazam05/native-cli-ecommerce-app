import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser, setUser} from '../../redux/auth/authSlice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loginUser = useTypedSelector(selectedUser);
  const firstLetter = loginUser?.name?.charAt(0)?.toUpperCase();

  const handleLogout = () => {
    dispatch(setUser(null));
    AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>

        <Text style={styles.userName}>{loginUser?.name}</Text>

        <View style={styles.card}>
          <Text style={styles.textLabel}>Edit Profile</Text>
          <Text style={styles.textLabel}>Orders</Text>
          <Text style={styles.textLabel}>Address</Text>
          <Text
            style={styles.textLabel}
            onPress={() => {
              handleLogout();
            }}>
            Logout
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#A0522D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 20,
    color: '#fff',
  },

  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginTop: 30,
  },
  textLabel: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
});
