import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler'; // Wrap this around the root component
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {LoginImg} from '../assets/images';
import TextField from '../components/TextField';

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();

  const handleSignin = values => {
    Alert.alert('Success', 'Login successfully');
  };

  return (
    <GestureHandlerRootView style={styles.gestureHandle}>
      <SafeAreaView style={styles.container}>
        <Image source={LoginImg} style={styles.coverImage} />
        <Text style={styles.tagline}>
          Welcome back! We're glad to see you again.
        </Text>

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
            <>
              <View style={styles.formContainer}>
                <TextField
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  error={touched.email && errors.email}
                />
                <TextField
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password}
                  password={true}
                />

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
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
            </>
          )}
        </Formik>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Login;

const styles = StyleSheet.create({
  gestureHandle: {
    flex: 1,
  },
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
  formContainer: {
    paddingHorizontal: 20,
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
