import {View, Text, Modal, StyleSheet, Dimensions, Image} from 'react-native';
import React from 'react';
import {ThankYou} from '../assets/images';
import {Fonts} from '../constants/fonts';

const PaymentModal = ({visible, onClose}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <Image source={ThankYou} style={styles.thank} />

          <Text style={styles.payment}>Payment done successfully</Text>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;

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
  thank: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginRight: 10,
  },
  payment: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: '#222',
    marginBottom: 25,
  },
});
