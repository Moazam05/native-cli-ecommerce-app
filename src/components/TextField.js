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
  leftIcon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.input}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.textInput,
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
          placeholderTextColor="#676767"
        />
      </View>
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
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  leftIconContainer: {
    marginRight: 5,
    width: 25,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
  },
  multilineInput: {
    minHeight: 100,
    maxHeight: 200,
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
    tintColor: '#626262',
  },
});
