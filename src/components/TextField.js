import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {HideEye, OpenEye} from '../assets/images';

const TextField = ({
  error,
  placeholder,
  value,
  onChangeText,
  onBlur,
  keyboardType,
  secureTextEntry,
  multiline,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          multiline ? styles.multilineInput : null,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry && !showPassword} // Toggle visibility
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={showPassword ? OpenEye : HideEye}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  multilineInput: {
    minHeight: 100, // Set a minimum height for multiline inputs
    maxHeight: 200, // Optional: Limit the maximum height
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 11,
    marginTop: 3,
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
});
