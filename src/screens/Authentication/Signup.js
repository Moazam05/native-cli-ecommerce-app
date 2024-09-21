import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import * as Yup from 'yup';
import TextField from '../../components/TextField';

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  mobile: Yup.string()
    .matches(/^\d{11}$/, 'Enter a valid mobile number')
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
  const [loading, setLoading] = useState(false);

  // Form submission logic
  const handleSignup = async values => {
    setLoading(true);
    try {
      await firestore().collection('Users').add({
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
      });
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error adding user: ', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join us to get started!</Text>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Formik
            initialValues={{
              name: '',
              email: '',
              mobile: '',
              password: '',
              confirmPassword: '',
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
                <TextField
                  placeholder="Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  error={touched.name && errors.name}
                />
                <TextField
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  error={touched.email && errors.email}
                />
                <TextField
                  placeholder="Mobile"
                  value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  onBlur={handleBlur('mobile')}
                  keyboardType="phone-pad"
                  error={touched.mobile && errors.mobile}
                />
                <TextField
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password}
                  secureTextEntry={true}
                />
                <TextField
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  error={touched.confirmPassword && errors.confirmPassword}
                  secureTextEntry={true}
                />

                <TouchableOpacity
                  style={styles.signupButton}
                  onPress={handleSubmit}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                  )}
                </TouchableOpacity>

                <Text style={styles.loginText}>
                  Already have an account?{' '}
                  <Text
                    style={styles.loginLink}
                    onPress={() => navigation.navigate('Login')}>
                    Login
                  </Text>
                </Text>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
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
});
