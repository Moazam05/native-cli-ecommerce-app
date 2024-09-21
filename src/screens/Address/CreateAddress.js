import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import {Back} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addAddress} from '../../redux/address/addressSlice';

const CreateAddress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = () => {
    if (!state || !city || !postalCode || !address) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newAddress = {
      id: Date.now().toString(),
      state,
      city,
      postal: postalCode,
      address,
    };

    dispatch(addAddress(newAddress));
    navigation.navigate('AddressList');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={Back}
        title="Create Address"
        leftClick={() => navigation.goBack()}
      />

      <View style={styles.formContainer}>
        <TextInput
          placeholder="State"
          value={state}
          onChangeText={setState}
          style={styles.input}
        />
        <TextInput
          placeholder="City"
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />
        <TextInput
          placeholder="Postal Code"
          value={postalCode}
          onChangeText={setPostalCode}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#0786DAFD',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
