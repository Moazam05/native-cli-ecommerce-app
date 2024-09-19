import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {LoginImg, ClearIcon} from '../assets/images';

const LoginModal = ({visible, onClose, onLoginPress, onSignupPress}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image source={ClearIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          <Image source={LoginImg} style={styles.loginImage} />
        </View>
      </View>
    </Modal>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeIcon: {
    width: 18,
    height: 18,
    backgroundColor: '#fff',
    borderRadius: 9,
    padding: 5,
  },
  loginImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginBottom: 30,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
});
