import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {HideEye, OpenEye} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  mobile: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Signup = () => {
  const navigation = useNavigation();

  // Form submission logic
  const handleSignup = async values => {
    try {
      await firestore().collection('Users').add({
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
      });
      Alert.alert('Success', 'Account created successfully');
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join us to get started!</Text>

      <Formik
        initialValues={{
          name: 'Salman',
          email: 'Salman@gmail.com',
          mobile: '12345678910',
          password: '123456',
          confirmPassword: '123456',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignup}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <InputField
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              error={touched.name && errors.name}
            />
            <InputField
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              error={touched.email && errors.email}
            />
            <InputField
              placeholder="Mobile"
              value={values.mobile}
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              keyboardType="phone-pad"
              error={touched.mobile && errors.mobile}
            />
            <PasswordInputField
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password}
            />
            <PasswordInputField
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              error={touched.confirmPassword && errors.confirmPassword}
            />

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </SafeAreaView>
  );
};

// Reusable InputField Component
const InputField = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  keyboardType = 'default',
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={[styles.input, error ? styles.inputError : null]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      keyboardType={keyboardType}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

// Password Input Field with Eye Icon Toggle
const PasswordInputField = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.passwordContainer}>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        style={styles.eyeIconContainer}
        onPress={() => setShowPassword(!showPassword)}>
        <Image
          source={showPassword ? OpenEye : HideEye}
          style={styles.eyeIcon}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: 'red',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  signupButton: {
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
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
  loginLink: {
    color: '#0786DAFD',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 11,
    marginTop: 3,
  },
});
