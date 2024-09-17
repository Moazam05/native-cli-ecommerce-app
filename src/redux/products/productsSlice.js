// Redux Toolkit Imports
import {createSlice} from '@reduxjs/toolkit';

// Function to get the initial products state
const getInitialProducts = () => ({
  data: [],
});

const productsSlice = createSlice({
  name: 'products',
  initialState: getInitialProducts(),
  reducers: {
    setProducts(state, action) {
      state.data = action.payload; // Update the products data in the state
    },
  },
});

export const {setProducts} = productsSlice.actions;
export default productsSlice.reducer;
