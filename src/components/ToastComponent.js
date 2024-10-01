import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

const toastConfig = {
  success: ({text1}) => (
    <View style={styles.toast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
  error: ({text1}) => (
    <View style={styles.errorToast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
};

const ToastComponent = () => {
  return <Toast config={toastConfig} />;
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  errorToast: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  toastText: {
    color: 'white',
  },
});

export default ToastComponent;
