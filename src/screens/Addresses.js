import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Back, EditIcon, DeleteIcon, PlusIcon} from '../assets/images'; // Import your icons
import Header from '../components/Header';

const dummyAddresses = [
  {
    id: '1',
    state: 'California',
    city: 'Los Angeles',
    postal: '90001',
    address: '123 Sunset Blvd, Los Angeles, CA',
  },
  {
    id: '2',
    state: 'New York',
    city: 'New York City',
    postal: '10001',
    address: '456 Broadway, New York, NY',
  },
];

const Addresses = () => {
  const navigation = useNavigation();

  const renderAddressCard = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        {item.state}, {item.city}
      </Text>
      <Text style={styles.cardText}>{item.postal}</Text>
      <Text style={styles.cardText}>{item.address}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
          <EditIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
          <DeleteIcon />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Addresses" leftClick={() => navigation.goBack()} />
      <FlatList
        data={dummyAddresses}
        renderItem={renderAddressCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateAddress')}>
        <PlusIcon />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    paddingBottom: 80, // Padding for the add button at the bottom
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    padding: 10,
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
    marginRight: 5,
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
});
