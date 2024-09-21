import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {
  AddIcon,
  Back,
  DeleteIcon,
  EditIcon,
  TickIcon,
} from '../../assets/images';
import useTypedSelector from '../../hooks/useTypedSelector';
import {
  selectAddress,
  deleteAddress,
  setDefaultAddress,
} from '../../redux/address/addressSlice';
import {useDispatch} from 'react-redux';

const AddressList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const addressList = useTypedSelector(selectAddress);

  const handleDelete = id => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => dispatch(deleteAddress(id)),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const handleSetDefault = id => {
    dispatch(setDefaultAddress(id));
  };

  const renderItem = ({item}) => (
    <View
      style={[styles.card, item.isDefault && styles.defaultCard]}
      onPress={() => handleSetDefault(item.id)}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          {item.addressType ? item.addressType : 'Home'}
        </Text>

        {item.isDefault && (
          <Image
            source={TickIcon}
            style={[
              styles.tickIcon,
              {
                tintColor: '#44b678',
              },
            ]}
          />
        )}
      </View>
      <Text style={styles.cardText}>{item.address}</Text>
      <Text style={styles.cardText}>
        {item.city}, {item.state} {item.postal}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('CreateAddress', {address: item})}>
          <Image
            source={EditIcon}
            style={[
              styles.icon,
              {
                tintColor: '#ffffff',
              },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}>
          <Image source={DeleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={Back}
        title="Addresses"
        leftClick={() => navigation.goBack()}
      />
      <FlatList
        data={addressList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateAddress')}>
        <Image source={AddIcon} style={styles.add} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddressList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    paddingBottom: 80,
    marginTop: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    margin: 20,
  },
  defaultCard: {
    borderColor: '#44b678',
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tickIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    padding: 8,
    borderRadius: 5,
  },
  defaultButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0786DAFD',
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    marginLeft: 5,
  },
  icon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0786DAFD',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  add: {
    width: 18,
    height: 18,
    tintColor: '#ffffff',
  },
});
