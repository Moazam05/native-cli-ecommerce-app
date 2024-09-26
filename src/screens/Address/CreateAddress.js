import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import {Back} from '../../assets/images';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {addAddress, updateAddress} from '../../redux/address/addressSlice';
import TextField from '../../components/TextField';

// Validation Schema
const validationSchema = Yup.object().shape({
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  postalCode: Yup.string().required('Postal Code is required'),
  address: Yup.string().required('Address is required'),
});

const CreateAddress = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [isHome, setIsHome] = useState(true);

  // Get the address from the route params
  const {address} = route.params || {};

  // Initial values for Formik
  const initialValues = {
    state: address ? address.state : '',
    city: address ? address.city : '',
    postalCode: address ? address.postal : '',
    address: address ? address.address : '',
  };

  const handleSave = values => {
    const addressData = {
      id: address ? address.id : Date.now().toString(), // Use existing ID or generate new
      state: values.state,
      city: values.city,
      postal: values.postalCode,
      address: values.address,
      addressType: isHome ? 'Home' : 'Office',
    };

    if (address) {
      // Update the existing address
      dispatch(updateAddress({id: address.id, updatedAddress: addressData}));
    } else {
      // Add new address
      dispatch(addAddress(addressData));
    }
    navigation.navigate('AddressList');
  };

  useEffect(() => {
    if (address) {
      setIsHome(address.addressType === 'Home');
    }
  }, [address]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={Back}
        title={address ? 'Edit Address' : 'Create Address'}
        leftClick={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSave}>
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
                  placeholder="State"
                  value={values.state}
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  error={touched.state && errors.state}
                />

                <TextField
                  placeholder="City"
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  error={touched.city && errors.city}
                />

                <TextField
                  placeholder="Postal Code"
                  value={values.postalCode}
                  onChangeText={handleChange('postalCode')}
                  onBlur={handleBlur('postalCode')}
                  error={touched.postalCode && errors.postalCode}
                  keyboardType="number-pad"
                />

                <TextField
                  placeholder="Address"
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  error={touched.address && errors.address}
                  multiline
                  numberOfLines={4}
                />

                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[styles.toggleButton, isHome && styles.activeToggle]}
                    onPress={() => setIsHome(true)}>
                    <Text
                      style={[
                        styles.toggleText,
                        isHome && styles.activeToggleText,
                      ]}>
                      Home
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      !isHome && styles.activeToggle,
                    ]}
                    onPress={() => setIsHome(false)}>
                    <Text
                      style={[
                        styles.toggleText,
                        !isHome && styles.activeToggleText,
                      ]}>
                      Office
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSubmit}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text style={styles.buttonText}>
                      {address ? 'Update' : 'Create'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  formContainer: {
    paddingVertical: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  toggleButton: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  activeToggle: {
    backgroundColor: '#44b678',
  },
  toggleText: {
    fontSize: 14,
    color: '#333',
  },
  activeToggleText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#0786DAFD',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
