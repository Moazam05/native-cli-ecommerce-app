import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser, setUser} from '../../redux/auth/authSlice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../constants/colors';
import {leftArrow, UserTwo} from '../../assets/images';
import {Fonts} from '../../constants/fonts';
import TextField from '../../components/TextField';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loginUser = useTypedSelector(selectedUser);
  const firstLetter = loginUser?.name?.charAt(0)?.toUpperCase();

  console.log('login user', loginUser);

  const handleLogout = () => {
    dispatch(setUser(null));
    AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={leftArrow} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Setting</Text>
          <Text style={styles.h}>H</Text>
        </View>

        <View style={styles.userIconWrap}>
          <Image source={UserTwo} style={styles.userIcon} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.personal}>Personal Details</Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name</Text>
            <TextField
              placeholder="State"
              value={loginUser?.name}
              inputWrap={{
                height: 48,
                backgroundColor: 'transparent',
                borderRadius: 8,
              }}
              editable={false}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextField
              placeholder="State"
              value={loginUser?.email}
              inputWrap={{
                height: 48,
                backgroundColor: 'transparent',
                borderRadius: 8,
              }}
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BG,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backIcon: {
    width: 10,
    height: 19,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
  },
  h: {
    opacity: 0,
  },
  userIconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 31,
  },
  userIcon: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  scrollContainer: {
    marginHorizontal: 16,
  },
  formContainer: {
    marginTop: 25,
  },
  personal: {
    fontSize: 18,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
    marginBottom: 10,
  },
});
