// Redux Toolkit Imports
import {createSlice} from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    data: [],
  },
  reducers: {
    // Set the entire address list
    setAddress(state, action) {
      state.data = action.payload;
    },
    // Add a new address
    addAddress(state, action) {
      state.data.push(action.payload);
    },
    // Update an existing address
    updateAddress(state, action) {
      const {id, updatedAddress} = action.payload;
      const index = state.data.findIndex(address => address.id === id);
      if (index !== -1) {
        state.data[index] = {...state.data[index], ...updatedAddress};
      }
    },
    // Delete an address by ID
    deleteAddress(state, action) {
      const id = action.payload;
      state.data = state.data.filter(address => address.id !== id);
    },
  },
});

// Export actions
export const {setAddress, addAddress, updateAddress, deleteAddress} =
  addressSlice.actions;

// Export reducer
export default addressSlice.reducer;

// Selector to access address data
export const selectAddress = state => state.address.data;
