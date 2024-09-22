import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  LoginImg,
  PasswordTextFieldIcon,
  UserTextFieldIcon,
} from '../../assets/images';
import TextField from '../../components/TextField';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Fonts} from '../../constants/fonts';
import {Colors} from '../../constants/colors';

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleSignin = async values => {
    setLoading(true);
    try {
      const querySnapshot = await firestore()
        .collection('Users')
        .where('email', '==', values.email)
        .get();

      if (querySnapshot.empty) {
        Alert.alert('Error', 'User does not exist');
        return;
      }

      const userData = querySnapshot.docs[0].data();

      if (userData.password === values.password) {
        dispatch(setUser(userData));
        AsyncStorage.setItem('user', JSON.stringify(userData));

        Alert.alert('Success', 'Successfully signed in');
        navigation.navigate('Main');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error signing in: ', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={styles.gestureHandle}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headingWrap}>
          <Text style={styles.heading}>Welcome</Text>
          <Text style={styles.heading}>Back!</Text>
        </View>

        {/* <Image source={LoginImg} style={styles.coverImage} />
        <Text style={styles.tagline}>
          Welcome back! We're glad to see you again.
        </Text> */}

        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={validationSchema}
              onSubmit={handleSignin}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.formContainer}>
                  <TextField
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                    error={touched.email && errors.email}
                    leftIcon={<UserTextFieldIcon />}
                  />
                  <TextField
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={touched.password && errors.password}
                    secureTextEntry={true}
                    leftIcon={<PasswordTextFieldIcon />}
                  />

                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleSubmit}
                    disabled={loading}>
                    {loading ? (
                      <ActivityIndicator color="#ffffff" />
                    ) : (
                      <Text style={styles.buttonText}>Login</Text>
                    )}
                  </TouchableOpacity>

                  <Text style={styles.signupText}>
                    Don't have an account?{' '}
                    <Text
                      style={styles.signupLink}
                      onPress={() => navigation.navigate('Signup')}>
                      Sign Up
                    </Text>
                  </Text>
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Login;

const styles = StyleSheet.create({
  gestureHandle: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  headingWrap: {
    marginTop: 20,
  },
  heading: {
    fontSize: 36,
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
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
  formContainer: {
    marginTop: 36,
    gap: 30,
  },
  loginButton: {
    backgroundColor: '#0786DAFD',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
  signupLink: {
    color: '#0786DAFD',
    fontWeight: 'bold',
  },
});
